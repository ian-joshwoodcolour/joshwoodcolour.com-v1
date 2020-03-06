declare module 'scrollmonitor-react' {
    declare type Props = {
        Component: React$Component<*>
    };

    declare class Watch extends React$Component<Props> {
        static render(): Function
    }

    /**
     * TODO: Fix this
     */
    declare module.exports: {
        Watch: any
    };
};
