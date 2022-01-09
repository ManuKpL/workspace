import { MonoTypeOperatorFunction } from 'rxjs';
import { AnyObject } from '../utils';
import { Action } from './Action';
import { Store } from './Store';

export type Middleware<S extends AnyObject, A extends Action> = (store: Store<S, A>) => MonoTypeOperatorFunction<A>;
