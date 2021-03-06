import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '@services/api';
import { actions as toastrActions } from 'react-redux-toastr';
import AuthActions from '../ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });
    localStorage.setItem('@Omni:token', response.data.token);
    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no login',
        message: 'Verifique seu e-mail/senha!',
      })
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password });
    localStorage.setItem('@Omni:token', response.data.token);
    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no cadastro',
        message: 'Voce foi convidado para algum time?',
      })
    );
  }
}
export function* signOut() {
  localStorage.removeItem('@Omni:token');
  localStorage.removeItem('@Omni:team');
  yield put(push('/sign'));
}

export function* getPermissions() {
  const team = yield select((state) => state.teams.active);
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, 'permissions');
  const { roles, permissions } = response.data;
  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
