import React from "react";
import {Button, Card, ListGroup, Spinner} from 'react-bootstrap'
import { Link } from "react-router-dom"
import BlockRow from "./BlockRow";

const LatestBlocks = ({blocks}) => {
    return (
        <Card classmap="shadowCard">
            <Card.Header>Latest Blocks</Card.Header>
            <Card.Body className="std-card-info">
                <ListGroup variant="flush" className="list-group-item">
                    {
                        blocks.length < 1 || !Array.isArray(blocks[0]) ? <Spinner className='pt-3' animation="border" style={{display: 'flex', margin: 'auto'}}/>
                            : blocks[0].slice(0,7).map((block, idx) => (
                                <BlockRow key={idx} block={block} />
                            ))
                    }
                    <ListGroup.Item>
                        <Link to="/blocks/0">
                            <Button variant="secondary morebutton" size="sm">More blocks</Button>
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};
export default LatestBlocks;