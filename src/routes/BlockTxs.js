import React, {useState, useEffect} from 'react'
import {Card, Spinner, Row} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { toast } from 'react-toastify';
import {Tooltip} from "primereact/tooltip";
import {balance2Currency} from "../components/CoinUtil";
import TimeAgo from 'javascript-time-ago';
import {unixToDate} from "../class/Tools";
import {fromTemplate, orderHashTemplate, toTemplate} from "../class/Templates";

const BlockTxs = ({txs, getBlockTxs, setTx, pendings}) => {
    const params = useParams();
    const timeAgo = new TimeAgo('en-US');

    const [loading, setLoading] = useState(true);
    const [blockTxs, setBlockTxs] = useState([]);

    useEffect(() => {
        setLoading(true);
        getBlockTxs(params.blockNumber);
    }, [params.blockNumber]);

    useEffect(() => {
        if(txs[params.blockNumber] !== undefined && Array.isArray(txs[params.blockNumber])){
            setLoading(false);
            setBlockTxs(txs[params.blockNumber]);
        }
    }, [txs]);

    const feesTemplate = (tx) => {
        return <div className='normalized-txt txt-align-right'>
            {balance2Currency(tx.fee)}
        </div>
    }

    const amountTemplate = (tx) => {
        return <div className='normalized-txt txt-align-right'>
            {balance2Currency(tx.amount)}
        </div>
    }

    const timeTemplate = (tx) => {
        return (
            <div>
                <Tooltip target={`.time-${tx.orderid}`} style={{fontSize: '0.8rem'}} />
                <div
                    className={`time-${tx.orderid} normalized-txt small`}
                    data-pr-tooltip={unixToDate(tx.timestamp)}
                    data-pr-position='top'>
                    {timeAgo.format(tx.timestamp * 1000)}
                </div>
            </div>
        );
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <Row className='px-sm-0 px-md-3'>
                <Card>
                    <Card.Header>
                        { pendings ? 'Pending Transactions' : 'Transactions for block '+params.blockNumber } {
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
                                !pendings && <Column field='orderid' header='Order Hash' body={orderHashTemplate}/>
                            }
                            <Column field='type' header='Type'/>
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
export default BlockTxs