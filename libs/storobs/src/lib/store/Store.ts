import { noop, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, pluck, scan, shareReplay, startWith, tap } from 'rxjs/operators';
import { Action } from './Action';
import { AnyObject } from '../utils';
import { Middleware } from './Middleware';
import { applyMiddlewares } from './middlewares';
import { Reducer } from './Reducer';

type StoreConfig<State extends AnyObject, A extends Action> = {
  reducer: Reducer<State, A>;
  middlewares?: Middleware<State, A>[];
  debugMode?: boolean;
};

export class Store<State extends AnyObject, A extends Action> {
  private readonly state$: Observable<State>;
  private readonly actions: Subject<A>;
  private readonly middlewares: Middleware<State, A>[] = [];
  private readonly debugMode: boolean;

  constructor({ reducer, middlewares = [], debugMode = false }: StoreConfig<State, A>) {
    if (middlewares.length) {
      this.middlewares.push(...middlewares);
    }

    this.debugMode = debugMode;
    this.actions = new Subject();
    this.state$ = this.actions
      .asObservable()
      .pipe(
        startWith({ type: '@@INIT' } as A),
        tap({ next: this.debug('ACTION DISPATCHED') }),
        applyMiddlewares(this, this.middlewares),
        scan(reducer, undefined as never),
        tap({ next: this.debug('STATE UPDATED') }),
        shareReplay(1),
      );
  }

  public addMiddleware(middleware: Middleware<State, A>): void {
    this.middlewares.push(middleware);
  }

  public dispatch(action: A): void {
    this.actions.next(action);
  }

  public select<K extends keyof State>(key: K): Observable<State[K]> {
    return this.state$.pipe(pluck(key), distinctUntilChanged());
  }

  private debug(message: string): <T>(value: T) => void {
    if (this.debugMode) {
      return (value) => console.debug(message, value);
    }
    return noop;
  }
}
