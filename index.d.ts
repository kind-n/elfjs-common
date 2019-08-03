// Type definitions for elfjs-common v2.0
// Project: https://www.elfjs.org/
// Definitions by: Wu Hu <https://github.com/kind-n>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6


import * as Elf from "elfjs";

declare module "elfjs" {

    export function isArray    (value: any): boolean;
    export function isBasic    (value: any): boolean;
    export function isEmpty    (value: any): boolean;
    export function isValid    (value: any): boolean;
    export function isString   (value: any): boolean;
    export function isNumber   (value: any): boolean;
    export function isObject   (value: any): boolean;
    export function isRegExp   (value: any): boolean;
    export function isBoolean  (value: any): boolean;
    export function isFunction (value: any): boolean;
    export function parseQueryString (value: string): any;
    export function buildQueryString (value: any): string;

    export namespace common {

        class BindDirective implements Elf.IDirective {
            onInitial (product: IComponent | HTMLElement, props: any): void;
            onRenewal (product: IComponent | HTMLElement, props: any): void;
            onDispose (product: IComponent | HTMLElement, props: any): void;
        }

    }
}

export = Elf;