import rootReducer from '@/reducers';
import {
  configureStore,
  type ThunkAction,
  type AnyAction,
} from '@reduxjs/toolkit';
function logger({ getState }: any) {
  return (next: any) => (action: AnyAction) => {
    console.group('==================================\n');
    console.log(
      '%c state before',
      'color: #28cd17; font-weight: bold',
      getState(),
    );
    console.log('%c will dispatch: ', 'color: red;font-weight: bold', action);

    let returnValue = next(action);

    console.log(
      '%c state after dispath',
      'color: #28cd17;font-weight:bold',
      getState(),
    );
    console.groupEnd();

    return returnValue;
  };
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
