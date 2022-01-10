# storobs

Store Observables: simple redux-like store in typescript using rxjs.

## Installation

```SH
yarn add @manukpl/storobs
# or
npm install @manukpl/storobs
```

A peer dependency for RXJS is required with a version inferior to v7.5.0 for compatibility issues, mainly with the rxjs version currently shipped with angular.

```SH
yarn add rxjs@7.4.0
# or
npm install rxjs@7.4.0
```

## Example

```TS
import { createPayloadAction, Reducer, Store } from '@manukpl/storobs';

const INITIAL_STATE = { isLoading: false };
const setIsLoading = createPayloadAction<'setIsLoading', boolean>('setIsLoading');

type LoadingState = typeof INITIAL_STATE;
type LoadingAction = ReturnType<typeof setIsLoading>;
type LoadingReducer = Reducer<LoadingState, LoadingAction>;

const loadingReducer: LoadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'setIsLoading':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

const store = new Store({ reducer: loadingReducer });

store.select('isLoading').subscribe(console.info);
store.dispatch(setIsLoading(true));
```

## Usage

The `Store` is the main object of the lib. It takes a mandatory reducer function and exposes the methods to read and write the internal state.

```TS
const store = new Store({ reducer: loadingReducer });
```

### Selectors

To read the state and listen for changes, use the `select()` function with a property from the state with returns an observable.

```TS
const isLoading$ = store.select('isLoading');
```

The `select()` function takes as many keys as needed to combine different part of the code and is able to infer correctly the type for each member up until 10 different keys.

```TS
const selectedUser$ = this.store
  .select('users', 'selectedUser')
  .pipe(
    map(([users, userId]) => {
      if (!userId) {
        return null;
      }
      return users.find((user) => user.id === userId) ?? null;
    }),
  );
```

### Actions

To update the state, use the `dispatch()` function with an object matchin the `Action` type.

```TS
store.dispatch({ type: 'startLoading' });
```

Types and creator functions are available to create valid actions and simplify the syntax.

```TS
import { createEmptyAction, createPayloadAction } from '@manukpl/storobs';

const startLoading = createEmptyAction('startLoading');
const setIsLoading = createPayloadAction('setIsLoading');
```

Payload action require explicit type values to strictly type the payload

```TS
import { createEmptyAction, createPayloadAction, PayloadAction } from '@manukpl/storobs';

const setIsLoading = createPayloadAction('setIsLoading');
setIsLoading(true); // OK
setIsLoading(null); // OK

const setIsLoading = createPayloadAction<'setIsLoading', boolean>('setIsLoading');
setIsLoading(true); // OK
setIsLoading(null); // Type Error

const setIsLoading: PayloadAction<'setIsLoading', boolean> = createPayloadAction('setIsLoading');
setIsLoading(true); // OK
setIsLoading(null); // Type Error
```

### Middlewares

Middlewares can be provided to the store on setup or dynamically added after its creation.

```TS
import { createEmptyAction, createPayloadAction, Middleware, Store } from '@manukpl/storobs';
import { tap } from 'rxjs/operators';

const startLoading = createEmptyAction('startLoading');
const setIsLoading = createPayloadAction<'setIsLoading', boolean>('setIsLoading');
type LoadingAction = ReturnType<typeof startLoading> | ReturnType<typeof setIsLoading>;

const loadingMiddleware: Middleware<LoadingState, LoadingAction> = (store) => (actions$) => {
  return actions$.pipe(
    tap({
      next: (action) => {
        if (action.type === 'startLoading') {
          store.dispatch(setIsLoading(true));
        }
      },
    }),
  );
};

const store = new Store({
  reducer: loadingReducer,
  middlewares: [loadingMiddleware],
});

// OR

const store = new Store({ reducer: loadingReducer });
store.addMiddleware(loadingMiddleware);
```

Middlewares should use the `tap()` rxjs operator to prevent interrupting the actions stream and having side effects on further middlewares or the reducer (unless that's the desired behaviour).

### Async middleware

An `asyncMiddleware` is provided along with the `createAsyncAction()` helper to manage basic async effect in a similar way as thunks in redux.

```TS
import { asyncMiddleware, createAsyncAction, Reducer, Store } from '@manukpl/storobs';
import { of } from 'rxjs';

const INITIAL_STATE = { words: [] as string[], isLoading: false, error: null as unknown };
const fetchWords = createAsyncAction<'fetchWords', string[]>('fetchWords');

type WordsState = typeof INITIAL_STATE;
type WordsAction =
  | ReturnType<typeof fetchWords>
  | ReturnType<typeof fetchWords.pending>
  | ReturnType<typeof fetchWords.success>
  | ReturnType<typeof fetchWords.error>;

type WordsReducer = Reducer<WordsState, WordsAction>;
const reducer: WordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'fetchWords/pending':
      return { ...state, isLoading: true };

    case 'fetchWords/success':
      return { ...state, isLoading: false, words: action.payload, error: null };

    case 'fetchWords/error':
      return { ...state, isLoading: false, words: [], error: action.payload };

    default:
      return state;
  }
};

const store = new Store({
  reducer: reducer,
  middlewares: [asyncMiddleware],
});

const request$ = of(['hello', 'world']); // mock
store.dispatch(fetchWords(request$));
```

The action creator returned by `createAsyncAction()` takes an observable as its payload and exposes action creators for pending, success and error state, to use for typing or in other middlewares as failure recovery for instance.

### Debug mode

A debug option can be passed to the store upon init to log each emitted action and state change (`console.debug()` might require verbose logging in a browser).

```TS
import { Store } from '@manukpl/storobs';
import { loadingReducer } from './reducer';

const store = new Store({
  reducer: loadingReducer,
  debugMode: true,
});
```

### Full examples

- angular: see [storobs-angular-example/src/app/users](https://github.com/ManuKpL/workspace/tree/main/apps/storobs-angular-example/src/app/users).
- react: see [storobs-react-example/src/app/users](https://github.com/ManuKpL/workspace/tree/main/apps/storobs-react-example/src/app/users).
