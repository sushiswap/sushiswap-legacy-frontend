export declare class Query {
    private provider;
    constructor(provider: any);
    getBlockByNumber(blockNumber: string, fullTransaction: boolean): Promise<any>;
    getCode(address: string, blockNumber?: string): Promise<any>;
    estimateGas(txParams: any): Promise<any>;
    private sendAsync;
}
