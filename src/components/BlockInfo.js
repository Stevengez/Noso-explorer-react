import {Card, Button, ListGroup} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {copyToClipboardButton, secondsToMinutes, unixToDate} from '../class/Tools';
import TimeAgo from 'javascript-time-ago';
import {Tooltip} from "primereact/tooltip";
import React from "react";
import {balance2Currency} from "./CoinUtil";

const BlockInfo = ({block}) => {
    const timeAgo = new TimeAgo('en-US');
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card className="std-card-info">
            <Card.Header>
                <Card.Title className="std-card-title">Overview</Card.Title>
            </Card.Header>
            <Card.Body className="std-card-info-body p-3">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <b>Block Number</b>: <i>{block.number}</i> <Link to={`/block/${block.number - 1}`} className="btn btn-primary btn-card">Previous</Link>
                        <Link to={`/block/${block.number + 1}`} className="btn btn-primary btn-card">Next</Link></ListGroup.Item>
                    <ListGroup.Item><b>Block Hash</b>: {block.hash}</ListGroup.Item>
                    <ListGroup.Item>
                        <div>
                            <Tooltip target={`.block-timestamp-${block.number}`} style={{fontSize: '0.8rem'}}/>
                            <b>Timestamp</b>: <span className={`block-timestamp-${block.number}`}
                                                    data-pr-tooltip={unixToDate(block.timeend)}
                                                    data-pr-position='right'>
                            {timeAgo.format(block.timeend*1000)}
                        </span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item><b>Duration</b>: {secondsToMinutes(block.timeend-block.timestart)}</ListGroup.Item>
                    <ListGroup.Item>
                        <b>Transactions</b>: <Link to={`/block/${block.number}/txs`}>
                            <Button variant="secondary" size="sm" className="ml-2 btn-card">{block.totaltransactions} transactions</Button>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item><b>Difficulty</b>: {block.difficulty}</ListGroup.Item>
                    <ListGroup.Item><b>Target Hash</b>: {block.target}</ListGroup.Item>
                    <ListGroup.Item><b>Solution</b>: {block.solution}</ListGroup.Item>
                    <ListGroup.Item><b>Reward</b>: {balance2Currency(block.reward)} noso</ListGroup.Item>
                    <ListGroup.Item><b>Block creator</b>: <Link to={`/address/${block.miner}`}><i
                        className="fas fa-user-circle">{block.miner}</i> {copyToClipboardButton(block.miner)}
                    </Link></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
export default BlockInfo