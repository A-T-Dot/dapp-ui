import ipfsClient from "ipfs-http-client";
let ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

export default {
  add: async (files) => {
    try {
      let result =  await ipfs.add([...files]);
      let ipfsId = result[0].hash;
      return ipfsId;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
  get: async (cid) => {
    try {
      let files = await ipfs.get(cid);
      files.forEach((file) => {
        console.log(file.path)
        console.log(file.content)
      })
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}