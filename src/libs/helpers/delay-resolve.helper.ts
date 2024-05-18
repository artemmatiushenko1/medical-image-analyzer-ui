const delayResolve = <T>(ms: number, resolveValue: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(resolveValue), ms));

export { delayResolve };
