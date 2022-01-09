# storobs

I.E. Store Observables: simple redux-like store in typescript using rxjs.

## Usage

### Store setup

```TS
import { asyncMiddleware, Store } from '@manukpl/storobs';
import { userReducer } from './reducer';

const store = new Store({
  reducer: userReducer,
  middlewares: [asyncMiddleware],
  debugMode: true,
});
```

### Full examples

- angular: see [storobs-angular-example/src/app/users](https://github.com/ManuKpL/workspace/tree/main/apps/storobs-angular-example/src/app/users).
- react: see [storobs-react-example/src/app/users](https://github.com/ManuKpL/workspace/tree/main/apps/storobs-react-example/src/app/users).
