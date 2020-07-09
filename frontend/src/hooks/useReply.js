import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  fetchReply,
  replySelector,
  createReply as _createReply,
} from '../redux/reply';

function useReply() {
  const dispatch = useDispatch();
  const reply = useSelector(replySelector);

  useEffect(() => {
    dispatch(fetchReply());
  }, [dispatch]);

  const createReply = (cid, rid) => dispatch(_createReply(cid, rid));

  return { reply, createReply };
}

export default useReply;
