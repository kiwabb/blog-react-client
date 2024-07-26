import '@umijs/max/typings';

declare module 'enquire-js' {
  const enquire: any; // 根据实际情况替换为正确的类型
  export = enquire;
}
