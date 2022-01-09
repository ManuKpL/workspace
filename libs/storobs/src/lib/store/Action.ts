import { Observable } from 'rxjs';

export type EmptyAction<T extends string = string> = { type: T };
export type PayloadAction<T extends string = string, P = unknown> = { type: T; payload: P };
export type AsyncAction<T extends string = string, P = unknown> = { type: T; request$: Observable<P> };

export type Action<T extends string = string, P = unknown> = EmptyAction<T> | PayloadAction<T, P> | AsyncAction<T, P>;
