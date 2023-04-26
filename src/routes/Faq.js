import {useState, useEffect, useCallback} from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Col, Row } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import Dashboard from '../components/Dashboard'
import LatestBlocks from '../components/LatestBlocks'
import LatestTransactions from '../components/LatestTransactions'
import { getMarketBTCPrice, getMarketUSDPrice } from "../repository/APIcall";
//import 'primereact/resources/themes/viva-dark/theme.css';
const Faq = () => {

    return (
        <main style={{ padding: "1rem 0" }} className='app-body'>
            <h4>About the Explorer</h4>
            <br/>
            <Accordion activeIndex={0}>
                <AccordionTab header="Why do we need an explorer?">
                    <p className="m-0">
                        The explorer allows you to easily, well, explore the noso blockchain, blocks, oders and gvt's.
                    </p>
                </AccordionTab>
                <AccordionTab header="How do I search for a GVT?">
                    <p className="m-0">
                        You can search for a GVT using the pattern 'GVT##' where ## is the 2 digits gvt number, for example, for gvt 0, it would be 'GVT00'. You can also search it using the GVT Hash.
                    </p>
                </AccordionTab>
                <AccordionTab header="How is the noso price calculated?">
                    <p className="m-0">
                        For now the price is retrieved using the <a href='https://www.sevenseas.exchange/market/NOSO-USDT' target='_blank'>Seven Seas Exchange</a> API. In the future, when more exchanges list noso, it will be the average from all of them.
                    </p>
                </AccordionTab>

                <AccordionTab header="Where can I find the source code?">
                    <p className="m-0">
                        Yes, you can find the Github Repository of the explorer code <a href='https://github.com/Stevengez/Noso-explorer-react' target='_blank'>here</a>.
                    </p>
                </AccordionTab>
                <AccordionTab header="Where is the explorer pulling the information from?">
                    <p className="m-0">
                        The explorer uses an API built on top of noso's mainnet and a mongodb fed with data from block orders. It is not available for public use, but if you are interested in assembling your own API, you can find the source code <a href='https://github.com/Stevengez/NosoTranslator' target='_blank'>here</a>.
                    </p>
                </AccordionTab>
            </Accordion>
        </main>
    );
}
export default Faq;