import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NavbarMenu = () => {
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img
                    src={logo}
                    alt="LearnIt"
                    width="32"
                    height="32"
                    className="mr-2"
                />
                LearnIT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link
                        className="font-weigth-bolder text-white"
                        to="/dashboard"
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className="font-weigth-bolder text-white"
                        to="/about"
                        as={Link}
                    >
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link
                        className="font-weigth-bolder text-white"
                        disabled
                    >
                        Welcome
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        className="font-weigth-bolder text-white"
                    >
                        <img
                            src={logout}
                            alt="LogoutIcon"
                            width="32"
                            height="32"
                            className="mr-2"
                        />
                        Log Out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarMenu;
