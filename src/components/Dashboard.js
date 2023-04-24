import React from "react";
import {ListGroup, Row, Col, Card, Spinner} from 'react-bootstrap'
import { BsGlobe2, BsHddStack, BsSpeedometer2 } from 'react-icons/bs';

import priceNoso from './images/noso_price.png';
import {Link} from "react-router-dom";
const Dashboard = ({ lastBlock, ttNextBlock, stats}) => {

    return (

        <Col xs={12} md={12} lg={12}>
            <Card className="std-card-info">
                <Card.Body className="std-card-info-body mt-3">
                    <Row className='ps-3 mb-3'>
                        <Col xs={12} md={8} lg={8}>
                            <Row>
                                <Col xs={12} md={6} lg={6}>
                                    <Row>
                                        <Col xs={12} md={12} lg={12}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{paddingLeft: '5px', marginRight: '0.75rem'}}>
                                                            <img src={priceNoso} width="22px" alt='Current price from Seven Seas Exchange' />
                                                        </div>
                                                        <div>
                                                            <div className='dashTitle'>NOSO Price</div>
                                                            <Link to={'/'} className='tx-normal'>$
                                                                {
                                                                    stats.nosoPriceUSD ?
                                                                        stats.nosoPriceUSD :
                                                                        <Spinner size='sm' animation="border" variant="secondary" />
                                                                } @ {
                                                                    stats.nosoPriceBTC ?
                                                                        stats.nosoPriceBTC :
                                                                        <Spinner size='sm' animation="border" variant="secondary" />
                                                                } BTC</Link>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{paddingLeft: '5px', marginRight: '0.75rem'}}>
                                                            <BsGlobe2 size='1.6rem' />
                                                        </div>
                                                        <div>
                                                            <div className='dashTitle'>Market Cap</div>
                                                            <Link to={'/'} className='tx-normal'>${
                                                                stats.nosoPriceUSD && stats.nosoCirculating ?
                                                                    (stats.nosoPriceUSD*stats.nosoCirculating).toLocaleString() :
                                                                    <Spinner size='sm' animation="border" variant="secondary" />
                                                            }</Link>
                                                        </div>
                                                    </div>
                                                    <hr className='d-sm-block d-md-none'/>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={6} lg={6}>
                                    <Row>
                                        <Col xs={12} md={12} lg={12}>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{paddingLeft: '5px', marginRight: '0.75rem'}}>
                                                            <BsHddStack size='1.6rem' />
                                                        </div>
                                                        <div>
                                                            <div className='dashTitle'>Pending Transactions</div>
                                                            <Link to={'/txsPending'} className='tx-normal'>
                                                                {
                                                                    stats.pending ?
                                                                    stats.pending.toLocaleString() :
                                                                    <Spinner size='sm' animation="border" variant="secondary" />
                                                                }
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{paddingLeft: '5px', marginRight: '0.75rem'}}>
                                                            <BsSpeedometer2 size='1.6rem' />
                                                        </div>
                                                        <div>
                                                            <div className='dashTitle'>Current Block</div>
                                                            <Link to={'/'} className='tx-normal'>{
                                                                lastBlock ?
                                                                (lastBlock+1).toLocaleString() :
                                                                <Spinner size='sm' animation="border" variant="secondary" />
                                                            }</Link>&nbsp;
                                                            <span className='tx-normal'>
                                                                    Ending in: {Math.floor(ttNextBlock/60)}:{(ttNextBlock % 60).toLocaleString(undefined, { minimumIntegerDigits: 2})}
                                                                </span>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} lg={4}>
                            <Row>
                                <Col xs={12} md={12} lg={12} xl={12}>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Dashboard;