import {Tooltip} from "primereact/tooltip";
import {Link} from "react-router-dom";
import React from "react";
import {balance2Currency} from "../components/CoinUtil";
import {unixToDate} from "./Tools";
import TimeAgo from "javascript-time-ago";
const timeAgo = new TimeAgo('en-US');
export const orderHashTemplate = (tx, setTx) => {
    return (
        <div>
            <Tooltip target={`.order-${tx.orderid}`} style={{fontSize: '0.8rem'}}/>
            <div
                className={`order-${tx.orderid}`}
                data-pr-tooltip={tx.orderid}
                data-pr-position='right'>
                <Link
                    to={`/tx/${tx.orderid}`}
                    className='blueLink normalized-txt'
                    onClick={(e) => {
                        setTx({...tx, status: 'Valid'});
                    }}>
                    {tx.orderid.slice(0, 12)+ '..' +tx.orderid.slice(-4)}
                </Link>
            </div>
        </div>
    )
}

//Address From
export const fromTemplate = (tx, address) => {
    return (
        <div>
            <Tooltip target={`.from-${tx.orderid}${tx.amount}`} style={{fontSize: '0.8rem'}}/>
            <Link
                to={`/address/${tx.sender}`}
                className={`from-${tx.orderid}${tx.amount} ${tx.sender === address?'nosoLink':'blueLink'} normalized-txt`}
                data-pr-tooltip={tx.sender}
                data-pr-position='top'>
                {tx.sender.slice(0, 12)+ '..' +tx.sender.slice(-3)}
            </Link>
        </div>
    )
}

//Address To
export const toTemplate = (tx, address) => {
    return (
        <div>
            <Tooltip target={`.to-${tx.orderid}${tx.amount}`} style={{fontSize: '0.8rem'}}/>
            <Link
                to={`/address/${tx.receiver}`}
                className={`to-${tx.orderid}${tx.amount} ${tx.receiver === address?'nosoLink':'blueLink'} normalized-txt`}
                data-pr-tooltip={tx.receiver}
                data-pr-position='top'>
                {tx.receiver.slice(0, 12)+ '..' +tx.receiver.slice(-3)}
            </Link>
        </div>
    )
}

//Top Balance
export const topTemplate = (address, custom) => {
    return (
        <div>
            <Tooltip target={`.to-${address}`} style={{fontSize: '0.8rem'}}/>
            <Link
                to={`/address/${address}`}
                className={`to-${address} blueLink normalized-txt`}
                data-pr-tooltip={address}
                data-pr-position='top'>
                {custom!==""?custom:address}
            </Link>
        </div>
    )
}

export const feesTemplate = (tx) => {
    return <div className='normalized-txt txt-align-right'>
        {balance2Currency(tx.fee?tx.fee:tx.fees)}
    </div>
}

export const amountTemplate = (tx) => {
    return <div className='normalized-txt txt-align-right'>
        {balance2Currency(tx.amount)}
    </div>
}

export const coinTemplate = (value) => {
    return <div className='normalized-txt txt-align-right pe-3'>
        {balance2Currency(value)} noso
    </div>
}

export const timeTemplate = (tx) => {
    return (
        <div>
            <Tooltip target={`.time-${tx.orderid}`} style={{fontSize: '0.8rem'}} />
            <div
                className={`time-${tx.orderid} normalized-txt small`}
                data-pr-tooltip={unixToDate(tx.timestamp)}
                data-pr-position='top'>
                {timeAgo.format(tx.timestamp * 1000)}
            </div>
        </div>
    );
}