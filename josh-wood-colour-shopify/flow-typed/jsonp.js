declare module 'jsonp' {
  declare type Options = {
    param?: string,
    prefix?: string,
    name?: string,
    timeout?: number
  };

  declare type Response = {
    result: string,
    msg: string
  };

  declare function jsonp(url: string, options: Options, callback: Function): void;

  declare module.exports: typeof jsonp;
};
