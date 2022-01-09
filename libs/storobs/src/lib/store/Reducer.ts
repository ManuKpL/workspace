import { Action } from './Action';
import { AnyObject } from '../utils';

export type Reducer<State extends AnyObject, A extends Action> = (state: State | undefined, action: A) => State;
