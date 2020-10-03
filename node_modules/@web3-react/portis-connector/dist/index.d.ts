import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
declare type Network = number | {
    chainId: string;
    [key: string]: any;
};
interface PortisConnectorArguments {
    dAppId: string;
    networks: Network[];
    config?: any;
}
export declare class PortisConnector extends AbstractConnector {
    private readonly dAppId;
    private readonly networks;
    private readonly config;
    portis: any;
    constructor({ dAppId, networks, config }: PortisConnectorArguments);
    private handleOnLogout;
    private handleOnActiveWalletChanged;
    private handleOnError;
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    changeNetwork(newNetwork: number | Network, isGasRelayEnabled?: boolean): Promise<void>;
    close(): Promise<void>;
}
export {};
