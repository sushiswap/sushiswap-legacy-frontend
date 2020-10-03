interface EpochInfo {
    id: String;
    n: String;
    k: String;
    t: String;
    nodeList: String[];
    prevEpoch: String;
    nextEpoch: String;
}

interface NodeInfo {
    declaredIp: String;
    position: String;
    pubKx: String;
    pubKy: String;
    tmP2PListenAddress: String;
    p2pListenAddress: String;
}

interface TorusNodePub {
    X: String;
    Y: String;
}

interface NodeDetails {
    currentEpoch: String;
    nodeListAddress: String;
    torusNodeEndpoints: String[];
    torusIndexes: Number[];
    torusNodePub: TorusNodePub[];
    updated: Boolean;
}

interface NodeDetailManagerCtorArgs {
    network?: String;
    proxyAddress?: String;
}

declare class NodeDetailManager {
    constructor(args: NodeDetailManagerCtorArgs);
    getNodeDetails(skip?: Boolean): Promise<NodeDetails>;
    getNodeEndpoint(nodeEthAddress: String): Promise<NodeInfo>;
    getEpochInfo(epoch: Number): Promise<EpochInfo>;
    getCurrentEpoch(): Promise<String>;
}

export as namespace FetchNodeDetails;

export = NodeDetailManager;