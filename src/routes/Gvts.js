import { copyToClipboardButton } from '../class/Tools';
import { useState, useEffect } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import AddressMoreInfo from '../components/AddressMoreInfo'
import { toast } from 'react-toastify'
import GvtOverview from "../components/GvtOverview";
import {getGvtStats} from "../repository/APIcall";
const Gvts = ({ networkName }) => {

    // -=< Variables >=- ------------------------------------------------------------------------------------------------------ //
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [gvt, setGvt] = useState({
        hash: params.gvtHash,
        owner: "",
        number: "##"
    });

    // -=< Effects >=- ------------------------------------------------------------------------------------------------------ //
    useEffect(() => {
        getGvtStats(params.gvtHash).then((res) => {
            if(res.isError){
                toast.error("Error: "+res.result);
                setGvt({
                    number: "N/A",
                    owner: "N/A",
                    hash: "N/A"
                });
                setLoading(false);
            }else{
                setGvt(res.result);
                setLoading(false);
            }
        }).catch((err) => {
            console.log("Error retrieving gvt info: ", err);
            toast.error("Error loading GVT info, retry later.");
        });
    }, [params.gvtHash])

    //if params changes, reload page

    if (loading) return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h5 className="Title">GVT: {params.gvtHash.substring(0,20)}...{copyToClipboardButton(params.gvtHash)}</h5>
            <Spinner animation="border" variant="primary" />
        </main>
    )
    // -=< Render >=- ------------------------------------------------------------------------------------------------------ //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>

            <h5 className="Title">GVT: {params.gvtHash.substring(0,20)}...{copyToClipboardButton(params.gvtHash)}</h5>

            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={6}>
                    <GvtOverview gvt={gvt} />
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <AddressMoreInfo address={gvt} />
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
export default Gvts