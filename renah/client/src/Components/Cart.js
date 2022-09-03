import { Col, Row } from "react-bootstrap";
import classes from "./Cart.module.css";
import { ImCancelCircle } from "react-icons/im"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";


const Cart = () => {
    
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    // const[ refetch, setRefetch ] = useState(false);
    const [isPending, setISPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [ subTotal, setSubTotal] = useState(0);
    // const [ qty, setqty] = useState(0);
    
    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])
    
    const getData = () => {
        setTimeout(() => {
            const aborter = new AbortController();
            fetch("http://localhost:5000/products", { signal: aborter.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Failed to fetch data!");
                    }
                    return res.json()
                })
                .then((data) => {
                    setData(data);
                    setISPending(false);
                    setError(null);
                    let total = 0;
                    for(var i = 0; i < data.length; i++) {
                        
                        total += data[i].productPrice * data[i].quantity;
                        setSubTotal(total);
                        
                        // console.log(subTotal)
                    }
                    if(data.length === 0) {
                        setSubTotal(0);
                    }
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        console.log("Error aborted");
                    } else {
                        setError(err.message);
                        setISPending(false);
                    }
                    
                })
        }, 2000);
            
    }    
    
    useEffect(() => {

        getData()
        
    }, [data])

    const onDelete = (id) => {
        setTimeout(() => {
            fetch("http://localhost:5000/products/" + id, {
                method: "DELETE"
            })
            .then((res) => {
                getData()
                // findTotal();
                console.log(`${id} was deleted \n `)
            })
        }, 1000)
        
    }

    const onIncreaseClick = (id) => {

        const aborter = new AbortController();

        fetch("http://localhost:5000/products/" + id, { signal: aborter.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Failed to fetch data!");
                }
                return res.json()
            })
            .then((data) => {
                fetch("http://localhost:5000/products/" + id, {
                    method: "PATCH",
                    body: JSON.stringify({
                        quantity: data.quantity + 1,
                    }),
                    headers: {"Content-type": "application/json"},
                })
                .then((res) => {
                    getData()
                    // findTotal();
                    console.log(`${id} was updated \n `)
                })
            })
            .catch((err) => {
                                    
            })

        
    }

    const onDecreaseClick = (id) => {
        
        const aborter = new AbortController();

        fetch("http://localhost:5000/products/" + id, { signal: aborter.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Failed to fetch data!");
                }
                return res.json()
            })
            .then((data) => {
                fetch("http://localhost:5000/products/" + id, {
                    method: "PATCH",
                    body: JSON.stringify({
                        quantity: data.quantity - 1,
                    }),
                    headers: {"Content-type": "application/json"},
                })
                .then((res) => {
                    getData()
                    // findTotal();
                    console.log(`${id} was updated \n `)
                })
            })
            .catch((err) => {
                                    
            })
    }

    const loadedItems = isPending ? <div className="">Loading</div> : error ? <div className="">{error}</div> : 
    data.map((item) => {

        return (
            <div key={item.id}>
                <Row className={classes.loadedItems}>
                    <Col lg={11} md={11} sm={11}  xs={11}>
                        <Row className={classes.itemRow}>
                            <Col lg={8} md={8} sm={8} xs={8}>
                                <Row className={classes.side1}>
                                    <Col lg={9} md={9} sm={9} xs={9}>
                                        {/* <div className={classes.itemCol}> */}
                                            <Row>
                                                <Col lg={3} md={3} sm={12} xs={12}>
                                                    <div className={classes.itemCol}>
                                                        <Link to={`/products/${item.parentId}`}>
                                                        <img src={item.productImg} alt="" />
                                                        </Link>

                                                    </div>
                                                </Col>
                                                <Col lg={9} md={9} sm={12} xs={12}>
                                                    <div className={classes.productName}>
                                                        {item.productName}
                                                        <p>Size: {item.size}</p>
                                                    </div>
                                                
                                                </Col>
                                            </Row>
                                        {/* </div> */}
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <div className={classes.itemCol}>
                                            { `N${item.productPrice}` }
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={4} md={4} sm={4} xs={4}>
                                <Row>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className={classes.itemCol}>
                                            <FaMinus className={classes.qtyIcon} onClick={() => onDecreaseClick(item.id)} /> {item.quantity} <FaPlus className={classes.qtyIcon} onClick={() => onIncreaseClick(item.id)} />
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className={classes.itemCol}>
                                            { `N${item.quantity*item.productPrice}` }
                                            
                                        </div> 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1}>
                        <div className={classes.delBtn} onClick={() => onDelete(item.id)}><ImCancelCircle /></div>
                    </Col>
                </Row>
                <div className={classes.spaceBetweenRows}></div>
                
                
            </div>
            
        )
    })

    return (  
        <div className="">
            <Navbar />
            <div className={classes.wrapper0}>
                <div className={classes.wrapper}>
                    <Row>
                        <Col lg={8}  sm={12} className={classes.mainWrapper}>
                            <Row>
            
                                <Col lg={11} md={11} sm={11} xs={11}>
                                    <Row className={classes.headersWrapper}>
                                        <Col lg={8} md={8} sm={8} xs={8}>
                                            <Row>
                                                <Col lg={9} md={9} sm={9} xs={9}>
                                                    <p className={classes.headers}>PRODUCTS</p>
                                                </Col>
                                                <Col lg={3} md={3} >
                                                    <p className={classes.headers}>{isMobile ? "" : "PRICE"}</p>
                                                </Col>
                                            </Row>
                                        </Col>
            
                                        <Col lg={4} md={4} sm={4} xs={4}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                    <p className={classes.headers}>QTY</p>
                                                </Col>
                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                <p className={classes.headers}>SUB-TOTAL</p>
                                                </Col>
                                            </Row>
                                        </Col>
            
                                    </Row>
                                </Col>
                            </Row>
            
                            {loadedItems}
                            <Row>
                                <Col lg={11} md={11} sm={11} xs={11}>
                                    <Row className={classes.headersWrapper}>
                                        <Col lg={8} md={8} sm={8} xs={8}>
                                            <Row>
                                                <Col lg={9} md={9} sm={9} xs={9}>
            
                                                </Col>
                                                <Col lg={3} md={3}>
            
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={4} md={4} sm={4} xs={4}>
                                            <Row>
                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                    <p className={classes.headers}>TOTAL: </p>
                                                </Col>
                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                    <p className={classes.headers}>{ `N${subTotal}` }</p>
                                                </Col>
                                            </Row>
                                        </Col>
            
                                    </Row>
                                </Col>
                            </Row>
                            <p className={classes.shippingInfo}>Shipping and delivery fee will be calculated at checkout.</p>
                        </Col>
                        <Col lg={4} sm={12} className={classes.sec2}>
                            <form >
                                <input type="checkbox" name="location" />
                                <label>Delivery outside Lagos</label>
                            </form>
                            <p><span>Need Help?</span> Chat live with an expert</p>
                            <button className={classes.cartBtn}>CHECK OUT</button>
                            <button className={classes.cartBtn}>CALL TO ORDER</button>
                        </Col>
                    </Row>
            
                </div>
                {/* Top selling section */}
                <div className={classes.recentlyViewedWrapper}>
                    <div className={classes.txtPart}>
                        <h3 className={classes.header}>RECENTLY VIEWED</h3>
                        <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                    </div>
                    <div className={classes.cards}>
                        <CardList />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Cart;