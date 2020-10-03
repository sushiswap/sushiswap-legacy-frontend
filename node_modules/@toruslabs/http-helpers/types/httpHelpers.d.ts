export function getAPIKey(): string;
export function setAPIKey(a: string): void
export function clearAPIKey(): void
export function getEmbedHost(): string;
export function setEmbedHost(e: string): void
export function clearEmbedHost(): void
export function promiseTimeout<T>(ms: Number, promise: Promise<T>): Promise<T>
interface CustomOptions {
    useAPIKey?: boolean;
    isUrlEncodedData?: boolean;
    timeout?: Number;
}
interface JsonRpcObject {
    jsonrpc: string,
    method: string,
    id: number,
    params: any,
}

interface Data { }
export function get<T>(url: RequestInfo, options?: RequestInit, customOptions?: CustomOptions): Promise<T>;
export function post<T>(url: RequestInfo, data?: Data, options?: RequestInit, customOptions?: CustomOptions): Promise<T>;
export function patch<T>(url: RequestInfo, data?: Data, options?: RequestInit, customOptions?: CustomOptions): Promise<T>;
export function remove<T>(url: RequestInfo, data?: Data, options?: RequestInit, customOptions?: CustomOptions): Promise<T>;
interface RPCParams { }
export function generateJsonRPCObject(method: string, params: RPCParams): JsonRpcObject
export function promiseRace<T>(url: string, options?: RequestInit, timeout?: Number): Promise<T>;

export { }
