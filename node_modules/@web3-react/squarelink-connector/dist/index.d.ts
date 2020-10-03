import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
declare type Network = number | {
    chainId: number;
    [key: string]: any;
};
interface SquarelinkConnectorArguments {
    clientId: string;
    networks: Network[];
    options?: any;
}
export declare class SquarelinkConnector extends AbstractConnector {
    private readonly clientId;
    private readonly networks;
    private readonly options;
    squarelink: any;
    constructor({ clientId, networks, options }: SquarelinkConnectorArguments);
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
}
export {};
