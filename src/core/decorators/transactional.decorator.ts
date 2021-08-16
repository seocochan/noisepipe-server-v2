import { MikroORM } from '@mikro-orm/core';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function setOrmInstance(instance: MikroORM): void {
  (global as any).OrmInstance = instance;
}

export function getOrmInstance(): MikroORM {
  const instance = (global as any).OrmInstance as MikroORM | undefined;
  if (!instance) {
    throw new Error('ORM instance is not assigned');
  }
  return instance;
}

type Fn = (this: any, ...args: any[]) => any;

export function Transactional(): MethodDecorator {
  return (
    target: any,
    methodName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value as Fn;
    descriptor.value = function (...args: any[]) {
      const { em } = getOrmInstance();
      const runWithPrevTransaction = () =>
        em.transactional(() => originalMethod.apply(this, [...args]));
      return runWithPrevTransaction();
    };
  };
}
