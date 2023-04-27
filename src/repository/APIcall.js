import Config from '../config.json';
import { Base64 } from 'js-base64';
const prepareBase64 = () => {
    const current = Math.floor(Date.now() / 1000);
    console.log("Now: ", current);
    const method = Base64.encode(current+process.env.REACT_APP_API_TOKEN);
    return method;
}
const fetchRPC = async (method, params, retries = 1) => {
    try {
        let response = await fetch(Config.translatorAPI+'/RPC', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': prepareBase64()
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: method,
                params: params.split(" "),
                id: Math.floor(Date.now()/15000)
            })
        });
        return await response.json();
    }catch (e) {
        if(retries < Config.maxFetchRetries){
            await new Promise(r => setTimeout(r, 100*retries));
            return await fetchRPC(method, params, retries+1);
        }else{
            throw e;
        }
    }
}
const fetchAPI = async (URL, authorization, method, body, retries = 1) => {
    let options = method === 'GET' ? { method: method
    } : { method: method, body: JSON.stringify(body) }

    if(authorization){
        options.headers = {
            'Authorization': prepareBase64()
        }
        console.log("Auth: ", options);
    }

    try {
        let response = await fetch(URL, options);
        let parsedRes = await response.json();
        if(parsedRes.isError && parsedRes.result.code === 7007){
            console.log("API[7007] not ready, retrying...");
            throw parsedRes;
        }
        return parsedRes;
    }catch (e) {
        if(retries < Config.maxFetchRetries){
            await new Promise(r => setTimeout(r, 100*retries));
            return await fetchAPI(URL, method, body, retries + 1);
        }else{
            throw e;
        }
    }
}

export const getMarketUSDPrice = async () => {
    return await fetchAPI(
        Config.marketAPI + '/markets/NOSO-USDT',
        false,
        'GET',
        undefined
    )
}
export const getMarketBTCPrice = async () => {
    return await fetchAPI(
        Config.marketAPI + '/markets/NOSO-BTC',
        false,
        'GET',
        undefined
    )
}

export const getOrders = async (page, pageSize) => {
    return await fetchAPI(
        Config.marketAPI + '/markets/NOSO-BTC',
        false,
        'GET',
        undefined
    )
}

export const getServerTime = async () => {
    return await fetchAPI(
        Config.translatorAPI + '/Time',
        true,
        'GET',
        undefined
    )
}
export const getTopAccounts = async (limit) => {
    return await fetchAPI(
        Config.translatorAPI + '/Address/Top/'+limit,
        true,
        'GET',
        undefined
    )
}

export const getOrdersPage = async (page, pageSize) => {
    return await fetchAPI(
        Config.translatorAPI + `/Orders?page=${page}&pageSize=${pageSize}`,
        true,
        'GET',
        undefined
    )
}

export const getAddressHistoryPage = async (address, page, pageSize) => {
    return await fetchAPI(
        Config.translatorAPI + `/Address/${address}/History?page=${page}&pageSize=${pageSize}`,
        true,
        'GET',
        undefined
    )
}

export const getAddressStats = async (addr) => {
    return await fetchAPI(
        Config.translatorAPI + '/Address/' + addr,
        true,
        'GET',
        undefined
    )
}

export const getGvtStats = async (gvtHash) => {
    return fetchAPI(
        Config.translatorAPI + '/GVT/' + gvtHash,
        true,
        'GET',
        undefined
    )
}

export const getPendingOrders = async () => {
    return fetchAPI(
        Config.translatorAPI + '/Pendings',
        true,
        'GET',
        undefined
    )
}


/* RPC Requests */
export const getMainNetInfo = async () => {
    return await fetchRPC('getmainnetinfo',"" )
}

export const getBlockData = async (blockNumber) => {
    let blockInfo = await fetchRPC(
        'getblocksinfo',
        blockNumber.toString()
    );

    blockInfo.errorBlock = blockNumber;
    return blockInfo;
}

export const getBlockRangeData = async (start, end) => {
    let pullingTasks = []
    for (let b = end; b > start; b--) {
        pullingTasks.push(getBlockData(b));
    }
    return Promise.all(pullingTasks);
}

export const getBlockOrders = async (blockNumber) => {
    return await fetchRPC(
        'getblockorders',
        blockNumber.toString()
    )
}

export const getOrderInfo = async (orderid) => {
    return await fetchRPC(
        'getorderinfo',
        orderid
    )
}