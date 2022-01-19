export function clear(name: string, options?: CookieOptions): boolean;
export function clearAll(name: string): boolean;
export function cookies(name: string): CookieCrumb[];
export function get(name: string): CookieCrumb[];
export function set(name: string, value: string, options?: CookieOptions): void;
export function val(name: string): string | null;

interface CookieCrumb {
  name: string;
  value: string;
}

interface CookieOptions {
  expires?: string | number | Date;
  path?: string;
  domain?: string;
}
