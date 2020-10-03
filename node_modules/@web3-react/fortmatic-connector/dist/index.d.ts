import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
interface FortmaticConnectorArguments {
    apiKey: string;
    chainId: number;
}
export declare class FortmaticConnector extends AbstractConnector {
    private readonly apiKey;
    private readonly chainId;
    fortmatic: any;
    constructor({ apiKey, chainId }: FortmaticConnectorArguments);
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    close(): Promise<void>;
}
export {};
