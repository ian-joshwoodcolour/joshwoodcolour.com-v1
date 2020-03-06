declare module 'scrollmonitor' {
    declare class ScrollMonitorInstance {
        enterViewport(callback: Function): Function;
    }

    declare function create (
        item: HTMLElement,
        offset: number
    ): ScrollMonitorInstance;

    declare export default typeof create;
};
