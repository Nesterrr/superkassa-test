import {
    takeEvery,
    put,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import sagasManager from '../helpers/sagas-manager';

const initialState = {
    payload: false,
};

const SET_BUTTON_STATE = '/super-test/button/SET_BUTTON_STATE';
const REVERT_BUTTON_STATE = '/super-test/button/REVERT_BUTTON_STATE';

export const setButtonState = (payload) => ({
    type: SET_BUTTON_STATE,
    payload,
});

export const revertButtonState = () => ({
    type: REVERT_BUTTON_STATE,
});

const Button = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BUTTON_STATE:
            return {
                ...state,
                payload,
            };
        default:
            return state;
    }
};

export default Button;


export function* watchSetButton() {
    yield put(setButtonState(true));

    yield delay(5000);

    yield put(setButtonState(false));
}

sagasManager.addSagaToRoot(function* () {
    yield takeEvery(REVERT_BUTTON_STATE, watchSetButton);
});