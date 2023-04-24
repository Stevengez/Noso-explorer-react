import {useEffect, useState} from 'react'
import {Col, Row, Spinner} from 'react-bootstrap'
import {useParams} from "react-router-dom";
import Transaction from '../components/Transaction'
import {getOrderInfo} from "../repository/APIcall";
import {toast} from "react-toastify";

const Tx = ({tx, setTx}) => {
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        if(tx.status){
            setLoading(false);
        }else{
            setLoading(true);
            getOrderInfo(params.orderId).then((res) => {
                const orderData = res.result[0].order;
                let tempOrder = {
                    status: res.result[0].valid ? 'Valid':'Pending',
                    ...orderData
                }
                setTx(tempOrder);
            }).catch((err) => {
                console.log("Error loading tx ",err);
                toast.error("Error loading tx info, retry later.");
            });
        }
    }, [params.orderId, tx])

    if (loading) return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className="Title">Transaction Details</h4>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <Spinner animation="border" variant="secondary"/>
                </Col>
            </Row>
        </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{padding: "1rem 0"}} className='app-body'>
            <h4 className="Title">Transaction Details</h4>
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12}>
                    <Transaction transaction={tx}/>
                </Col>
            </Row>
        </main>
    );
}
export default Tx