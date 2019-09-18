import ipfsClient from "ipfs-http-client";
import CID from "cids";

let ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

// example usage:
// // dag
// let cid = await Ipfs.dagPut(nodeObj);
// let res = await Ipfs.dagGet(cid);
// console.log(res);

// // normal
// let cid2 = await Ipfs.add([JSON.stringify(nodeObj)]);
// console.log(cid2);
// let res2 = await Ipfs.get(cid2);
// console.log(JSON.parse(res2));

export default {
  add: async files => {
    try {
      let result = await ipfs.add([...files]);
      let cid = new CID(result[0].hash);
      return cid;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  get: async cid => {
    try {
      console.log(cid.buffer);
      let files = await ipfs.get(cid.buffer);
      return files[0].content;
      
      // files.forEach(file => {
      //   console.log(file.path);
      //   console.log(file.content);
      // });
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  dagPut: async obj => {
    try {
      let cid = await ipfs.dag.put(obj);
      return cid;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  dagGet: async (cid, path = '') => {
    try {
      let node = await ipfs.dag.get(cid, path);
      return node.value;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  getContentHashBufFromCIDv0: (cid) => {
    return cid.multihash.slice(2);
  },
  // Usage: Input is string without 0x1220
  //  Ipfs.getCIDv0fromContentHash(
  //     "0x4e8ac7dc3a61da3354ebf3ee7ed24b57df4762c2ef318c125f23cdd759362b63"
  //   )
  getCIDv0fromContentHashStr: (b) => {
    let buf = Buffer.concat([Buffer.from("1220", "hex"), Buffer.from(b.slice(2),"hex")]);
    let cid = new CID(buf);
    return cid;
  }
};