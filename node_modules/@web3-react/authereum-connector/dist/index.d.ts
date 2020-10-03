import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
interface AuthereumConnectorArguments {
    chainId: number;
    config?: any;
}
export declare class AuthereumConnector extends AbstractConnector {
    private readonly chainId;
    private readonly config;
    authereum: any;
    constructor({ chainId, config }: AuthereumConnectorArguments);
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    close(): Promise<void>;
}
export {};
