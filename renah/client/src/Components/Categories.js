import classes from "./Categories.module.css";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
// import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useAddToCart from "../AddToCart";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Categories = () => {

    let {categoryType} = useParams()

    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    
    // const [, setpostPending] = useState(true)
    const {data: cards, isPending, error} = useFetch("http://localhost:8000/products")

    const [rating, setRating] = useState();
    const [rating0, setRating0] = useState(0);
    const [discount, setDiscount] = useState();
    const [discount0, setDiscount0] = useState(0);
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPice] = useState(0);
    const [maxPrice, setMaxPice] = useState(100000);
    const [newCards, setnewCards] = useState(100000);
    const [isShowSideBar, setisShowSideBar] = useState(false);
    const [isShowCategories, setisShowCategories] = useState(true);
    const onAddToCartClick = useAddToCart(1, "L")
    
    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])
    
    const getCards = () => {



        const loadedCard = isPending ? <div>Loading...</div> : error ?
        <div className="">{error}</div> :
        <Row >
            {
                cards.filter((item, pos) => {
                    let val;
                    if(category !== "All") {
                        val = category === item.category && item.productPrice >= minPrice && item.productPrice <= maxPrice && item.rating >= rating0 && item.discount >= discount0;
                    } else {
                        val = item.productPrice >= minPrice && item.productPrice <= maxPrice && item.rating >= rating0 && item.discount >= discount0;
                    }
                    return val;
                }).map((item, pos) => {
                    return (
                        <Col md={6} sm={6} xs={6} className={classes.card} key={item.id}>
                            <div className="">
                                <Link to={`/products/${item.id}`}>
                                    <img className={classes.proImg} src={item.productImg} alt="Product Pic" />
                                </Link>
                            </div>
                        
                            <p>{item.productName}</p>
                            <p>{item.productPrice}</p>
                            <button className={classes.cartBtn} onClick={() => onAddToCartClick(pos)}>ADD TO CART</button>
                        </Col>
                    );
                })
            }
        </Row>
        setnewCards(loadedCard)
    }

    useEffect(() => {
        setCategory(categoryType)
    }, [categoryType])

    useEffect(() => {
        getCards();
        console.log("Re-rendered");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryType, isPending, minPrice, maxPrice, discount0,rating0, category])

    const onRatingClick = (pos) => {
        let newRating; 
        if (pos === 0) {
            newRating = 4;
        }
        if (pos === 1) {
            newRating = 3;
        }
        if (pos === 2) {
            newRating = 2;
        }
        if (pos === 3) {
            newRating = 1;
        }
        setRating0(newRating)
        setRating(pos)
    }
    const onDiscountClick = (pos) => {
        let newDiscount; 
        if (pos === 0) {
            newDiscount = 50;
        }
        if (pos === 1) {
            newDiscount = 40;
        }
        if (pos === 2) {
            newDiscount = 30;
        }
        if (pos === 3) {
            newDiscount = 20;
        }
        if (pos === 4) {
            newDiscount = 10;
        }
        setDiscount0(newDiscount)
        setDiscount(pos)
    }

    const rating1 = <span>
        <AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.unfilledStar} />
    </span>
    const rating2 = <span>
        <AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} />
    </span>
    const rating3 = <span>
        <AiFillStar className={classes.filledStar} /><AiFillStar className={classes.filledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} />
    </span>
    const rating4 = <span>
        <AiFillStar className={classes.filledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} /><AiFillStar className={classes.unfilledStar} />
    </span>

    const options1 = [rating1, rating2, rating3, rating4];

    const ratings = options1.map((item, pos) => {
        const classArr1 = [classes.radBtnWrapper];
        const classArr2 = [classes.radBtnRating];
        if (pos === rating) {
            classArr1.push(classes.selectedOpt1);
            classArr2.push(classes.selectedOpt2);
        }
        return (
            <div className={classes.miniWrapper}>
                
                <div onClick={() => onRatingClick(pos)} className={` ${classes.radWrapper}`}>
                    <div className={classArr1.join(" ")}>
                        <div className={classArr2.join(" ")}></div>

                    </div>
                    <label htmlFor="">{item} & above</label>

                </div>
            </div>
        );
    });

    const options2 = ["50% or more", "40% or more", "30% or more", "20% or more", "10% or more"];

    const discounts = options2.map((item, pos) => {
        const classArr1 = [classes.radBtnWrapper];
        const classArr2 = [classes.radBtnRating];
        if (pos === discount) {
            classArr1.push(classes.selectedOpt1);
            classArr2.push(classes.selectedOpt2);
        }
        return (
            <div className={classes.miniWrapper}>
                
                <div onClick={() => onDiscountClick(pos)} className={` ${classes.radWrapper}`}>
                    <div className={classArr1.join(" ")}>
                        <div className={classArr2.join(" ")}></div>

                    </div>
                    <label htmlFor="">{item}</label>

                </div>
            </div>
        );
    });
    
    console.log(category)
    console.log(minPrice)
    console.log(maxPrice)
    console.log(rating)
    console.log(discount)

    let history = useHistory();
    const onSearchChange = (val) => {
        history.push(`/categories/${val}`);
        setCategory(val)
    }

    const onFilterClick = () => {
        setisShowSideBar(!isShowSideBar)
        setisShowCategories(false)
    }

    const onDoneClick = () => {
        setisShowCategories(true)
        setisShowSideBar(!isShowSideBar)
    }
    const sideBar = <div className="">
        <h3 className={classes.subHeading}>Category</h3>
        <div className={classes.subBody}>
            <select onChange={event => onSearchChange(event.target.value)} name="" className={classes.categoryOpt} value={category}>
                <option value="All">All</option>
                <option value="Shirts">Shirts</option>
                <option value="Joggers">Joggers</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Cargo Pants">Sweat Pants</option>
                <option value="Others">Others</option>
            </select>

        </div>

        <h3 className={classes.subHeading}>Price (₦)</h3>
        <div className={classes.subBody}>
            <input type="text" className={classes.priceInput} onChange={event => setMinPice(event.target.value)} />
            <span className={classes.dash}>-</span>
            <input type="text" className={classes.priceInput} onChange={event => setMaxPice(event.target.value)} />

        </div>
        
        <h3 className={classes.subHeading}>Product Rating</h3>
        <div className={classes.subBody}>
            {ratings}

        </div>

        <h3 className={classes.subHeading}>Discount Percentages</h3>

        <div className={classes.subBody}>
            {discounts}

        </div>
        {isMobile ? <button className={classes.sideBarBtn}onClick={onDoneClick}>Done</button> : null}
    </div>
    return (  
        <div className="">
            <Navbar />
            <div className={classes.outerWrapper}>
                <div className={classes.sideBar}>
                     { isLaptop || isTablet ? sideBar : isShowSideBar ? sideBar : <button className={classes.sideBarBtn}onClick={onFilterClick}><FaFilter /> Sort Categories</button> }
                </div>
                <div className={classes.wrapper}>
                    {
                        isShowCategories ?
                        <div className="">
                            <div className={classes.txtPart}>
                                <h3 className={classes.header}>TOP SELLING</h3>
                            </div>
                            <div className={classes.cards}>
                                { newCards }
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Categories;