import { Card,ListGroup } from 'react-bootstrap'
import {balance2Currency} from "./CoinUtil";

const AddressOverview = ({ address }) => {
      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>Overview</b></Card.Title>
            </Card.Header>
            <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Address</b>: {address.address}</ListGroup.Item>
                        <ListGroup.Item><b>Alias</b>: {address.custom}</ListGroup.Item>
                        <ListGroup.Item><b>Balance</b>: {balance2Currency(address.balance)} noso</ListGroup.Item>
                        <ListGroup.Item><b>Incoming</b>: {balance2Currency(address.incoming)} noso</ListGroup.Item>
                        <ListGroup.Item><b>Outgoing</b>: {balance2Currency(address.outgoing)} noso</ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
        );
}
export default AddressOverview;