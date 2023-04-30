import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import TimeAgo from 'javascript-time-ago';
import { MdOutlineRequestQuote } from "react-icons/md";
import {balance2Currency} from "./CoinUtil";
const TxRow = ({tx, idx}) => {
    const timeAgo = new TimeAgo('en-US');

    return (
        <ListGroup.Item key={idx} >
            <Row className='list'>
                <Col xs={1} md={1} lg={1} className="d-none d-sm-block">
                    <Link to={`/tx/${tx.orderid}`}  title={tx.orderid}>
                        <Button variant='outline-secondary' size="md" className="ml-2">
                            <MdOutlineRequestQuote fontSize='1.5rem' />
                        </Button>
                    </Link>
                </Col>

                <Col xs={5} sm={5} md={5} lg={5}>
                    <Row className='ps-3'>
                        <Row>
                            <Col><Link className='normalized-txt' to={`/tx/${tx.orderid}`}>{tx.orderid.slice(0,8)}..{tx.orderid.slice(-3)}</Link></Col>
                        </Row>
                        <Row>
                            <Col>
                                {balance2Currency(tx.amount)} noso
                            </Col>
                        </Row>
                        <Row>
                            <Col><small>{timeAgo.format(tx.timestamp*1000)}</small></Col>
                        </Row>
                    </Row>
                </Col>

                <Col xs={6} md={6} lg={6}>
                    <Row>
                        <Col>
                            From: <Link
                            className='normalized-txt fixed-addr'
                            to={`/address/${tx.sender}`}
                            title={tx.sender}
                        >
                            {tx.sender.slice(0, 12) + '...'+tx.sender.slice(-4)}
                        </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            To: <Link
                            className='normalized-txt fixed-addr'
                            to={`/address/${tx.receiver}`}
                            title={tx.receiver}>
                                {tx.receiver.slice(0, 12) + '...'+tx.receiver.slice(-4)}
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr style={{marginLeft: '10px',marginRight: '10px', marginTop: '0.5rem', marginBottom: '0.5rem'}}/>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}
export default TxRow;