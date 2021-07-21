import { call, put } from 'redux-saga/effects';
import api from '@services/api';
import { actions as toastrActions } from 'react-redux-toastr';
import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ email }) {
  try {
    yield call(api.post, 'invites', {
      invite: [email],
    });
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Convite enviado',
        message: 'Enviamos um convite ao usuário para participar do time!',
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      })
    );
  }
}
export function* inviteMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, {
      roles: roles.map((role) => role.id),
    });
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Membro atualizado',
        message: 'O membro foi atualizado com sucesso!',
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      })
    );
  }
}
