import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import useFetch from "../useFetch";
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
    const usersURL = "http://localhost:3001/users";

    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    
    const [ username, setUsername] = useState();
    const [ password, setPassword] = useState();
    const [ id, setId] = useState();
    const [ errorMessage, seterrorMessage] = useState("");

    const {data, isPending, error} = useFetch("http://localhost:3001/users")

    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])
    
    let history = useHistory();
 
    const onLoginClick = (e) => {
        e.preventDefault();
        const loadedData = isPending ? "Loading" : error ? error : data;
        console.log("Correct1 " + loadedData[0].username)

        const gottencredentials = loadedData.filter((item) => {
            return (item.username === username || item.email === username) && (item.password === password)
        })

        console.log(gottencredentials);

        if(gottencredentials.length === 0) {
            console.log("Invalid username or password");setTimeout(() => {
                seterrorMessage("");
            }, 3000)
            seterrorMessage("Invalid username or password");
        } else {
            setId(gottencredentials.id)
            history.push("/");
        }
    }
    return (
        <div className="">
            <Navbar />
            <div className={classes.wrapper}>
                <div className={classes.loginWrapper}>
                    <div className={classes.carousel}>
                        {/* Create a carousel and put abeg */}
                        {/* <img className={classes.displayImg} src="https://i.ibb.co/5cp66td/img33.jpg" alt="" /> */}
                    </div>
                    <div className={classes.loginForm}>
                        <h1>Login</h1>
                        <div className={classes.signinOpts}>
                            <button className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} ><FcGoogle className={classes.logo} /> Sign up with Google</button>
                            <button className={`${classes.signinOptsBtnFacebook} ${classes.btns}`}><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                        </div>
                        <p className={classes.text}>Or Sign in with email address below</p>
                        <form action="">
                            <p class={classes.errMsg}>{errorMessage}</p>
                            <input className={classes.inputBox} type="text" placeholder="Email Address" name="username" onChange={e => setUsername(e.target.value)}/>
                            <br/>
                            <br />
                            <input className={classes.inputBox} type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
            
                            <br/>
                            <p className={classes.passReset}>Fogot Password?</p>
                            <br/>
                            {/* <input className={classes.check} type="checkbox" name="check"/> */}
                            <button className={classes.loginBtn} onClick={onLoginClick}>Login</button>
                        </form>
            
                        <br/>
                        {
                            // if
                        }
                        {/* <p class="hidden">Not a valid username</p> */}
            
                        <p className={classes.signupOpt}>Dont have an account? <Link to="/signup" className={classes.signupBtn} >Sign Up</Link></p>
                    </div>
            
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login