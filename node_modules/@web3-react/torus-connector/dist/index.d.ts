import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
interface TorusConnectorArguments {
    chainId: number;
    initOptions?: any;
    constructorOptions?: any;
    loginOptions?: any;
}
export declare class TorusConnector extends AbstractConnector {
    private readonly chainId;
    private readonly initOptions;
    private readonly constructorOptions;
    private readonly loginOptions;
    torus: any;
    constructor({ chainId, initOptions, constructorOptions, loginOptions }: TorusConnectorArguments);
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): Promise<void>;
    close(): Promise<void>;
}
export {};
