import { merge, MonoTypeOperatorFunction } from 'rxjs';
import { connect } from 'rxjs/operators';
import { AnyObject } from '../../utils';
import { Action } from '../Action';
import { Middleware } from '../Middleware';
import { Store } from '../Store';

type ApplyMiddlewares = <S extends AnyObject, A extends Action>(
  store: Store<S, A>,
  middlewares: Middleware<S, A>[],
) => MonoTypeOperatorFunction<A>;
export const applyMiddlewares: ApplyMiddlewares = (store, middlewares) => (source$) => {
  return source$.pipe(connect((shared$) => merge(...middlewares.map((middleware) => shared$.pipe(middleware(store))))));
};
