import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';

let api = null;
let tcrApi = null;

// https://github.com/substrate-developer-hub/substrate-tcr
// https://github.com/substrate-developer-hub/substrate-tcr-ui/blob/master/src/services/tcrService.js

const init = async (wsp, callback, subscribe) => {
  const provider = new WsProvider(wsp);
  api = await ApiPromise.create(provider);

  api.rpc.system.chain();
  api.rpc.chain.subscribeNewHeads(header => {
    subscribe(header);
  });

  tcrApi = await ApiPromise.create({
    types: {
      Listing: {
        id: 'u32',
        data: 'Vec<u8>',
        deposit: 'Balance',
        owner: 'AccountId',
        application_expiry: 'Moment',
        whitelisted: 'bool',
        challenge_id: 'u32'
      },
      Challenge: {
        listing_hash: 'Hash',
        deposit: 'Balance',
        owner: 'AccountId',
        voting_ends: 'Moment',
        resolved: 'bool',
        reward_pool: 'Balance',
        total_tokens: 'Balance'
      },
      Poll: {
        listing_hash: 'Hash',
        votes_for: 'Balance',
        votes_against: 'Balance',
        passed: 'bool'
      },
      Vote: {
        value: 'bool',
        deposit: 'Balance',
        claimed: 'bool'
      },
      TokenBalance: 'u128'
    }
  });

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

// const transfer = async addr => {
//     const fromPair = keyring.getPair(addressFrom);
//     api.tx.balances
//         .transfer(addressTo, amount)
//         .signAndSend(fromPair, ({ status }) => {
//             if (status.isFinalized) {
//                 setStatus(`Completed at block hash #${status.asFinalized.toString()}`);
//             } else {
//                 setStatus(`Current transfer status: ${status.type}`);
//             }
//         })
//         .catch(e => {
//             setStatus(':( transaction failed');
//             console.error('ERROR:', e);
//         });
// };

const getKeysFromSeed = _seed => {
  if (!_seed) {
    throw new Error('Seed not valid.');
  }

  const keyring = new Keyring({ type: 'sr25519' });
  const paddedSeed = _seed.padEnd(32);
  return keyring.addFromSeed(stringToU8a(paddedSeed));
};

async function _createApiWithTypes () {
  return await ApiPromise.create({
    types: {
      Listing: {
        id: 'u32',
        data: 'Vec<u8>',
        deposit: 'Balance',
        owner: 'AccountId',
        application_expiry: 'Moment',
        whitelisted: 'bool',
        challenge_id: 'u32'
      },
      Challenge: {
        listing_hash: 'Hash',
        deposit: 'Balance',
        owner: 'AccountId',
        voting_ends: 'Moment',
        resolved: 'bool',
        reward_pool: 'Balance',
        total_tokens: 'Balance'
      },
      Poll: {
        listing_hash: 'Hash',
        votes_for: 'Balance',
        votes_against: 'Balance',
        passed: 'bool'
      },
      Vote: {
        value: 'bool',
        deposit: 'Balance',
        claimed: 'bool'
      },
      TokenBalance: 'u128'
    }
  });
}

window.CASTOR = {
  init,
  getBalance,
  getBalances,
  // transfer,
  getKeysFromSeed
};
