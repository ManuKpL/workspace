import produce from 'immer';
import { Reducer } from '@manukpl/storobs';
import { UserAction } from './actions';
import { User } from '../User';

type UserState = {
  users: User[];
  selectedUser: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const INITIAL_STATE: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'fetchUsers/pending':
        draft.isLoading = true;
        break;

      case 'fetchUsers/success':
        draft.isLoading = false;
        draft.users = action.payload;
        draft.error = null;
        break;

      case 'fetchUsers/error':
        draft.isLoading = false;
        draft.error = action.payload;
        break;

      case 'setUser':
        draft.selectedUser = action.payload;
        break;
    }
  });
};
