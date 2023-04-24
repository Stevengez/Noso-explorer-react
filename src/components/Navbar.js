import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import NosoLogo from './images/logo192.png';
const Navigation = () => {
    return (
        <Navbar expand="lg"variant="dark" classmap="NavBar" collapseOnSelect={true}>
            <Container>
                <Navbar.Brand as={Link} to={'/'}>
                    <img src={NosoLogo}
                        width="32" height="32"
                        className="d-inline-block align-top" />
                    &nbsp; <span className="navbar-brand ">NOSO Explorer</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Blockchain" id="collapsible-nav-blockchain">
                            <NavDropdown.Item as={Link} to="/accounts">Top Accounts</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/blocks/0">View Blocks</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/txsPending">View Pending Txs</NavDropdown.Item>
                            {/* <NavDropdown.Item as={Link} to="/txs">View Transactions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/txsPending">View Pending Transactions</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/txsInternal">View Internal Transactions</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/interfaces">Contracts</NavDropdown.Item>*/}
                        </NavDropdown>

                        {/*<NavDropdown title="Tokens" id="collasible-nav-tokens">
                            <NavDropdown.Item as={Link} to="/tokens">Token List</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns">View ERC20 Transfers</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/tokens-nft">ERC721 NFT Collections</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns-nft">View ERC721 Transfers</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/tokens-nft1151">ERC1151 NFT Collections</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tokentxns-nft1151">View ERC1151 Transfers</NavDropdown.Item>
                        </NavDropdown>*/}

                        <NavDropdown title="Resources" id="collasible-nav-resources">
                            <NavDropdown.Item href="https://nosocoin.com/" target="_blank">Noso Site</NavDropdown.Item>
                            <NavDropdown.Item href="https://docs.nosocoin.com/" target="_blank">Noso Docs</NavDropdown.Item>
                            <NavDropdown.Item href="https://github.com/Noso-Project/" target="_blank">Noso Project Github</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://explorer.nosocoin.com/" target="_blank">Explorer Legacy</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://discord.gg/weed5ePmfY/" target="_blank">
                                Discord
                            </NavDropdown.Item>
                            <NavDropdown.Item href="https://t.me/nosocoin/" target="_blank">Telegram</NavDropdown.Item>
                            <NavDropdown.Item href="https://twitter.com/NosoCoin/" target="_blank">Twitter</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {/*<NavLastBlock stats={stats} network={networkName}/>*/}
            </Container>
        </Navbar>
    )
}

export default Navigation;

//<Nav.Link as={Link} to="/apps">Applications</Nav.Link>
//<Nav.Link as={Link} to="/">Blockchain</Nav.Link>
//<Nav.Link as={Link} to="/">Analytics</Nav.Link>
//<Nav.Link as={Link} to="/">Resources</Nav.Link>