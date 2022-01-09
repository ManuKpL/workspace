import { PayloadAction } from '../Action';

type CreatePayloadAction = <T extends string, P>(type: T) => (payload: P) => PayloadAction<T, P>;
export const createPayloadAction: CreatePayloadAction = (type) => (payload) => ({ type, payload });
