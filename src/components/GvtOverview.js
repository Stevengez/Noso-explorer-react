import { Card,ListGroup } from 'react-bootstrap'

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
                    <ListGroup.Item><b>Owner</b>: <a href={`/address/${gvt.owner}`}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/address/${gvt.owner}`;
                        }}>{gvt.owner}</a></ListGroup.Item>
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