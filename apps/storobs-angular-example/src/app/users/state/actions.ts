import { createAsyncAction, createPayloadAction } from '@manukpl/storobs';
import { User } from '../User';

export const fetchUsers = createAsyncAction<'fetchUsers', User[]>('fetchUsers');
export const setUser = createPayloadAction<'setUser', string | null>('setUser');

export type UserAction =
  | ReturnType<typeof fetchUsers>
  | ReturnType<typeof fetchUsers.pending>
  | ReturnType<typeof fetchUsers.success>
  | ReturnType<typeof fetchUsers.error>
  | ReturnType<typeof setUser>;
