import { isNull, isUndefined, omitBy } from 'lodash';

/**
 * 删除对象中为false的键值对
 * @param obj
 * @returns
 */
export function removeEmpty<T extends Object>(obj: T): T {
  return omitBy(
    {
      ...obj,
    },
    item => isNull(item) || isUndefined(item) || item === '',
  ) as T;
}
