declare module 'validator/lib/isEmail' {
    declare function isEmail (value: string): boolean;

    declare export default typeof isEmail;
};

declare module 'validator/lib/isAlpha' {
    declare function isAlpha (value: string): boolean;

    declare export default typeof isAlpha;
};

declare module 'validator/lib/isLength' {
    declare type IsLengthOptions = {
        max?: number,
        min?: number
    };

    declare function isLength (value: string, options: IsLengthOptions): boolean;

    declare export default typeof isLength;
};
