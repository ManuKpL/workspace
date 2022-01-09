import { Observable } from 'rxjs';
import { createEmptyAction } from './createEmptyAction';
import { createPayloadAction } from './createPayloadAction';
import { AsyncAction, EmptyAction, PayloadAction } from '../Action';

type AsyncActionCreator<T extends string, P> = (request$: Observable<P>) => AsyncAction<T, P>;
type AdditionalAsyncActions<T extends string, P> = {
  pending: () => EmptyAction<`${T}/pending`>;
  success: (payload: P) => PayloadAction<`${T}/success`, P>;
  error: (paylaod: unknown) => PayloadAction<`${T}/error`, unknown>;
};

type CreateAsyncAction = <T extends string, P>(type: T) => AsyncActionCreator<T, P> & AdditionalAsyncActions<T, P>;
export const createAsyncAction: CreateAsyncAction = <T extends string, P>(type: T) => {
  const actionCreator: AsyncActionCreator<T, P> = (request$) => ({ type, request$ });
  return Object.assign(actionCreator, {
    pending: createEmptyAction(`${type}/pending`),
    success: createPayloadAction<`${T}/success`, P>(`${type}/success`),
    error: createPayloadAction(`${type}/error`),
  });
};
