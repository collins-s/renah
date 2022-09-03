// import Carousel from "flat-carousel";
import {Carousel} from "react-bootstrap"
import classes from "./Carousel.module.css"
import { Link } from "react-router-dom"


function Carousel1() {
    const msg =  <div className={classes.introMessage}>
        <h1>Discover new collections with RENAH</h1>
        <Link className={classes.shopBtn} to="\">Shop now</Link>
    </div>
  

    return (
    
        <div>
            <Carousel controls={false} pause={false} fade={true}>
                <Carousel.Item  className={classes.img1}>
                    { msg }
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item className={classes.img2}>
                    { msg }
                    {/* <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item className={classes.img3}>
                    { msg }
                    {/* <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
            
        </div>
    );
}

export default Carousel1;