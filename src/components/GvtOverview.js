import { Card,ListGroup } from 'react-bootstrap'
import {Link} from "react-router-dom";

const GvtOverview = ({ gvt }) => {
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>Overview</b></Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item><b>Number</b>: {gvt.number}</ListGroup.Item>
                    <ListGroup.Item><b>Owner</b>: <Link to={`/address/${gvt.owner}`}>{gvt.owner}</Link></ListGroup.Item>
                    <ListGroup.Item><b>Hash</b>: {gvt.hash}</ListGroup.Item>
                    {/*
                        <ListGroup.Item><b>Estimated Value</b>: ${address.value}</ListGroup.Item>
                        <ListGroup.Item><b>Tokens</b>: </ListGroup.Item>
                        */}
                    <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
export default GvtOverview;