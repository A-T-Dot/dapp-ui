import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';

const CASTOR_PROVIDER = 'ws://127.0.0.1:9944';

const getApi = async () => {
  const provider = new WsProvider(CASTOR_PROVIDER);

  return await ApiPromise.create({
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
      ListingId: "u64",
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
      Like: {
        from: "AccountId",
        to: "ContentHash"
      },
      Admire: {
        from: "AccountId",
        to: "ContentHash"
      },
      Grant: {
        from: "AccountId",
        to: "ContentHash",
        amount: "Balance"
      },
      Report: {
        from: "AccountId",
        target: "ContentHash",
        reason: "ContentHash"
      },
      VecContentHash: "Vec<ContentHash>",
      ReasonHash: "ContentHash",
      AdmireId: "u64",
      GrantId: "u64",
      LikeId: "u64",
      ReportId: "u64",
      Quota: "u64",
      ActionPoint: "Balance",
      Energy: "Balance",
      Reputation: "Balance"
    },
    provider
  });

  // api.rpc.chain.subscribeNewHeads(header => {
  //   console.log(`Chain is at #${header.number}`)
  // });
};

const getBalance = async (address) => {
  const api = await getApi();
  const currentBalance = await api.query.balances.freeBalance(address);
  return currentBalance.toString();
};

const getEnergyAsset = async address => {
  const api = await getApi();
  const currentBalance = await api.query.nonTransferAssets.freeBalance(0, address);
  return currentBalance.toString();
};

const getActivityAsset = async address => {
  const api = await getApi();
  const currentBalance = await api.query.nonTransferAssets.freeBalance(1, address);
  return currentBalance.toString();
};

const getReputationAsset = async address => {
  const api = await getApi();
  const currentBalance = await api.query.nonTransferAssets.freeBalance(2, address);
  return currentBalance.toString();
};


const getBalances = async (addresses, callback) => {
  const api = await getApi();
  const currentBalances = await api.query.balances.freeBalance.multi(addresses);
  const balancesMap = {};
  currentBalances.forEach((item, index) => {
    balancesMap[addresses[index]] = item.toString();
  });
  callback(balancesMap);
};

const transfer = async (keyring, addressFrom, addressTo, amount) => {
  const api = await getApi();
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

const getKeysFromUri = uri => {
  if (!uri) {
    throw new Error('Uri not valid.');
  }

  const keyring = new Keyring({ type: "sr25519" });
  return keyring.addFromUri(uri);
};

const connect = async () => {
  const api = await getApi();
  const [chain, name, version] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  const connected = `You are connected to chain ${chain} using ${name} v${version}`;
  console.log(connected);
  return { chain, name, version };
}

// --------

const getTcxDetails = async (keys) => {
  const api = await getApi();

  const [q1, q2, q3, q4] = await Promise.all([
    // api.query.tcx.allTcxsArray(''),
    // api.query.tcx.allTcxsCount(''),
    // api.query.tcx.challengeNonce(''),
    // api.query.tcx.challenges(''),
    // api.query.tcx.ownedTcxsArray(''),
    // api.query.tcx.ownedTcxsCount(''),
    // api.query.tcx.polls(''),
    // api.query.tcx.tcxListings(''),
    api.query.tcx.tcxListingsCount(''),
    api.query.tcx.tcxListingsIndexHash(''),
    api.query.tcx.tcxOwner(''),
    api.query.tcx.votes([]),
  ]);
  console.log(q1, q2, q3, q4);
}

const getTokenBalance = async (keys, callback) => {
  const api = await getApi();
  api.query.token.balanceOf(keys.address, (balance) => {
    let bal = JSON.stringify(balance);
    callback(bal);
  });
}

const _handleEvents = (resolve, events, status, sectionName) => {
  if (status.isFinalized) {
    events.forEach(async ({ phase, event: { data, method, section } }) => {
      if (section.toString() === sectionName || section.toString() === "system") {
        const datajson = JSON.parse(data.toString());
        resolve({
          tx: status.asFinalized.toHex(),
          data: datajson,
          section: section.toString(),
          method: method.toString()
        })
      }
    });
  }
}

const geCreate = async (keys, content_hash) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.ge.create(content_hash, 1000000).sign(keys, { nonce }).send(({ events = [], status }) => {
      _handleEvents(resolve, events, status, "ge")
    }).catch(err => reject(err));
  });
}

const geStake = async (keys, id, amount) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.ge
      .stake(id, amount)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "ge")
      })
      .catch(err => reject(err));
  });
}

const geInvest = async (keys, id, amount) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.ge
      .invest(id, amount)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "ge")
      })
      .catch(err => reject(err));
  });
}

const geWithdraw = async (keys, id, amount) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.ge
      .withdraw(id, amount)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "ge")
      })
      .catch(err => reject(err));
  });
}

const geUpdateRules = async (keys, rules) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.ge
      .updateRules(rules)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "ge")
      })
      .catch(err => reject(err));
  });
}

const nodeCreate = async (keys, content_hash, node_type, sources) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.node
      .create(content_hash, node_type, sources)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "node")
      })
      .catch(err => reject(err));
  });
}

const tcxCreate = async (keys, ge_id, tcx_type, content_hash) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.tcx
      .proposeTcxCreation(ge_id, tcx_type, content_hash)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx");
      })
      .catch(err => reject(err));
  });
};

// propose
// section.toString() === "tcx" && method.toString() === "Propose"
const tcxPropose = async (keys, tcx_id, node_id, amount, action_id) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.tcx
      .propose(tcx_id, node_id, amount, action_id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx")
      })
      .catch(err => reject(err));
  });
}

const tcxChallenge = async (keys, tcx_id, node_id, amount) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);

    // const listing = await api.query.tcx.listings(hash);
    // const listingJson = JSON.parse(listing.toString());

    api.tx.tcx
      // .challenge(listingJson.id, deposit)
      .challenge(tcx_id, node_id, amount)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx")
      })
      .catch(err => reject(err));
  });
}

const tcxResolve = async (keys, tcx_id, node_id) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.tcx
      .resolve(tcx_id, node_id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx")
      })
      .catch(err => reject(err));
  });
}

const tcxVote = async (keys, challenge_id, amount, value) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.tcx
      .vote(challenge_id, amount, value)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx")
      })
      .catch(err => reject(err));
  });
}

const tcxClaim = async (keys, challenge_id) => {
  const api = await getApi();
  // section.toString() === "tcx" &&
  // method.toString() === "Claimed"
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.tcx
      .claim(challenge_id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "tcx")
      })
      .catch(err => reject(err));
  });
}

const interactionLike = async (keys, node_id) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.interaction
      .like(node_id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "interaction");
      })
      .catch(err => reject(err));
  });
};

const interactionAdmire = async (keys, node_id) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.interaction
      .admire(node_id)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "interaction");
      })
      .catch(err => reject(err));
  });
};

const interactionGrant = async (keys, node_id, amount) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.interaction
      .grant(node_id, amount)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "interaction");
      })
      .catch(err => reject(err));
  });
};


const interactionReport = async (keys, node_id, reason_hash) => {
  const api = await getApi();
  return new Promise(async (resolve, reject) => {
    const nonce = await api.query.system.accountNonce(keys.address);
    api.tx.interaction
      .report(node_id, reason_hash)
      .sign(keys, { nonce })
      .send(({ events = [], status }) => {
        _handleEvents(resolve, events, status, "interaction");
      })
      .catch(err => reject(err));
  });
};


let key = null;

const setKeyFromUri = (uri) => {
  const keyring = new Keyring({ type: "sr25519" });
  key = keyring.addFromUri(uri);
}

const getKey = () => {
  if(!key) {
    console.error("key has not been set");
    return;
  }
  return key;
}

export default {
  getBalance,
  getBalances,
  transfer,
  getKeysFromSeed,
  getKeysFromUri,
  connect,
  // -------
  getTcxDetails,
  getTokenBalance,
  geCreate,
  geStake,
  geInvest,
  geWithdraw,
  geUpdateRules,
  nodeCreate,
  tcxCreate,
  tcxPropose,
  tcxChallenge,
  tcxResolve,
  tcxVote,
  tcxClaim,
  setKeyFromUri,
  getKey,
  // -------
  getEnergyAsset,
  getActivityAsset,
  getReputationAsset,
  interactionLike,
  interactionAdmire,
  interactionGrant,
  interactionReport,
};
