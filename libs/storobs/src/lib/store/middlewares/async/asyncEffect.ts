import { EMPTY, OperatorFunction } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { AnyObject } from '../../../utils';
import { Action, AsyncAction } from '../../Action';
import { createEmptyAction, createPayloadAction } from '../../actionsCreators';
import { Store } from '../../Store';

type AsyncEffect = <S extends AnyObject, A extends Action>(store: Store<S, A>) => OperatorFunction<A & AsyncAction, A>;

export const assyncEffect: AsyncEffect =
  <S extends AnyObject, A extends Action>(store: Store<S, A>) =>
  (source$) => {
    return source$.pipe(
      mergeMap((action) => {
        const pending = createEmptyAction(`${action.type}/pending`);
        const success = createPayloadAction(`${action.type}/success`);
        const error = createPayloadAction(`${action.type}/error`);

        store.dispatch(pending() as A);

        return action.request$.pipe(
          switchMap((result) => {
            store.dispatch(success(result) as A);
            return EMPTY;
          }),
          catchError((err) => {
            store.dispatch(error(err) as A);
            return EMPTY;
          }),
        );
      }),
    );
  };
