import {useState, useEffect} from 'react'
import {Row, Col, Spinner} from 'react-bootstrap'
import { useParams} from "react-router-dom";
import BlockInfo from '../components/BlockInfo'
import {getBlockData} from "../repository/APIcall";
import { toast } from 'react-toastify';

const Block = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [block, setBlock] = useState({
        number:undefined
    });

    const getBlockInfo = async (block) => {
        getBlockData(block).then((res) => {
            setBlock(res.result[0]);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error loading block data ", err);
            toast.error("Error loading block, retry later");
        });
    }

    useEffect(() => {
        setLoading(true);
        getBlockInfo(params.blockNumber);
    }, [params.blockNumber]);

    if (loading) return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className='Title'>Block #{params.blockNumber}</h4>
            <br/><Spinner animation="border" variant="secondary"/>
        </main>
    )
//    <Link to={`/block/${blockContent.number+1}`}><Button variant="primary" size="sm" className="ml-2">Next</Button></Link>
    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className='Title'>Block #{params.blockNumber}</h4>

            <Row>
                <Col>
                    <BlockInfo block={block}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    &nbsp;
                </Col>
            </Row>
        </main>
    );
}
export default Block