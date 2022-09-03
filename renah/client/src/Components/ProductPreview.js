import React, { useEffect, useState } from "react";
import classes from "./ProductPreview.module.css";
// import ProductDescriptionData from "./ProductDescriptionData";
import { Container, Row, Col } from "react-bootstrap";
import { FaAngleDown, FaAngleUp} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import CardList from "./CardList";
import { Link } from "react-router-dom";
import useAddToCart from "../AddToCart";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PreviewPreview = () => {

    const [currentPreviewImg, setcurrentPreviewImg] = useState(0);
    const [currentOption, setcurrentOption] = useState(0);
    const [otherImgs, setotherImgs] = useState(null);
    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState("L");
    // const [, setpostPending] = useState(true);
    const onAddToCartClick = useAddToCart(amount, size)

    const { id } = useParams();

    const onImgOptionClick = (pos) => {
        console.log(pos);
        setcurrentPreviewImg(pos);
    }

    const { data: card, isPending, error } = useFetch("http://localhost:8000/products/" + id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const imglist = isPending ? <div className=""></div> : error ? <div className=""></div> : card.otherImgs.map((item, pos) => {
        const classArr = [classes.otherImgs];
        if (pos === currentPreviewImg) {
            classArr.push(classes.selectedImg);
        }
        return(
            <img key={pos} className={classArr.join(" ")} onClick={() => {onImgOptionClick(pos)}} src={item.img} alt="Img" />
        );
    });

    const onIncreaseClick = () => {
        const newAmt = amount + 1;
        setAmount(newAmt)
    }

    const onDecreaseClick = () => {
        const newAmt = amount - 1;
        setAmount(newAmt)
    }

    const loadedCard = isPending ? "" : error ? "" : card;

    useEffect(() => {
        setotherImgs(imglist);
    }, [imglist, otherImgs])

    let star;

    

    const onOptionClick = (pos) => {
        console.log(pos);
        setcurrentOption(pos)
    }

    const options = ["Overview", "Description", "Policy", "Feedback"];

    const options1 = options.map((item, pos) => {
        const classArr = [classes.optionItem];
        if (pos === currentOption) {
            classArr.push(classes.selectedOpt);
        }
        return (
            <span key={pos} className={classArr.join(" ")} onClick={() => {onOptionClick(pos)}}>{item}</span>
        );
    });
    
    if (loadedCard.rating === 5) {
        star = <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></div>;
    } if (loadedCard.rating === 4) {
        star = <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /></div>;
    } if (loadedCard.rating === 3) {
        star = <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /></div>;
    } if (loadedCard.rating === 2) {
        star = <div className=""><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div>;
    } if (loadedCard.rating === 1) {
        star = <div className=""><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div>;
    }

    const currentOpt = options[currentOption];

    let display;
    if (currentOpt === "Overview") {
        display = loadedCard.Overview;
    } else if (currentOpt === "Description") {
        display = loadedCard.Description;
    } else if (currentOpt === "Policy") {
        display = loadedCard.Policy;
    } else if (currentOpt === "Feedback") {
        display = loadedCard.Feedback;
    }


    const onSizeClick = (size) => {
        setSize(size);
    }

    const sizeList = ["XS", "S", "M","L", "XL"];

    const mappedSizes = sizeList.map((item, pos) => {
        const sizeClassArr = [classes.sizeItems];
        if (item === size) {
            sizeClassArr.push(classes.selectedSize);
        }
        return(
            <span key={pos} className={sizeClassArr.join(" ")} onClick={() => {onSizeClick(item)}} >{item}</span>
                
        );

        
    })    
    

    return (  
        <div className="">
            <Navbar />
            <div className={classes.wrapper}>
                <Container className={classes.previewWrapper}>
                    <Row className={classes.rowWrapper}>
                        <Col lg={6} md={12} >
                            <Row className={classes.wrapper1}>
                                <Col lg={12} md={8}>
                                    <img className={classes.mainImg} src={isPending ? "" : error ? "" : card.otherImgs[currentPreviewImg].img} alt="Product Img" />
                                </Col>
                                <Col lg={12} md={4} className={classes.imgOptions}>
                                    {otherImgs}
                                </Col>
                            </Row>
                            <div className={classes.wrapper1}>
                                {/* <img className={classes.mainImg} src={otherImgs[1].img} alt="Product Img" /> */}
                                <hr/>
                                <div className={classes.imgOptions}>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12} >
                            <div className={classes.wrapper2}>
                                <h2 className={classes.title}>{loadedCard.productName}</h2>
                                <p className={classes.stars}>{star}</p>
                                <h3 className={classes.price}>{loadedCard.productPrice}</h3>
                                <hr/>
                                <p className={classes.extraText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit ligula vel luctus molestie.
                                </p>
            
                                <hr/>
                                <div className={classes.amtWrapper1}>
                                    <div className={classes.amt}>{amount}</div>
                                    <FaAngleUp className={classes.amtIcon1} onClick={onIncreaseClick}/>
                                    <FaAngleDown className={classes.amtIcon2} onClick={onDecreaseClick}/>
                                </div>
                                <button className={classes.cartBtn} onClick={() => onAddToCartClick(id-1)}>ADD TO CART</button>
            
                                <p className={classes.extraText}>Select Size:</p>
                                <div className={classes.sizesWrapper}>
                                    {mappedSizes}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container >
                    <div className={classes.descWrapper2}>
                        <div className={classes.options}>
                            {options1}
                        </div>
                        <div className={classes.optDesc}>
                            <h3 className={classes.title}>{currentOpt}</h3>
                            <p>
                                {display === "" ?
                                "No " + currentOpt + " available for this item."
                                :
                                display}
                            </p>
                        </div>
                    </div>
                    {/* Last Viewed Section */}
                    <section>
                        <div className={classes.topSellingWrapper}>
                            <div className={classes.txtPart}>
                                <h3 className={classes.header}>RECENTLY VIEWED</h3>
                                <Link  to="/" className={classes.seeAll}>SEE ALL</Link>
                            </div>
                            <div className={classes.cards}>
                                <CardList />
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
 
export default PreviewPreview;
