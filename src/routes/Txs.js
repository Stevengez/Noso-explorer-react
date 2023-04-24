import React, {useState, useEffect} from 'react'
import {Card, Spinner, Row} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { toast } from 'react-toastify';
import {getPendingOrders} from "../repository/APIcall";
import {
    amountTemplate,
    feesTemplate,
    fromTemplate,
    orderHashTemplate,
    timeTemplate,
    toTemplate
} from "../class/Templates";

const Txs = ({ txs, getTxsPage, setTx, pendings}) => {
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [blockTxs, setBlockTxs] = useState([]);

    const getPendings = async () => {
        try {
            const response = await getPendingOrders();
            setBlockTxs(response.result);
            setLoading(false);
            console.log("Response is: ", response);
        }catch (e) {
            console.log("Error pulling pendings: ", e.message);
            toast.error("Error retrieving pending transactions, retry later.");
        }
    }

    useEffect(() => {
        setLoading(true);
        if(pendings){
            getPendings();
        }else{
            let txPage = getTxsPage(parseInt(params.page), 25);
            if(Array.isArray(txPage)){
                setLoading(false);
                setBlockTxs(txs[params.page]);
            }
        }

    }, [params.page]);

    useEffect(() => {
        if(!pendings){
            if(txs[params.page] !== undefined && Array.isArray(txs[params.page])){
                setLoading(false);
                setBlockTxs(txs[params.page]);
            }
        }
    }, [txs]);

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <Row className='px-sm-0 px-md-3'>
                <Card>
                    <Card.Header>
                        { pendings ? 'Pending Transactions' :
                            <>
                                {
                                    params.page > 0 && <Link to={`/txs/${parseInt(params.page) - 1}`} className="btn btn-primary btn-card">Previous</Link>
                                }&nbsp;&nbsp;&nbsp;&nbsp;
                                All time transactions, page {params.page}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to={`/txs/${parseInt(params.page) + 1}`} className="btn btn-primary btn-card">Next</Link>
                            </>
                        } {
                            loading &&
                            <Spinner size='sm' animation="border" variant="secondary"/>
                        }
                    </Card.Header>
                    <Card.Body style={{padding: '0px', paddingBottom: '5px'}}>
                        <DataTable
                            loading={loading}
                            value={blockTxs}
                            stripedRows
                            selectionMode={'single'}
                            size='small'
                            paginator
                            rows={20}
                            rowsPerPageOptions={[5,10,15,20,25]}
                        >
                            {
                                !pendings && <Column field='orderid' header='Order Hash' body={(tx) => orderHashTemplate(tx, setTx)}/>
                            }
                            <Column field='type' header='Type' body={() => 'TRFR'}/>
                            <Column field='sender' header='From' body={fromTemplate}/>
                            <Column field='receiver' header='To' body={toTemplate}/>
                            <Column field='amount' header='Amount' body={amountTemplate}/>
                            <Column field='fee' header='Tx Fee' body={feesTemplate}/>
                            {
                                !pendings && <Column field='timestamp' header='Timestamp' body={timeTemplate}/>
                            }
                        </DataTable>
                    </Card.Body>
                </Card>
            </Row>
        </main>
    );
}
export default Txs