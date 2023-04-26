// Modules ----------------------------------------------------------------------------------------- //
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import {Row, Col } from 'react-bootstrap';
import {useState, useEffect, useCallback, useRef} from 'react';

// Export ------------------------------------------------------------------------------------------ //
import './App.css';

import Navigation from './components/Navbar';
import HTTP404 from './components/404.js'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes ------------------------------------------------------------------------------------------ //
import Home from './routes/Home.js'
import Accounts from './routes/Accounts.js'
import Address from './routes/Address.js'
import Block from './routes/Block.js'
import Blocks from './routes/Blocks.js'
import Faq from './routes/Faq.js'
import Tx from './routes/Tx.js'
import Txs from './routes/Txs.js'
import Topstats from './routes/Topstats.js'
import Gvts from "./routes/Gvts";
import {
    getBlockData,
    getBlockOrders,
    getBlockRangeData,
    getMainNetInfo,
    getOrdersPage,
    getServerTime
} from "./repository/APIcall";
import BlockTxs from "./routes/BlockTxs";

// Functions --------------------------------------------------------------------------------------- //
function App() {
    const [timeTilNextBlock, setTimeTilNextBlock] = useState(600);
    const [lastBlock, setLastBlock] = useState(0);
    const [blocks, setBlocks] = useState([]);
    const [blkTxs, setBlkTxs] = useState([]);
    const [txs, setTxs] = useState([]);
    const [addTxs, setAddTxs] = useState({ address: "", txs: []});
    const [tx, setTx] = useState({
        status: undefined, amount: 0,
        block: 0, fee: 4523, orderid: "",
        receiver:"", reference:"",
        sender:"", timestamp: 0,
        trfrs:1, type:"TRFR"
    });
    const [stats, setStats] = useState({
        lastBlock: undefined,
        nosoCirculating: undefined,
        pending: undefined
    });

    const lastBlockRef = useRef();
    lastBlockRef.current = lastBlock;

    const syncServerTime = async () => {
        try {
            let res = await getServerTime();
            if (!res.isError) {
                let ttnb = Math.floor(620-((res.result/1000) % 600));
                setTimeTilNextBlock(ttnb);
            }
        }catch (e) {
            console.log("Failed to retrieve server time - Err");
            toast.error("Error syncing server time, using local time");
            let ttnb = Math.floor(620-((Date.now()/1000) % 600));
            setTimeTilNextBlock(ttnb);
        }
    }

    const clearPendings = () => {
        setStats((prev) => ({
            nosoCirculating: prev.nosoCirculating,
            lastBlock: prev.lastBlock+1,
            pending: 0
        }));

        setLastBlock((prev) => (prev+1));
    }

    const updatePendings = async () => {
        try {
            const res = await getMainNetInfo()
            setStats({
                lastBlock: res.result[0].lastblock,
                nosoCirculating: res.result[0].supply / 100000000,
                pending: res.result[0].pending
            });
            setLastBlock(res.result[0].lastblock);
        } catch (e) {
            console.log("Failed to retrieve mainnet info");
            toast.error("Error loading mainnet stats");
        }
    }

    const getTxsPage = useCallback((page, pageSize = 20, forceSync = false) => {
        try {
            if (forceSync || txs[page] === undefined || (page === 0 && Array.isArray(txs[page]) && txs[page].length === 6)) {
                let prom = getOrdersPage(page, pageSize).then((res) => {
                    setTxs((prev) => {
                        let newTxs = [...prev];
                        newTxs[page] = res;
                        return (newTxs);
                    });
                }).catch((err) => {
                    console.log("Error loading txs page",err);
                    toast.error("Error loading txs page, retry later.");
                });

                setTxs((prev) => {
                    let newTxs = [...prev];
                    newTxs[page] = prom;
                    return (newTxs);
                });
            }else{
                return txs[page];
            }
        }catch (e) {
            console.log("Failed to retrieve recent txs: ", e);
            toast.error("Error loading mainnet stats");
        }
    },[txs]);

    const getBlockTxs = (block) => {
        if (blkTxs[block] === undefined) {
            let prom = getBlockOrders(block).then((res) => {
                setBlkTxs((prev) => {
                    let newTxs = [...prev];
                    newTxs[block] = res.result[0].orders;
                    return (newTxs);
                });
            }).catch((err) => {
                console.log("Error loading txs ",err);
                toast.error("Error loading orders, retry later.");
            });

            setBlkTxs((prev) => {
                let newTxs = [...prev];
                newTxs[block] = prom;
                return (newTxs);
            });

            return prom;
        } else {
            return blkTxs[block];
        }
    }
    const pushLastBlock = async (block) => {
        try {
            let res = await getBlockData(block);
            if(res.result[0].number === -1){
                await new Promise(r => setTimeout(r, 10000));
                return await pushLastBlock(block);
            }else{
                setBlocks((prev) => {
                    let newBlock = res.result[0];
                    let newBlocks = [...prev];
                    newBlocks[0] = [newBlock, ...newBlocks[0]];
                    return (newBlocks);
                })
            }
        }catch (e) {
            console.log("Error retrieving last block: ", e);
        }
    }

    const getBlocksPage = useCallback((page, pageSize, highest) => {
        if (blocks[page] === undefined) {
            //Number maximum of pages
            let offset = Math.floor(highest / pageSize);
            offset = offset - page;
            let start = offset * pageSize;
            let end = (offset + 1) * pageSize;

            //Special Case if page 0
            if (page === 0) {
                start = highest - 7;
                end = highest;
            }

            //console.log("[", highest, "]", "[", page, "]", "Pulling: ", start, "->", end);

            let prom = getBlockRangeData(start, end).then(res => {
                let blocksPage = [];
                res.forEach((v, i) => {
                    blocksPage.push(v.result[0]);
                });

                setBlocks((prev) => {
                    let newBlocks = [...prev];
                    newBlocks[page] = blocksPage;
                    return (newBlocks);
                });
            }).catch((err) => {
                console.log("Error loading blocks ",err);
                toast.error("Error loading blocks, retry later.");
            });

            setBlocks((prev) => {
                let newBlocks = [...prev];
                newBlocks[page] = prom;
                return (newBlocks);
            });

            return prom;
        } else {
            return blocks[page];
        }
    }, [blocks])

    const getLastBlockStats = async () => {
        try {
            const res = await getMainNetInfo()
            let newStats = {
                lastBlock: res.result[0].lastblock,
                nosoCirculating: res.result[0].supply / 100000000,
                pending: res.result[0].pending
            };
            setStats(newStats);
            setLastBlock(newStats.lastBlock);
            getBlocksPage(0, 25, newStats.lastBlock);
            getTxsPage(0, 6);
        } catch (e) {
            console.log("Failed to retrieve mainnet info");
            toast.error("Error loading mainnet stats");
            getBlocksPage(0, 25, stats.lastBlock);
            getTxsPage(0, 6);
        }
    };

    useEffect(() => {
        getLastBlockStats();
        syncServerTime();

        let timerInterval = setInterval(() => {
            setTimeTilNextBlock((prev) => {
                if(prev > 0){
                    return (prev-1);
                }else{
                    setTimeout(() => pushLastBlock(lastBlockRef.current), 10000);
                    clearPendings();
                    syncServerTime();
                    setTimeout(() => getTxsPage(0, 6, true), 60000);
                    return (600);
                }
            });
        }, 1000);

        let pendingInterval = setInterval(updatePendings, 120000);

        return () => {
            clearInterval(timerInterval);
            clearInterval(pendingInterval);
        }
    }, []);

    // Render ---------------------------------------------------------------------------------------- //
    return (
        <HashRouter>
            <div className="App">
                <div>
                    {window.location.pathname === '/'
                        ? <Navigation stats={stats}/>
                        : <Navigation stats={stats}/>
                    }
                </div>
                <div className="container extra-container">
                    <Routes>
                        <Route exact path="/" element={
                            <Home
                                timeTilNextBlock={timeTilNextBlock}
                                clearPending={clearPendings}
                                updatePendings={updatePendings}
                                mainnet={stats}
                                lastBlock={lastBlock}
                                blocks={blocks}
                                txs={txs}
                                setTx={setTx} />
                        }/>
                        <Route path="/accounts" element={
                            <Accounts/>
                        }/>

                        <Route path="/address/:walletAddress" element={
                            <Address addTxs={addTxs} setAddTxs={setAddTxs} setTx={setTx} />
                        }/>

                        <Route path="/gvt/:gvtHash" element={
                            <Gvts/>
                        }/>

                        <Route path="/block/:blockNumber" element={
                            <Block/>
                        }/>

                        <Route path="/blocks/:page" element={
                            <Blocks mainnet={stats} lastBlock={lastBlock} blocks={blocks}
                                    getBlocksPage={getBlocksPage}/>
                        }/>
                        <Route path="/block/:blockNumber/txs" element={
                            <BlockTxs txs={blkTxs} getBlockTxs={getBlockTxs} setTx={setTx} />
                        }/>

                        <Route path="/tx/:orderId" element={
                            <Tx tx={tx} setTx={setTx} />
                        }/>

                        <Route path="/txs/:page" element={
                            <Txs blkTxs={blkTxs} txs={txs} getTxsPage={getTxsPage} setTx={setTx} />
                        }/>
                        <Route path="/txsPending" element={
                            <Txs pendings={true} />
                        }/>

                        <Route path="/topstats" element={
                            <Topstats/>
                        }/>

                        <Route path="/faq" element={
                            <Faq/>
                        }/>

                        <Route path="*" element={
                            <HTTP404/>
                        }/>
                    </Routes>
                </div>
                <div className="footer align-self-end">
                    <div className="container">
                        <Row>
                            <p>
                                NOSO Explorer is a tool for navigating and analyzing the NOSO blockchain.
                            </p>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <p>
                                    Copyright <a href="https://github.com/Noso-Project" target="_blank"
                                                 rel="noopener noreferrer">S7evenSoftware</a> 2023. All rights reserved.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <ToastContainer
                    position='top-left'
                    autoClose={1000}
                    hideProgressBar={true}
                    draggable
                    pauseOnHover
                    theme='colored'/>
            </div>
        </HashRouter>
    );
}

export default App;