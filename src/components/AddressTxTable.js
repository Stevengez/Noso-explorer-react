import React, {useEffect, useState} from "react";
import {Button, Card, Spinner} from 'react-bootstrap'
import { Link } from "react-router-dom"
import {balance2Currency} from "./CoinUtil";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {getAddressHistoryPage} from "../repository/APIcall";
import {toast} from "react-toastify";
import {
    amountTemplate,
    feesTemplate,
    fromTemplate,
    orderHashTemplate,
    timeTemplate,
    toTemplate
} from "../class/Templates";

const AddressTxTable = ({ address, addTxs, setAddTxs, setTx }) => {
    // Render ---------------------------------------------------------------------------------------------------------- //
    const [dataPage, setDataPage] = useState([]);
    const [txPage, setPage] = useState(addTxs.address === address && addTxs.txs.length > 0 ? 0:-1);
    const [loaded, toggleLoaded] = useState(addTxs.address === address && addTxs.txs.length > 0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Current add: ", addTxs);
    }, []);
    const pullPageTxs = (page) => {
        try {
            let tempAddTxs = {...addTxs};
            if(tempAddTxs.address !== address){
                console.log("Renewing txs data for addrr");
                tempAddTxs.address = address;
                tempAddTxs.txs = [];
            }

            if(tempAddTxs.txs[page] === undefined){ // || !Array.isArray(txs[page])
                setLoading(true);
                tempAddTxs.txs[page] = getAddressHistoryPage(address, page, 25).then(res => {
                    setAddTxs((prev) => {
                        let newTxs = {...prev};
                        newTxs.txs[page] = res;
                        return (newTxs);
                    });
                    setLoading(false);
                }).catch((err) => {
                    console.log("Error retrieving order history, retry later: ", err);
                    toast.error("Error loading history, retry later");
                });

                setAddTxs(tempAddTxs);
            }else{
                if(Array.isArray(addTxs.txs[txPage])){
                    setDataPage(addTxs.txs[txPage])
                }
            }
        }catch (e) {
            console.log("Error retrieving order history, retry later: ", e);
            toast.error("Error loading history, retry later");
        }
    }

    useEffect(() => {
        if(addTxs.txs[txPage] !== undefined && Array.isArray(addTxs.txs[txPage])){
            setDataPage(addTxs.txs[txPage])
        }
    }, [addTxs]);

    useEffect(() => {
        if(txPage !== -1){
            console.log("Page changed: ", txPage);
            pullPageTxs(txPage);
        }
    }, [txPage])

    return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title>
                    <div className='d-flex justify-content-between align-items-center'>
                        {
                            loading && <Spinner size='sm' animation="border" variant="secondary" />
                        }
                        <b style={{marginLeft: loading?'-25px':'0px'}}>Address Txs History</b>
                        {
                            loaded && <div>
                                <Button
                                    className={txPage > 0?'btn-warning':'btn-secondary'}
                                    onClick={() => {
                                        if(txPage > 0) setPage((prev) => (prev-1));
                                    }}
                                >
                                    Prev
                                </Button>
                                &nbsp;
                                <span className='normalized-txt'>
                                    Page {txPage}
                                </span>
                                &nbsp;
                                <Button
                                    className='btn-warning'
                                    onClick={() => {
                                        setPage((prev) => (prev+1));
                                    }}
                                >
                                    Next
                                </Button>
                            </div>
                        }
                        {
                            !loaded && <Button className='btn-warning' onClick={() => {
                                    setPage(0);
                                    toggleLoaded(true);
                            }}>Load</Button>
                        }
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {
                    !loaded && <p>Loading an address history can be resource consuming, so click on load if you really need it.</p>
                }
                {
                    loaded && <DataTable
                        loading={loading}
                        value={dataPage}
                        stripedRows
                        selectionMode={'single'}
                        size='small'
                        paginator
                        rows={20}
                        rowsPerPageOptions={[5,10,15,20,25]}
                    >
                        <Column field='orderid' header='Id' body={(tx) => orderHashTemplate(tx, setTx)}/>
                        <Column field='sender' header='From' body={(tx) => fromTemplate(tx, address)}/>
                        <Column field='receiver' header='To' body={(tx) => toTemplate(tx, address)}/>
                        <Column field='amount' header='Amount' body={amountTemplate}/>
                        <Column field='fee' header='Tx Fee' body={feesTemplate}/>
                        <Column field='timestamp' header='Timestamp' body={timeTemplate}/>
                    </DataTable>
                }

            </Card.Body>
        </Card>
    );
};
export default AddressTxTable;