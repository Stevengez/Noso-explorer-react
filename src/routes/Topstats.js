import {useState, useEffect} from 'react'
import {Card, Row, Col, Spinner} from 'react-bootstrap'

const Topstats = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    if (loading) return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className='Title'>Top Statistics</h4>
            <Spinner animation="border" style={{display: 'flex'}}/>
        </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className='Title'>Top Statistics</h4>

        </main>
    );
}
export default Topstats