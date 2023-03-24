function cloneDeep(val: any) {
  if (Array.isArray(val)) {
    return cloneArrayDeep(val);
  } else if (typeof val === 'object' && val !== null) {
    return cloneObjectDeep(val);
  }
  return val;
}

function cloneObjectDeep<T extends {}>(val: T): T {
  if (Object.getPrototypeOf(val) === Object.prototype) {
    const res = {} as unknown as T;
    for (const key in val) {
      res[key] = cloneDeep(val[key]);
    }
    return res;
  }
  return val;
}

function cloneArrayDeep(val: any[]): any[] {
  return val.map((item: any) => cloneDeep(item));
}

export default cloneDeep;
