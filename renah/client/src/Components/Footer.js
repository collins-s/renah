import classes from "./Footer.module.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useState } from "react"

const Footer = () => {
    
    const [ email, setEmail] = useState();
    const subscribersURL = "http://localhost:5001/subscribers";
    const history = useHistory()

    const onEmailSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            fetch(subscribersURL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email})
            })
            .then (() => {
                console.log("Posted to DB");
                history.push("/");
            })
        }, 100)
        setEmail("")
    }

    return (  
        <div className={classes.footerWrapper}>
            <Container>
                <Row>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>HELP & INFORMATION</h3>
                        <div className={classes.rule}></div>
                        <Link to="/">Order Status</Link>
                        <Link to="/privacy policy">Privacy Policy</Link>
                        <Link to="/terms and conditions">Terms and Conditions</Link>

                    </Col>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>ABOUT US</h3>
                        <div className={classes.rule}></div>
                        <Link to="/">Help Cemter</Link>
                        <Link to="/">Store Locations</Link>
                        <Link to="/">We Deliver Everywhere in Nigeria</Link>
                    </Col>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>Categories</h3>
                        <div className={classes.rule}></div>
                        <Link to="/categories/Joggers">Joggers</Link>
                        <Link to="/categories/Hoodies">Hoodies</Link>
                        <Link to="/categories/Shirts">T-Shirts</Link>
                        <Link to="/categories/All">Others</Link>
                    </Col>
                    <Col className={`${classes.col} ${classes.newsSec}`} lg={3} md={6}>
                        <h3 className={classes.secHeader}>We Send You Only The Good Stuff</h3>
                        <p>News & Updates From Renah <br />No Spam, We Promise</p>
                        <form >
                            <input type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)} value={email} />
                            <button onClick={onEmailSubmit}>SIGN UP</button>
                        </form>
                    </Col>
                </Row>
            </Container>
            <div className={classes.fullRule}></div>
            <Container>
                <p className={classes.copyright}>Copyright RENAH. Collins Sanni</p>
            </Container>
        </div>
    );
}
 
export default Footer;
