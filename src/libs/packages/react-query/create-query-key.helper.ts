const createQueryKey = (prefix: string, key: string) => {
  return `${prefix}@${key}`;
};

export { createQueryKey };
