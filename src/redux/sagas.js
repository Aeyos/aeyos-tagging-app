import { call, put, takeEvery, takeLatest } from "redux-saga/lib/effects";
import Api from "../utils/Api.js";

function* load(action) {
  try {
    const { data } = yield call(
      Api.load,
      action.payload.user,
      action.payload.pass
    );

    console.log("data", data);
    if (data.error) {
      throw new Error("Error while loading file.");
    }

    yield put({ type: "LOAD_FILE.SUCCESS", payload: data.payload });
  } catch (e) {
    yield put({ type: "LOAD_FILE.FAIL", error: e.message });
  }
}

function* create(action) {
  try {
    const { data } = yield call(
      Api.post,
      action.payload.user,
      action.payload.pass,
      action.payload.data
    );

    if (data.error) {
      throw new Error("Error while loading file.");
    }

    yield put({
      type: "CREATE_FILE.SUCCESS",
      payload: { data: action.payload.data }
    });
  } catch (e) {
    yield put({ type: "CREATE_FILE.FAIL", error: e.message });
  }
}

function* sagas() {
  yield takeLatest("LOAD_FILE.REQUEST", load); // Overwrite last request
  yield takeLatest("CREATE_FILE.REQUEST", create); // Overwrite last request
}

export default sagas;
