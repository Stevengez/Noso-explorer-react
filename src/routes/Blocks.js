import React, { useState, useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useParams, useNavigate, Link} from 'react-router-dom';
import LoadingTable from "../components/LoadingTable";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {balance2Currency} from "../components/CoinUtil";
import { Tooltip } from 'primereact/tooltip';

import TimeAgo from 'javascript-time-ago';
import {secondsToMinutes, unixToDate} from "../class/Tools";

const pageSize = 25;
const Blocks = ({ lastBlock, blocks, getBlocksPage }) => {
    const params = useParams();
    const timeAgo = new TimeAgo('en-US');

    const [outOfRage, toggleOutOfRange] = useState(false)
    const [blockPage, setBlockPage] = useState([])
    const [data, setData] = useState(blockPage);

    const getCurrentPages = (page)  => {
        let currentPage = parseInt(page);
        let lowerLimit = Math.floor(currentPage/5)*5;
        let higherLimit = Math.floor(currentPage/5) === currentPage/5 ? (Math.ceil(currentPage/5)+1)*5 : Math.ceil(currentPage/5)*5;

        let pageList = [];
        for(let i=lowerLimit; i<higherLimit; i++){
            pageList.push(
                <li data-test="page-item" className={
                    currentPage===i?"active page-item":"page-item"
                }>
                    <Link to={`/blocks/${i}`} data-test="page-link" className="page-link page-link">
                        {i}
                    </Link>
                </li>
            )
        }

        return pageList
    }

    useEffect(() => {
        if(lastBlock){
            if(parseInt(params.page) < lastBlock/pageSize){
                toggleOutOfRange(false);
                let blockPage = getBlocksPage(parseInt(params.page), pageSize, lastBlock);
                if(Array.isArray(blockPage)){
                    setData(blockPage);
                }else{
                    setData([]);
                }
            }else{
                toggleOutOfRange(true);
            }
        }

    }, [lastBlock, params.page]);

    useEffect(() => {
        if(Array.isArray(blocks[params.page])){
            setBlockPage(blocks[params.page]);
        }
    }, [blocks]);

    useEffect(() => {
        setData(blockPage);
    }, [blockPage])

    const blockTemplate = (block) => {
        return (
            <Link to={`/block/${block.number}`} className='blueLink'>
                {block.number}
            </Link>
        )
    }

    const addressTemplate = (block) => {
        return (
            <div>
                <Tooltip target={'.address-'+block.number} style={{fontSize: '0.8rem'}}/>
                <Link
                    to={`/address/${block.miner}`}
                    className={'address-'+block.number+' blueLink normalized-txt'}
                    data-pr-tooltip={block.miner}
                    data-pr-position='top'>
                    {block.miner.slice(0, 12) + '...'+block.miner.slice(-3)}
                </Link>
            </div>
        )
    }

    const ordersTemplate = (block) => {
        return (
            <Link to={`/txs/${block.number}`} className='blueLink'>
                {block.totaltransactions}
            </Link>
        )
    }

    const durationTemplate = (block) => {
        return secondsToMinutes(block.timetotal);
    }

    const timeTemplate = (block) => {
        return (
            <div>
                <Tooltip target={".block-"+block.number} style={{fontSize: '0.8rem'}} />
                <div
                    className={"block-"+block.number}
                    data-pr-tooltip={unixToDate(block.timeend)}
                    data-pr-position='top'
                >
                    {timeAgo.format(block.timeend * 1000)}
                </div>
            </div>
        );
    }

    const feesTemplate = (block) => {
        return balance2Currency(block.feespaid);
    }

    const rewardTemplate = (block) => {
        return balance2Currency(block.reward);
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4 className="Title">Latest Blocks</h4>
            <Row className='px-sm-0 px-md-3'>
                <Card style={{overflow: 'hidden'}}>
                    {
                        data.length > 0 ?
                            <DataTable
                                value={data}
                                stripedRows
                                selectionMode={'single'}
                                size='small'
                                style={{cursor: 'default'}}
                            >
                                <Column field='number' header='Block' body={blockTemplate} />
                                <Column field='timeend' header='Timestamp' body={timeTemplate} />
                                <Column field='totaltransactions' header='Orders' body={ordersTemplate}/>
                                <Column field='feespaid' header='Fees' body={feesTemplate}/>
                                <Column field='reward' header='Reward' body={rewardTemplate} />
                                <Column field='timetotal' header='Duration' body={durationTemplate}/>
                                <Column field='miner' header='Block Creator' body={addressTemplate}/>
                            </DataTable> : <LoadingTable outOfRange={outOfRage}/>
                    }
                    <br/>
                    <div className='d-flex'>
                        <div className="dataTables_paginate m-auto">
                            <ul data-test="pagination" className="pagination">
                                <li data-test="page-item" className="page-item">
                                    <Link to={parseInt(params.page)-1 >= 0 ? `/blocks/${parseInt(params.page)-1}`:`/blocks/${params.page}`} data-test="page-link" aria-label="Previous" className="page-link page-link" disabled>
                                        <span>Previous</span>
                                    </Link>
                                </li>
                                {
                                    getCurrentPages(params.page)
                                }
                                <li data-test="page-item" className="page-item">
                                    <Link
                                        to={`/blocks/${parseInt(params.page)+1}`}
                                        data-test="page-link"
                                        aria-label="Next"
                                        className="page-link page-link"
                                    >
                                        <span>Next</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </Row>
        </main>
    );
}
export default Blocks