import BN from 'bn.js'

declare class Torus {
    constructor(options?: TorusCtorOptions);
    static setAPIKey(apiKey: string): void;
    static setEmbedHost(embedHost: string): void;
    retrieveShares(endpoints: String[], indexes: Number[], verifier: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord' | 'jwt' | string, verifierParams: VerifierParams, idToken: String): Promise<ShareResponse>;
    lagrangeInterpolation(shares: BN[], nodeIndex: BN[]): BN;
    generateAddressFromPrivKey(privateKey: BN): String;
    getPublicAddress(endpoints: String[], torusNodePubs: TorusNodePub[], verifierArgs: VerifierArgs, isExtended: Boolean): Promise<String | TorusPublicKey>;
}

export as namespace TorusUtils;

export = Torus;

interface TorusCtorOptions { 
    enableLogging?: Boolean;
    metadataHost?: string;
    allowHost?: string;
}

interface TorusPublicKey extends TorusNodePub {
    address: String;
}

interface TorusNodePub {
    X: String;
    Y: String;
}

interface ShareResponse {
    ethAddress: String;
    privKey: String;
}

interface VerifierArgs {
    verifier: 'google' | 'facebook' | 'twitch' | 'reddit' | 'discord' | 'jwt' | string;
    verifierId: String;
}

interface VerifierParams {
    verifier_id: String;
}