import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom";
import {unixToDate} from "../class/Tools";
import {balance2Currency} from "./CoinUtil";

const Transaction = ({ transaction }) => {

    let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

    function getStatus(status){
        switch (status){
            case 'Valid':
                return 'warning';
            case 'Pending':
                return 'dark';
            case 'Failed':
            default:
                return 'danger';
        }
    }

    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
    <Card classmap="shadowCard">
        <Card.Header>
            <Card.Title className="std-card-title">Overview</Card.Title>
        </Card.Header>
        <Card.Body className="std-card-info">
            <ListGroup variant='flush p-3'>
                <ListGroup.Item><b>OrderID</b>: {transaction.orderid}</ListGroup.Item>
                <ListGroup.Item><b>Status</b>: <Button variant={getStatus(transaction.status)} size="sm" className="ml-2">{`${transaction.status}`}</Button></ListGroup.Item>
                <ListGroup.Item><b>Block Number</b>: <Link to={`/block/${transaction.block}`}>{transaction.block}</Link></ListGroup.Item>
                <ListGroup.Item><b>Timestamp</b>: {unixToDate(transaction.timestamp)}</ListGroup.Item>
                <ListGroup.Item><b>From</b>: <Link to={`/address/${transaction.sender}`}>{transaction.sender ? transaction.sender : null}</Link> <span onClick={() => copyToClipboard(transaction.sender)}>{copyIcon}</span></ListGroup.Item>
                <ListGroup.Item><b>To</b>: <Link to={`/address/${transaction.receiver}`}>{transaction.receiver ? transaction.receiver : null}</Link> <span onClick={() => copyToClipboard(transaction.receiver)}>{copyIcon}</span></ListGroup.Item>
                <ListGroup.Item><b>Amount</b>: {balance2Currency(transaction.amount)} Noso</ListGroup.Item>
                <ListGroup.Item><b>Fees</b>: {balance2Currency(transaction.fee?transaction.fee:transaction.fees)} Noso</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
    );
}
export default Transaction