import type {Element as ReactElement} from 'react';

declare module 'react-motion' {
    declare type Style = {[key: string]: number | OpaqueConfig};

    declare type PlainStyle = {[key: string]: number};

    declare type Velocity = {[key: string]: number};

    declare type OpaqueConfig = {
        val: number,
        stiffness: number,
        damping: number,
        precision: number,
    };

    declare type SpringHelperConfig = {
        stiffness?: number,
        damping?: number,
        precision?: number
    };

    declare function spring (value: number, options: ?SpringHelperConfig): number;

    declare type Props = {
        Component: React$Component<*>,
        defaultStyle?: PlainStyle,
        style: Style,
        children: (interpolatedStyle: PlainStyle) => ReactElement,
        onRest?: () => void,
    };

    declare class Motion extends React$Component<Props> {
        static render(): Function;
    }

    declare class StaggeredMotion extends React$Component<Props> {
        static render(): Function;
    }

    /**
     * TODO: Fix this
     */
    declare module.exports: {
        Motion: any,
        spring: any,
        StaggeredMotion: any,
    };
};
