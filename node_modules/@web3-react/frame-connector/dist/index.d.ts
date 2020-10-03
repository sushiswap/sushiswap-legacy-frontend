import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
export declare class UserRejectedRequestError extends Error {
    constructor();
}
export declare class FrameConnector extends AbstractConnector {
    private provider;
    constructor(kwargs: Required<AbstractConnectorArguments>);
    private handleNetworkChanged;
    private handleChainChanged;
    private handleAccountsChanged;
    private handleClose;
    activate(): Promise<ConnectorUpdate>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number>;
    getAccount(): Promise<null>;
    deactivate(): void;
}
