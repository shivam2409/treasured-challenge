import { call, put, takeLatest } from 'redux-saga/effects';

import * as ReplyService from '../services/reply';

export const actionTypes = {
  FETCH_REPLY: `reply/FETCH_REPLY`,
  FETCH_REPLY_SUCCESS: `reply/FETCH_REPLY_SUCCESS`,
  FETCH_REPLY_FAILURE: `reply/FETCH_REPLY_FAILURE`,
  CREATE_REPLY: `reply/CREATE_REPLY`,
};

export function fetchReply() {
  return {
    type: actionTypes.FETCH_REPLY,
  };
}

export function fetchReplySuccess(reply) {
  return {
    type: actionTypes.FETCH_REPLY_SUCCESS,
    payload: reply,
  };
}

export function fetchReplyFailure(error) {
  return {
    type: actionTypes.FETCH_REPLY_FAILURE,
    payload: error,
    error: true,
  };
}

export function createReply(cid, rid) {
  return {
    type: actionTypes.CREATE_REPLY,
    payload: {
      cid,
      rid,
    },
  };
}

const initialState = {
  isFetching: false,
  reply: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_REPLY:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_REPLY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        reply: action.payload,
      };
    case actionTypes.FETCH_REPLY_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

function* fetchReplySagaWorker() {
  try {
    const reply = yield call(ReplyService.getReply);
    yield put(fetchReplySuccess(reply));
  } catch (e) {
    yield put(fetchReplyFailure(e));
  }
}

function* createReplySagaWorker(action) {
  const { cid, rid } = action.payload;
  yield call(ReplyService.createReply, cid, rid);
  yield call(fetchReplySagaWorker);
}

export function* replySagaWatcher() {
  yield takeLatest(actionTypes.FETCH_REPLY, fetchReplySagaWorker);
  yield takeLatest(actionTypes.CREATE_REPLY, createReplySagaWorker);
}

export function replySelector(state) {
  return state.reply;
}
