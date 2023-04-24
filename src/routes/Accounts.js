import {useState, useEffect} from 'react'
import {Button, Table, Card, Row, Col, Spinner, ListGroup} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {copyToClipboardButton, linkAddress} from '../class/Tools'
import {getTopAccounts} from "../repository/APIcall";
import {toast} from "react-toastify";
import {balance2Currency} from "../components/CoinUtil";
const Accounts = () => {
    const [loading, setLoading] = useState(true);
    const [topBalances, setTopBalances] = useState([
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0},
        {name: '...', balance: 0}
    ])

    const pullTopAddress = async () => {
        try {
            const res = await getTopAccounts(10);
            setTopBalances(res.result);
            setLoading(false);
        }catch (e) {
            console.log("Failed to pull top accounts: ", e);
            toast.error("Failed to retrieve top accounts, retry later.");
        }
    }

    useEffect(() => {
        pullTopAddress()
    }, []);

    // Render ---------------------------------------------------------------------------------------------------------- //
    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Top Balances</h4>
            <Spinner animation="border" variant="primary" />
        </main>
    )

    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className="Title">Top Balances</h4>
            <Row>
                <Col>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Balances</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th className='txt-align-center'>Balance</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topBalances && topBalances.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><Link title={item.address}
                                                  to={`/address/${item.address}`}>{item.address}</Link></td>

                                        <td className='normalized-txt txt-align-right pe-3'>{balance2Currency(item.balance)} noso</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br/>
            {/*
            <Row>

                <Col md={6}>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Miners</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Miner</th>
                                    <th>Blocks</th>
                                    <th>Total Rewards</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topMiners && topMiners.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name ? (<Link title={item.miner}
                                                                to={`/address/${item.miner}`}>{item.name}</Link>) : (
                                            <span>{linkAddress(item.miner)}</span>)}</td>
                                        <td>{item.blocks}</td>
                                        <td>{item.totalrewards / 1000000000} xNOSO</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Gas Used</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Addresses</th>
                                    <th>Txns Count</th>
                                    <th>Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topGasUsed && topGasUsed.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name ? (<Link title={item.address}
                                                                to={`/address/${item.address}`}>{item.name}</Link>) : (
                                            <span>{linkAddress(item.address)}</span>)}</td>
                                        <td>{item.txnscount}</td>
                                        <td></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            <br/>
            <Row>
                <Col md={6}>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Contracts by Value</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Contracts</th>
                                    <th>Origin</th>
                                    <th>Total Wrapped xNOSO</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topContracts && topContracts.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name ? (<Link title={item.address}
                                                                to={`/address/${item.address}`}>{item.name}</Link>) : (
                                            <span>{linkAddress(item.address)}</span>)}</td>
                                        <td><Link title={item.blocknumber}
                                                  to={`/block/${item.blocknumber}`}>{item.blocknumber}</Link></td>
                                        <td>{item.balance / 1000000000000000000} xNOSO</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Contracts by Tx</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <Table size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Contracts</th>
                                    <th>Txns Count</th>
                                    <th>Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topContractsTxns && topContractsTxns.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name ? (<Link title={item.address}
                                                                to={`/address/${item.address}`}>{item.name}</Link>) : (
                                            <span>{linkAddress(item.address)}</span>)}

                                            {item.erctype ? (
                                                <Button variant="outline-primary" size="sm">{item.erctype}</Button>) : (
                                                <span></span>)}

                                        </td>
                                        <td>{item.txnscount}</td>
                                        <td></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>*/}
        </main>
    );
}
export default Accounts