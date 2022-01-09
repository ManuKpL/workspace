import { Action, AsyncAction } from '../../Action';

export const isAsyncAction = <A extends Action>(action: A): action is A & AsyncAction => 'request$' in action;
