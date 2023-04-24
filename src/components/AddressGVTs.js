import { Card, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
//import { Link } from "react-router-dom";

const AddressGVTs = ({ gvtList }) => {
    const router = useNavigate();

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <Card className="infobox box">
            <Card.Header>
                <Card.Title><b>GVTs</b></Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        {
                            gvtList.length === 0 && "This address doesn't posses any GVTs."
                        }
                        {
                            gvtList.length > 0 && <div>
                                {
                                    gvtList.map((g) => {
                                        return (<span key={g.number}>
                                            <a
                                                href={`/gvt/${g.hash}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    //window.location.href = `/gvt/${g.hash}`;
                                                    router(`/gvt/${g.hash}`);
                                                }}>
                                                {g.number}
                                            </a>&nbsp;&nbsp;&nbsp;
                                        </span>);
                                    })
                                }
                            </div>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
export default AddressGVTs;