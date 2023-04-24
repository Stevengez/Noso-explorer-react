import {useState, useEffect, useCallback} from 'react'
import { Col, Row } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import Dashboard from '../components/Dashboard'
import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'
import { getMarketBTCPrice, getMarketUSDPrice } from "../repository/APIcall";
import {toast} from "react-toastify";

const Home = ({ timeTilNextBlock, lastBlock, blocks, mainnet, txs, setTx }) => {

    const [stats, setStats] = useState({
        nosoPriceUSD: undefined,
        nosoPriceHigh: undefined,
        nosoPriceLow: undefined,
        nosoPriceBTC: undefined
    });

    const getStats = useCallback(async () => {
        try {
            let res = await getMarketUSDPrice();
            stats.nosoPriceUSD = res.lastPrice;
            stats.nosoPriceHigh = res.high;
            stats.nosoPriceLow = res.low;
        }catch (e) {
            toast.error("Error load market usd price");
            console.log("Failed to retrieve usd price data - Err");
            stats.nosoPriceUSD = undefined;
            stats.nosoPriceHigh = undefined;
            stats.nosoPriceLow = undefined;
        }

        try {
            let res = await getMarketBTCPrice();
            stats.nosoPriceBTC = res.lastPrice;
        }catch (e) {
            toast.error("Error load market btc price");
            console.log("Failed to retrieve btc price data - Err");
            stats.nosoPriceBTC = undefined;
        }

        setStats(stats);
    },[stats]);

    const startSyncTask = useCallback(() => {
        getStats();
        return setInterval(getStats, 300000);
    },[getStats])

    useEffect(() => {
        let nosoPriceTask = startSyncTask();
        return () => {
            clearInterval(nosoPriceTask);
        };
    }, [startSyncTask]);

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4>Explore the Noso Blockchain</h4>

            {/* Search Bar */}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.9rem', marginBottom: '0.9rem'}}>
                <SearchBar setTx={setTx} />
            </div>

            {/* Stats */}
            <Dashboard lastBlock={lastBlock} ttNextBlock={timeTilNextBlock} stats={{...stats, ...mainnet}} />

            {/* Blocks & Transactions */}
            <div className="mt-3">
                <Row >
                    <Col xs={12} md={12} lg={6} xl={6}>
                        <LatestBlocks blocks={blocks} />
                    </Col>
                    <Col xs={12} className='d-sm-block d-lg-none'>
                        <p/>
                    </Col>
                    <Col xs={12} md={12} lg={6} xl={6}>
                        <LatestTransactions txs={txs}/>
                    </Col>
                </Row>
            </div>

        </main>
    );
}
export default Home