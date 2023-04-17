import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<AppParamList>();
/**
 * 跳转到某个页面
 * @param name
 * @param params
 */
export function navigate<T extends keyof AppParamList>(
  name: T,
  params?: AppParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params);
  }
}

/**
 * 压入某个页面
 * @param name
 * @param params
 */
export function push<T extends keyof AppParamList>(
  name: T,
  params?: AppParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

/**
 * 重定向到某个页面
 */
export function redirect<T extends keyof AppParamList>(
  name: T,
  params?: AppParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

/**
 * 返回上个页面
 */
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.canGoBack() && navigationRef.goBack();
  }
}

/**
 * 返回路由栈里的之前的某个页面
 * @param step
 */
export function goto(step = -1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(state => {
      const routes = [...state.routes].slice(0, step);
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }
}
type Keyof<T extends {}> = Extract<keyof T, string>;

/**
 * 设置特定路由的参数
 * @param routeName 路由名称
 * @param options 路由参数
 */
export function setParams<
  RouteName extends keyof AppParamList = Keyof<AppParamList>,
>(routeName: RouteName, options: AppParamList[RouteName]) {
  if (navigationRef.isReady()) {
    const state = navigationRef.getState();
    const index = getIndexFromRouteName(routeName);
    navigationRef.dispatch({
      ...CommonActions.setParams({
        ...state.routes[index].params,
        ...options,
      }),
      source: state.routes[index].key,
    });
  }
}

function getIndexFromRouteName(routeName: string): number {
  const state = navigationRef.getState();
  let index = -1;
  for (let i = 0; i < state.routes.length; i++) {
    if (routeName === state.routes[i].name) {
      index = i;
      break;
    }
  }
  return index;
}
