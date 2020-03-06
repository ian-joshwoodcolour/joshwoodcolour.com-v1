declare module 'choices.js' {
    declare function Choices (
        element: NodeList<HTMLSelectElement> | HTMLSelectElement | string,
        options?: Object
    ): Function;

    declare export default typeof Choices;
};
