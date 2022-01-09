import { merge, MonoTypeOperatorFunction, partition } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AnyObject } from '../../../utils';
import { Action } from '../../Action';
import { Store } from '../../Store';
import { assyncEffect } from './asyncEffect';
import { isAsyncAction } from './isAsyncAction';

type AsyncMiddleware = <S extends AnyObject, A extends Action>(store: Store<S, A>) => MonoTypeOperatorFunction<A>;

export const asyncMiddleware: AsyncMiddleware = (store) => (source$) => {
  const [asyncAction$, syncAction$] = partition(source$.pipe(shareReplay(1)), isAsyncAction);
  return merge(asyncAction$.pipe(assyncEffect(store)), syncAction$);
};
