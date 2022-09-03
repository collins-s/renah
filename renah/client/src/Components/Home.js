import { Link } from "react-router-dom";
// import { useState } from "react";
import classes from "./Home.module.css";
import CardList from "./CardList";
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
    
    return ( 
        <div className="">
            <Navbar />
            <div className={classes.homeWrapper}>
                <div className={classes.introMessage}>
                    <h1>Discover new collections with RENAH</h1>
                    <Link className={classes.shopBtn} to="\">Shop now</Link>
                </div>
            </div>

            {/* Top selling Section */}

            <div className={classes.topSellingWrapper}>
                <div className={classes.txtPart}>
                    <h3 className={classes.header}>TOP SELLING</h3>
                    <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                </div>
                <div className={classes.cards}>
                    <CardList />

                </div>
            </div>
            
            {/* Enhance your style section */}
            
            <section className={classes.styles}>
                <h3>ENHANCE YOUR STYLE!</h3>

                <Container >
                    <Row>
                        <Col lg={6} md={6}>
                            <Row>
                                <Col>
                                    <div className={classes.colIMG}>
                                        <img src="https://i.ibb.co/THbwV57/img2.jpg" alt="" />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={classes.colIMG}>
                                        <img src="https://i.ibb.co/1m1HpkX/img.jpg" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        
                        <Col lg={6} md={6}>
                            <div className={classes.colIMG}>
                                <img src="https://i.ibb.co/YBB64qT/maaarci-89-2790239930451858061-37855207697-0-1440x1800.jpg" alt="" />
                            </div>
                        </Col>
                        
                    </Row>

                    <Link to="/" className={classes.exploreLink} >+ Explore our collections</Link>
                </Container>

            </section>

            {/* Trending Section */}
            <section>
                <div className={classes.topSellingWrapper}>
                    <div className={classes.txtPart}>
                        <h3 className={classes.header}>TRENDING</h3>
                        <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                    </div>
                    <div className={classes.cards}>
                        <CardList />

                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section>
                <div className={classes.topSellingWrapper}>
                    <div className={classes.txtPart}>
                        <h3 className={classes.header}>NEW ARRIVALS</h3>
                        <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                    </div>
                    <div className={classes.cards}>
                        <CardList />

                    </div>
                </div>
            </section>
            
            {/* Last Viewed Section */}
            <section>
                <div className={classes.topSellingWrapper}>
                    <div className={classes.txtPart}>
                        <h3 className={classes.header}>RECENTLY VIEWED</h3>
                        <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                    </div>
                    <div className={classes.cards}>
                        <CardList />

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
 
export default Home;