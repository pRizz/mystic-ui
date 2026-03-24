type PlainObject = Record<string, unknown>;
interface TailwindComponentExtend {
    animation?: Record<string, string>;
    keyframes?: Record<string, Record<string, PlainObject>>;
}
export declare const mysticTailwindComponentExtends: Record<string, TailwindComponentExtend>;
export declare const mysticTailwindManualPackageContentGlob = "./node_modules/mystic-ui/components/tailwind/src/ui/**/*.{js,ts,jsx,tsx}";
export declare const mysticThemeCssText = ":root {\n\tcolor-scheme: light;\n\t--background: 0 0% 100%;\n\t--foreground: 222.2 84% 4.9%;\n\t--primary: 222.2 47.4% 11.2%;\n\t--primary-foreground: 210 40% 98%;\n\t--accent: 210 40% 96.1%;\n\t--accent-foreground: 222.2 47.4% 11.2%;\n\t--input: 214.3 31.8% 91.4%;\n}\n\n.dark {\n\tcolor-scheme: dark;\n\t--background: 222.2 84% 4.9%;\n\t--foreground: 210 40% 98%;\n\t--primary: 210 40% 98%;\n\t--primary-foreground: 222.2 47.4% 11.2%;\n\t--accent: 217.2 32.6% 17.5%;\n\t--accent-foreground: 210 40% 98%;\n\t--input: 217.2 32.6% 17.5%;\n}\n";
export declare function isPlainObject(value: unknown): value is PlainObject;
export declare function mergePlainObjects(base: PlainObject, override: PlainObject): PlainObject;
export declare function getMysticTailwindThemeExtend(): PlainObject;
export {};
