import { copyToClipboardButton } from '../class/Tools'

// -=< React.Component >=- ------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"

// -=< Components >=- ------------------------------------------------------------------------------------------------------ //
import AddressOverview from '../components/AddressOverview'
import AddressMoreInfo from '../components/AddressMoreInfo'
import AddressGVTs from '../components/AddressGVTs'
import {getAddressStats} from "../repository/APIcall";
import { toast } from 'react-toastify';
import AddressTxTable from "../components/AddressTxTable";

const Address = ({ addTxs, setAddTxs, setTx }) => {
    const params = useParams();
    const [txs, setTxs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({
        address: params.walletAddress,
        custom: "",
        balance: "000000000",
        incoming: "000000000",
        outgoing: "000000000",
        gvt: []
    });

    const getAddressInfo = async (address) => {
        try{
            const response = await getAddressStats(address);
            setAddress(response.result);
            setLoading(false);
        }catch (e) {
            console.log("Error loading address...");
            toast.error("Error loading address stats");
        }
    }

    // -=< Effects >=- ------------------------------------------------------------------------------------------------------ //
    useEffect(() => {
        setLoading(true);
        getAddressInfo(params.walletAddress);
    }, [params.walletAddress])

    //if params changes, reload page

    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h5 className="Title">Address: {params.walletAddress}{copyToClipboardButton(params.walletAddress)}</h5>
            <Spinner animation="border" variant="primary" />
        </main>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>

                <h5 className="Title">Address: {params.walletAddress}{copyToClipboardButton(params.walletAddress)}</h5>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6}>
                        <AddressOverview address={address} />
                    </Col>
                    <Col xs={12} md={12} lg={6}>
                        <AddressGVTs gvtList={address.gvt} />
                        <AddressMoreInfo address={address} />
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12}>
                        <AddressTxTable address={address.address} addTxs={addTxs} setAddTxs={setAddTxs} setTx={setTx} />
                    </Col>
                </Row>

            {/*<Row>
                    <Col xs={12} md={12} lg={12}>
                        <Card className="infobox">
                            <Card.Header>
                                <Card.Title><b>Transactions List</b></Card.Title>
                                <Nav variant="tabs" defaultActiveKey="#tx" onSelect={(selectedKey) => setActiveTab(selectedKey)} >
                                    <Nav.Item>
                                        <Nav.Link href="#tx">Transactions</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#inttx">Internal Tx</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#int">Contracts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#disabled" disabled>
                                        Disabled
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                {cardbody}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}

            </main>
    );
}
export default Address