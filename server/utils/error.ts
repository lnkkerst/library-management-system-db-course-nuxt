export function proxyZodError<T extends object>(obj: T): T {
  const proxyObject = new Proxy(obj, {
    get(target, prop) {
      const originalMethod = target[prop as keyof typeof obj];
      if (typeof originalMethod === 'function') {
        return function (...args: any[]) {
          try {
            return originalMethod.apply(target, args);
          }
          catch (error) {
            throw createError({
              status: 400,
              data: error
            });
          }
        };
      }
      else {
        return originalMethod;
      }
    }
  });
  return proxyObject as T;
}
