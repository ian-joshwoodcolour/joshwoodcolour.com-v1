declare module 'clipboard' {
    declare class Clipboard {
        constructor(selector: string,): void;
        on(event: string, callback?: Function): void;
        clearSelection(): void;
        destroy(): void;
    }

    declare module.exports: typeof Clipboard;
};
