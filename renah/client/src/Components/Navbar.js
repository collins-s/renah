import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCheck } from "react-icons/fa";
import { TiDelete } from "react-icons/ti"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { FaUserAlt } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isSearch2, setIsSearch2] = useState(false);
    const [isPending, setISPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("")
    const [searchVal, setSearchVal] = useState("")
    const [isLoginedIn, setisLoginedIn] = useState(true)

    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])

    const {data: cards, isPending: dbpending, error: dberror} = useFetch("http://localhost:8000/products")
    
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
    
    const onCancelSearchClick = () => {
        setQuery("");
        console.log(searchVal)
        setIsSearch2(false)
    }
    const onSearch2Click = () => {
        setIsSearch2(!isSearch2);
    }
    let searchItems;
    if(query !== "") {
        searchItems = dbpending ? "" : dberror ? "" : cards.filter(post => { 
            let filteredItems;
            if (query === '') { 
                filteredItems = post; 
            } else if (post.productName.toLowerCase().includes(query.toLowerCase())) { 
                filteredItems = post; 
            } 
            return filteredItems;
        }).map((post, index) => { 
            
            return(
                <div className={classes.searchedBox} key={index}> 

                    <Link className={classes.itemLink} to={`/products/${post.id}`} onClick={() => onCancelSearchClick(post.productName)} >{post.productName}</Link> 
                    {/* <p>{post.author}</p>  */}
                </div> 
    
            )
        
        }) 
    }

    const searchBar2 = <div className={classes.searchBar2}>
        <form>
            <input placeholder="Search for items, products and inspiriations..." value={query} onChange={event => setQuery(event.target.value)} /> 
            <FaSearch  className={classes.icon1} />
            <TiDelete  className={classes.icon2} onClick={onCancelSearchClick}  />
        </form>
        <div className={classes.searchItems}>
            {searchItems}
        </div>
        
    </div>
    
    
    useEffect(() => {
        getData()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const loggedin = <span className={classes.loggedinWrapper}>
        <FaUserAlt /> HI, Collins
    </span>

    const forNavLaptop = <div className={classes.links}>
        <Link to="/categories/All" className={classes.linkItem}>Categories</Link>
        <Link to="/login" className={classes.linkItem}>
            {
                isLoginedIn ? loggedin :
                "Login / Sign up"
            }
        </Link>
        <Link to="/cart" className={classes.linkItem}> <AiOutlineShoppingCart className={classes.cartIcon}/> Cart: {isPending ? "" : error ? "" : data.length}</Link>
    </div>
    const forNavTablet = <div className={classes.iconLinks}>
        <FaSearch onClick={onSearch2Click}  className={classes.iconItem} size={isTablet ? 25 : 20} />
        <Link to="/login" className={classes.iconItem}>
            {
                isLoginedIn ? <FaUserCheck size={isTablet ? 30 : 25} /> :
                <FaUserAlt size={isTablet ? 30 : 25} />
            }
        </Link>
        <Link to="/cart" className={classes.iconItem}> <AiOutlineShoppingCart size={isTablet ? 30 : 25} className={classes.iconCart}/> <span className={classes.cartAmt}>{isPending ? "" : error ? "" : data.length}</span></Link>
        <Link to="/categories/All" className={classes.iconItem}><FiMenu size={isTablet ? 30 : 25} /></Link>
    </div>

    return ( 
        <nav className={classes.navbarWrapper00}>
            <div className={classes.navbarWrapper}>
                <div className="">
                    <Link to="/" className={classes.brandName}>RENAH</Link>
                </div>
                <div className={classes.searchBar1}>
                    <form>
                        <input placeholder="Search for items, products and inspiriations..." value={query} onChange={event => setQuery(event.target.value)} />
                        <FaSearch  className={classes.icon1} />
                        <TiDelete  className={classes.icon2} onClick={onCancelSearchClick}  />
                    </form>
                    <div className={classes.searchItems}>
                        {searchItems}
                    </div>
                
                </div>
                <div className={classes.linksWrapper}>
                    { isLaptop ? forNavLaptop : <></>}
                    { isTablet ? forNavTablet : <></>}
                    { isMobile ? forNavTablet : <></>}
                </div>
            </div>
            { isSearch2 ? searchBar2 : null}
        </nav>

    );
}
 
export default Navbar;