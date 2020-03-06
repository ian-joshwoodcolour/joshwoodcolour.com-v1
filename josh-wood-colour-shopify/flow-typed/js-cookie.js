declare module 'js-cookie' {
    declare type CookieOptions = {
        expires?: number | Date,
        path?: string,
        domain?: string,
        secure?: boolean
    };

    declare class Cookie {
        defaults: CookieOptions,
        static set(name: string, value: mixed, options?: CookieOptions): void;
        static get(name: string, ...args: Array<void>): string | void;
    }

    declare export default typeof Cookie;
};
