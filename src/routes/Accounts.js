import {useState, useEffect} from 'react'
import {Card, Row, Col, Spinner} from 'react-bootstrap'
import {getTopAccounts} from "../repository/APIcall";
import {toast} from "react-toastify";
import {Column} from "primereact/column";
import {
    coinTemplate,
    topTemplate
} from "../class/Templates";
import {DataTable} from "primereact/datatable";
const Accounts = () => {
    const [loading, setLoading] = useState(true);
    const [topBalances, setTopBalances] = useState([
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 },
        { address: '   ', custom: undefined, balance: 0 }
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
            <Row>
                <Col>
                    <Card className="std-card-info">
                        <Card.Header>
                            <Card.Title>Top Balances</Card.Title>
                        </Card.Header>
                        <Card.Body className="std-card-info-body">
                            <DataTable
                                loading={loading}
                                value={topBalances}
                                stripedRows
                                selectionMode={'single'}
                                size='small'
                                rows={25}
                                rowsPerPageOptions={[10,15,25,50,100]}
                            >
                                <Column field='index' header='#' body={(top) => { return topBalances.indexOf(top)+1 }} />
                                <Column field='address' header='Address' body={(top) => topTemplate(top.address, top.custom)}/>
                                <Column field='balance' header='Balance' body={(top) => coinTemplate(top.balance)}/>
                            </DataTable>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br/>
        </main>
    );
}
export default Accounts