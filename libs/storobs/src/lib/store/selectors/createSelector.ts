import { combineLatest, iif, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { AnyObject } from '../../utils';

export const makeStateSelector = <State extends AnyObject>(
  state$: Observable<State>,
) => {
  function selectOne<K extends keyof State>(key: K): Observable<State[K]> {
    return state$.pipe(pluck(key), distinctUntilChanged());
  }

  /* one selector */
  function select<K extends keyof State>(key: K): Observable<State[K]>;
  /* two selectors */
  function select<A extends keyof State, B extends keyof State>(
    ...keys: [A, B]
  ): Observable<[State[A], State[B]]>;
  /* three selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
  >(...keys: [A, B, C]): Observable<[State[A], State[B], State[C]]>;
  /* four selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
  >(
    ...keys: [A, B, C, D]
  ): Observable<[State[A], State[B], State[C], State[D]]>;
  /* five selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
  >(
    ...keys: [A, B, C, D, E]
  ): Observable<[State[A], State[B], State[C], State[D], State[E]]>;
  /* six selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
    F extends keyof State,
  >(
    ...keys: [A, B, C, D, E, F]
  ): Observable<[State[A], State[B], State[C], State[D], State[E], State[F]]>;
  /* seven selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
    F extends keyof State,
    G extends keyof State,
  >(
    ...keys: [A, B, C, D, E, F, G]
  ): Observable<
    [State[A], State[B], State[C], State[D], State[E], State[F], State[G]]
  >;
  /* eight selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
    F extends keyof State,
    G extends keyof State,
    H extends keyof State,
  >(
    ...keys: [A, B, C, D, E, F, G, H]
  ): Observable<
    [
      State[A],
      State[B],
      State[C],
      State[D],
      State[E],
      State[F],
      State[G],
      State[H],
    ]
  >;
  /* nine selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
    F extends keyof State,
    G extends keyof State,
    H extends keyof State,
    I extends keyof State,
  >(
    ...keys: [A, B, C, D, E, F, G, H, I]
  ): Observable<
    [
      State[A],
      State[B],
      State[C],
      State[D],
      State[E],
      State[F],
      State[G],
      State[H],
      State[I],
    ]
  >;
  /* ten selectors */
  function select<
    A extends keyof State,
    B extends keyof State,
    C extends keyof State,
    D extends keyof State,
    E extends keyof State,
    F extends keyof State,
    G extends keyof State,
    H extends keyof State,
    I extends keyof State,
    J extends keyof State,
  >(
    ...keys: [A, B, C, D, E, F, G, H, I, J]
  ): Observable<
    [
      State[A],
      State[B],
      State[C],
      State[D],
      State[E],
      State[F],
      State[G],
      State[H],
      State[I],
      State[J],
    ]
  >;
  /* n selectors */
  function select<K extends keyof State>(...keys: K[]): Observable<State[K][]>;
  /* twelve selectors */
  function select<K extends keyof State>(
    ...keys: K[]
  ): Observable<State[K]> | Observable<State[K][]> {
    return iif(
      () => keys.length === 1,
      selectOne(keys[0]),
      combineLatest(keys.map(selectOne)),
    ) as Observable<State[K]> | Observable<State[K][]>;
  }

  return select;
};
