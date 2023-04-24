import Config from '../config.json'
import { useState, useEffect } from 'react'
import { Col, Row,Spinner } from 'react-bootstrap'

import Applications from '../components/Applications'

const axios = require('axios').default;

const Apps = ({networkName }) => {
    const [loading, setLoading] = useState(false)

    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className='Title'>Applications</h4>
            <Row>
                <Col>
                    <Applications />
                </Col>
            </Row>
        </main>
    );
};
export default Apps;