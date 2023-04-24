import React, {useEffect, useState} from "react";
import {Button, Card, ListGroup, Spinner} from 'react-bootstrap'
import { Link } from "react-router-dom"
import TxRow from "./TxRow";
const LatestTransactions = ({ txs }) => {

    const [latestTxs, setLatestTxs] = useState([]);

    useEffect(() => {
        if(txs[0]){
            setLatestTxs(txs[0]);
        }
    }, [txs]);

    return (
        <Card>
            <Card.Header>Latest Transactions</Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                    {
                        !Array.isArray(latestTxs) || latestTxs.length <= 0 ? <Spinner className='pt-3' animation="border" style={{display: 'flex', margin: 'auto'}}/>
                            : latestTxs.slice(0,6).map((item, idx) => (
                                <TxRow key={idx} tx={item} idx={idx} />
                            ))
                    }
                        <ListGroup.Item>
                            <Link to={`/txs/0`}>
                                <Button variant="secondary morebutton" size="sm" className="ml-2">More transactions</Button>
                            </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default LatestTransactions;