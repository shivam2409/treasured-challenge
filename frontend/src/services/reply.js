import Axios from 'axios';

export async function getReply(cid) {
  const res = await Axios.get(`http://localhost:3001/reply/${cid}`);
  const reply = res.data;
  return reply;
}

export async function createReply(cid, rid) {
  const res = await Axios.post('http://localhost:3001/reply', {
    cid,
    rid,
  });
  const reply = res.data;
  return reply;
}
