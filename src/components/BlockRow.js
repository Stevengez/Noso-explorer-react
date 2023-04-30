import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCube } from "react-icons/bi";
import React from "react";

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

const BlockRow = ({block, idx}) => {
    const timeAgo = new TimeAgo('en-US');

    return (
        <ListGroup.Item key={idx} >
            <Row className='list'>
                <Col xs={1} md={1} lg={1} className="d-none d-sm-block">
                    <Link to={`/block/${block.number}`}  title={block.number}>
                        <Button variant='outline-secondary' size="md" className="ml-2">
                            <BiCube fontSize='1.5rem' />
                        </Button>
                    </Link>
                </Col>

                <Col xs={4} sm={4} md={4} lg={4}>
                    <Row className='ps-3'>
                        <Row>
                            <Col><Link to={`/block/${block.number}`}>Blk {block.number}</Link></Col>
                        </Row>
                        <Row>
                            <Col><small>{timeAgo.format(block.timeend*1000)}</small></Col>
                        </Row>
                    </Row>
                </Col>

                <Col xs={7} md={7} lg={7}>
                    <Row>
                        <Col>
                            Block Creator: <Link
                                className='normalized-txt fixed-addr'
                                to={`/address/${block.miner}`}
                                title={block.miner}
                        >
                            {block.miner.slice(0, 12) + '...'+block.miner.slice(-4)}
                        </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small><Link to={`/block/${block.number}/txs`}>{block.totaltransactions} transaction(s)</Link> in {block.timeend-block.timestart} secs</small>
                        </Col>
                    </Row>
                </Col>

                {/*<Col md={2} className="col-list">
                    <small>{parseInt(item.gasUsed)} gwei</small>
                </Col>*/}
            </Row>
            <Row>
                <Col>
                    <hr style={{marginLeft: '10px',marginRight: '10px', marginTop: '0.5rem', marginBottom: '0.5rem'}}/>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}
export default BlockRow;