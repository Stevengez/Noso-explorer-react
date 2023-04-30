import { Card, ListGroup } from 'react-bootstrap'
//import { Link } from "react-router-dom";

const AddressMoreinfo = ({ address }) => {

      // Render ---------------------------------------------------------------------------------------------------------- //
      return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>More Info</b></Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>What else would you like to see here? Let us know on the Noso Discord Server.</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
      );
}
export default AddressMoreinfo;