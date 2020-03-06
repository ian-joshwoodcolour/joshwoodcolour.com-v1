declare module 'animejs' {
    declare type AnimeConfig = {
        [index: string]: any
    };

    declare function anime (config: AnimeConfig): Function;

    declare export default typeof anime;
};
