import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Calendar } from '@/services/CalendarService';
import { useUpdate } from 'ahooks';

const EMPTY = Symbol('EMPTY');

type Obj = Record<string, any>;

type ConsumerProps<Value> = {
  children: (value: Value) => ReactNode;
};

type ShareModel = Pick<
  Calendar,
  'dates' | 'start' | 'end' | 'weekdays' | 'years' | 'months' | 'days'
> & {
  update: ReturnType<typeof useUpdate>;
};

export function createShareModel() {
  const Context = createContext<ShareModel | typeof EMPTY>(EMPTY);
  const ShareModelProvider = ({
    children,
    initialState,
  }: PropsWithChildren<Record<string, any>>) => {
    console.log('initialState', initialState);
    const [calendarInstance] = useState(() => new Calendar(initialState));
    const shareModel: ShareModel = {
      update: useUpdate(),
      dates: calendarInstance.dates,
      weekdays: calendarInstance.weekdays,
      years: calendarInstance.years,
      months: calendarInstance.months,
      start: calendarInstance.start,
      end: calendarInstance.end,
      days: calendarInstance.days,
    };
    useEffect(() => {
      if (initialState.boundary) {
        calendarInstance.setStartEnd(initialState.start, initialState.end);
        shareModel.update();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState]);

    return useMemo(
      () => {
        return (
          <Context.Provider value={shareModel}>{children}</Context.Provider>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [shareModel],
    );
  };
  const ShareModelConsumer = (props: ConsumerProps<Obj>) => {
    return (
      <Context.Consumer>
        {value => {
          if (value === EMPTY) {
            throw new Error(
              'Component must be wrapped with <Container.Provider>',
            );
          }
          return props.children(value);
        }}
      </Context.Consumer>
    );
  };

  const useShareModel = () => {
    const value = useContext(Context);
    if (value === EMPTY) {
      throw new Error(`Component must be wrapped within Provider`);
    }
    return value;
  };

  return {
    Provider: ShareModelProvider,
    Consumer: ShareModelConsumer,
    useModel: useShareModel,
  };
}
