import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';

let api = null;

// https://substrate.dev/docs/en/tutorials/tcr/building-a-ui-for-the-tcr-runtime
// https://polkadot.js.org/api/api/#registering-custom-types
// https://github.com/substrate-developer-hub/substrate-tcr-ui/blob/master/src/services/tcrService.js

const init = async (wsp, callback) => {
  const provider = new WsProvider(wsp);

  api = await ApiPromise.create({
    types: {
      ContentHash: "[u8; 32]",
      NodeType: "u32",
      Node: {
        id: "ContentHash",
        node_type: "NodeType",
        sources: "Vec<ContentHash>"
      },
      GeId: "u64",
      ActionId: "u64",
      TcxId: "u64",
      GovernanceEntity: {
        threshold: "u64",
        min_deposit: "Balance",
        apply_stage_len: "Moment",
        commit_stage_len: "Moment"
      },
      Challenge: {
        amount: "Balance",
        voting_ends: "Moment",
        resolved: "bool",
        reward_pool: "Balance",
        total_tokens: "Balance",
        owner: "AccountId"
      },
      ListingId: "u64",
      ChallengeId: "u64",
      Listing: {
        id: "ListingId",
        node_id: "ContentHash",
        amount: "Balance",
        application_expiry: "Moment",
        whitelisted: "bool",
        challenge_id: "ChallengeId",
        owner: "AccountId"
      },
      Poll: {
        votes_for: "Balance",
        votes_against: "Balance",
        passed: "bool"
      },
      Tcx: {
        tcx_type: "u64"
      },
      TcxType: "u64",
      Link: {
        source: "u32",
        target: "u32"
      },
      VecContentHash: "Vec<ContentHash>"
    },
    provider
  });

  // api.rpc.chain.subscribeNewHeads(header => {
  //   console.log(`Chain is at #${header.number}`)
  // });

  callback(api);
};

const getBalance = async (address, callback) => {
  const currentBalance = await api.query.balances.freeBalance(address);
  callback(currentBalance.toString());
};

const getBalances = async (addresses, callback) => {
  const currentBalances = await api.query.balances.freeBalance.multi(addresses);
  const balancesMap = {};
  currentBalances.forEach((item, index) => {
    balancesMap[addresses[index]] = item.toString();
  });
  callback(balancesMap);
};

const transfer = async (keyring, addressFrom, addressTo, amount) => {
  const fromPair = keyring.getPair(addressFrom);
  api.tx.balances
    .transfer(addressTo, amount)
    .signAndSend(fromPair, ({ status }) => {
      if (status.isFinalized) {
        console.log(`Completed at block hash #${status.asFinalized.toString()}`);
      } else {
        console.log(`Current transfer status: ${status.type}`);
      }
    })
    .catch(e => {
      console.log(':( transaction failed');
      console.error('ERROR:', e);
    });
};

const getKeysFromSeed = _seed => {
  if (!_seed) {
    throw new Error('Seed not valid.');
  }

  const keyring = new Keyring({ type: 'sr25519' });
  const paddedSeed = _seed.padEnd(32);
  return keyring.addFromSeed(stringToU8a(paddedSeed));
};

const connect = async () => {
  const [chain, name, version] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  const connected = `You are connected to chain ${chain} using ${name} v${version}`;
  console.log(connected);
  return { chain, name, version };
}

const getTcxDetails = async () => {
  console.log('------- getTcxDetails')
  console.log(api.query)

  const [q1, q2, q3] = await Promise.all([
    api.query.tcx.allTcxsArray(),
    api.query.tcx.allTcxsCount(),
    api.query.tcx.challengeNonce(),
    // api.query.tcx.challenges(),
    // api.query.tcx.ownedTcxsArray(),
    // api.query.tcx.ownedTcxsCount(),
    // api.query.tcx.polls(),
    // api.query.tcx.tcxListings(),
    // api.query.tcx.tcxListingsCount(),
    // api.query.tcx.tcxListingsIndexHash(),
    // api.query.tcx.tcxOwner(),
    // api.query.tcx.votes(),
  ]);
  console.log(q1, q2, q3);
}


// apply for a new listing
const applyListing = async (name, deposit) => {
  return new Promise(async (resolve, reject) => {
    const api = await ApiPromise.create();
    const keys = getKeysFromSeed();
    const nonce = await api.query.system.accountNonce(keys.address);
    console.log('Sending...', name, deposit);
    // create, sign and send transaction
    api.tx.tcr
      // create transaction
      .propose(name, deposit)
      // Sign and send the transcation
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status.asFinalized.toHex());
          events.forEach(async ({ phase, event: { data, method, section } }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            // check if the tcr proposed event was emitted by Substrate runtime
            if (section.toString() === "tcr" && method.toString() === "Proposed") {
              // insert metadata in off-chain store
              const datajson = JSON.parse(data.toString());
              const listingInstance = {
                name: name,
                owner: datajson[0],
                hash: datajson[1],
                deposit: datajson[2],
                isWhitelisted: false,
                challengeId: 0,
                rejected: false
              }
              // await dataService.insertListing(listingInstance);
              // resolve the promise with listing data
              resolve(listingInstance);
            }
          });
        }
      })
      .catch(err => reject(err));
  });
}

// gets the token balance for an account
// this is the TCR token balance and not the Substrate balances module balance
const getTokenBalance = async (seed, callback) => {
  const keys = getKeysFromSeed(seed);
  const api = await ApiPromise.create();
  api.query.token.balanceOf(keys.address, (balance) => {
    let bal = JSON.stringify(balance);
    callback(bal);
  });
}

// challenge a listing
const challengeListing = async (hash, deposit) => {
  return new Promise(async (resolve, reject) => {
    const keys = getKeysFromSeed();
    const nonce = await api.query.system.accountNonce(keys.address);

    const listing = await api.query.tcr.listings(hash);
    const listingJson = JSON.parse(listing.toString());

    // create, sign and send transaction
    api.tx.tcr
      // create transaction
      .challenge(listingJson.id, deposit)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status.asFinalized.toHex());
          events.forEach(async ({ phase, event: { data, method, section } }) => {
            // check if the tcr proposed event was emitted by Substrate runtime
            if (section.toString() === "tcr" && method.toString() === "Challenged") {
              const datajson = JSON.parse(data.toString());
              // update local listing with challenge id
              // const localListing = dataService.getListing(hash);
              // localListing.challengeId = datajson[2];
              // dataService.updateListing(localListing);
              // resolve the promise with challenge data
              resolve({
                tx: status.asFinalized.toHex(),
                data: datajson
              });
            }
          });
        }
      })
      .catch(err => reject(err));
  });
}

// vote on a challenged listing
const voteListing = async (hash, voteValue, deposit) => {
  return new Promise(async (resolve, reject) => {
    const keys = getKeysFromSeed();
    const nonce = await api.query.system.accountNonce(keys.address);

    const listing = await api.query.tcr.listings(hash);
    const listingJson = JSON.parse(listing.toString());

    // check if listing is currently challenged
    if (listingJson.challenge_id > 0) {
      // create, sign and send transaction
      api.tx.tcr
        // create transaction
        .vote(listingJson.challenge_id, voteValue, deposit)
        .sign(keys, { nonce })
        .send(({ events = [], status }) => {
          if (status.isFinalized) {
            console.log(status.asFinalized.toHex());
            events.forEach(async ({ phase, event: { data, method, section } }) => {
              // check if the tcr proposed event was emitted by Substrate runtime
              if (section.toString() === "tcr" &&
                method.toString() === "Voted") {
                const datajson = JSON.parse(data.toString());
                // resolve with event data
                resolve({
                  tx: status.asFinalized.toHex(),
                  data: datajson
                });
              }
            });
          }
        })
        .catch(err => reject(err));
    } else {
      reject(new Error("Listing is not currently challenged."));
    }
  });
}

// resolve a listing
const resolveListing = async (hash) => {
  return new Promise(async (resolve, reject) => {
    const keys = getKeysFromSeed();
    const nonce = await api.query.system.accountNonce(keys.address);

    const listing = await api.query.tcr.listings(hash);
    const listingJson = JSON.parse(listing.toString());

    // create, sign and send transaction
    api.tx.tcr
      // create transaction
      .resolve(listingJson.id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status.asFinalized.toHex());
          events.forEach(async ({ phase, event: { data, method, section } }) => {
            if (section.toString() === "tcr" &&
              method.toString() === "Accepted") {
              // if accepted, updated listing status
              const datajson = JSON.parse(data.toString());
              // const localListing = dataService.getListing(hash);
              // localListing.isWhitelisted = true;
              // dataService.updateListing(localListing);
              // resolve with event data
              resolve({
                tx: status.asFinalized.toHex(),
                data: datajson
              });
            }

            if (section.toString() === "tcr" &&
              method.toString() === "Rejected") {
              // if accepted, updated listing status
              const datajson = JSON.parse(data.toString());
              // const localListing = dataService.getListing(hash);
              // localListing.rejected = true;
              // dataService.updateListing(localListing);
              // resolve with event data
              resolve({
                tx: status.asFinalized.toHex(),
                data: datajson
              });
            }
          });
        }
      })
      .catch(err => reject(err));
  });
}

// claim reward for a resolved challenge
const claimReward = async (challengeId) => {
  return new Promise(async (resolve, reject) => {
    const keys = getKeysFromSeed();
    const nonce = await api.query.system.accountNonce(keys.address);

    // create, sign and send transaction
    api.tx.tcr
      // create transaction
      .claimReward(challengeId)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status.asFinalized.toHex());
          events.forEach(async ({ phase, event: { data, method, section } }) => {
            if (section.toString() === "tcr" &&
              method.toString() === "Claimed") {
              const datajson = JSON.parse(data.toString());
              // resolve with event data
              resolve({
                tx: status.asFinalized.toHex(),
                data: datajson
              });
            }
          });
        }
      })
      .catch(err => reject(err));
  });
}

export default {
  init,
  getBalance,
  getBalances,
  transfer,
  getKeysFromSeed,
  // ------- tcr
  connect,
  getTcxDetails,
  applyListing,
  getTokenBalance,
  challengeListing,
  voteListing,
  resolveListing,
  claimReward,
};
