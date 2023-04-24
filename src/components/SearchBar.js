import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { isValidAddress } from './CoinUtil';
import { useNavigate } from 'react-router-dom'


const SearchBar = ({ setTx }) => {
    const [term, setTerm] = useState('');
    const router = useNavigate();

    function isAddress(address) {
        return isValidAddress(address);
    }

    function isOrder(order){
        if(order.length > 2){
            //OR3mq96f7ejd2716h4eoffwsr05qmbmboo60msjunpful4v2sccs
            if(order.substring(0,2) === "OR" && order.length > 45){
                return true;
            }
        }
        return false;
    }

    function isPotentialAlias(alias){
        return alias.length > 5 && alias.length < 45;
    }

    function isGvt(gvtHash){
        console.log("Verifying: ", gvtHash);
        return gvtHash.length > 45 && gvtHash.length < 75;
    }

    function isShortGvt(gvt){
        if(gvt.length > 3 && gvt.length < 7){
            //GVT1
            if(gvt.substring(0,3) === "GVT"){
                return true;
            }
        }
        return false;
    }

    const search = (term) => {

        //if the term is an integer, load the block page
        if (term.match(/^[0-9]+$/)) {
            router(`block/${term}`);
        } else if (isAddress(term)) {
            router(`address/${term}`);
        } else if (isOrder(term)) {
            setTx({
                status: undefined
            })
            router(`tx/${term}`);
        } else if (isShortGvt(term)) {
            router(`gvt/${term.slice(3)}`);
            console.log("GVT NUmber: ", term.slice(3));
        } else if(isGvt(term)) {
            router(`gvt/${term}`);
        } else if (isPotentialAlias(term)) {
            router(`address/${term}`);
        } else {
            console.log(`Not in bd: ${term}`);
        }
    }

    function onInputChange(term) {
        //console.log(term)
        setTerm( term ) ;
    }

    return (
        <div className="search-bar">
            <input
                value={term}
                onChange={event => onInputChange(event.target.value)}
                placeholder="Search for a block, address, order or gvt"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        search(term)
                    }
                }}
                className="searchInput"
            /> <Button className="color2" onClick={() => search(term)}><MdSearch size='1.5rem'/></Button>
        </div>
    );
}
export default SearchBar;
