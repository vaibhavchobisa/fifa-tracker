import { useContext } from "react";
import { AppContext } from "../../context/app.context";

import './footer.styles.css';

const Footer = () => {
    const { apiVersion } = useContext(AppContext);

    return (
        <footer className="footer-container">
            <span>API Version: {apiVersion}</span>
        </footer>
    )
}

export default Footer;