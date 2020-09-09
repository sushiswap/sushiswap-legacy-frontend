export const getEthChainInfo = () => {
    let chainId: number = 42;
    let rpcUrl: string = 'https://kovan.infura.io/';
    let ethscanType: string = 'kovan.';
    const href = window.location.href;
    if (/\/\/[sushi|sashimi|]+.aelf.io|\/\/sashimi.cool/.test(href)) {
        chainId = 1;
        rpcUrl = 'https://mainnet.eth.aragon.network/';
        ethscanType = '';
    }
    return {
        chainId,
        rpcUrl,
        ethscanType
    }
};
