import React, { useEffect } from "react";
import classes from "./Signup.module.css";
// import { Container, Row, Col } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import { useHistory } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";

const Signup = () => {

    const usersURL = "http://localhost:3001/users";

    const [ fullName, setfullName] = useState();
    const [ username, setUsername] = useState();
    const [ phoneNumber, setPhoneNumber] = useState();
    const [ password, setPassword] = useState();
    const [ passwordRepeat, setPasswordRepeat] = useState();
    const [ id, setId] = useState();
    const [ refresh, setRefresh] = useState(false);
    const [ email, setEmail] = useState();
    const [ errorMessage, seterrorMessage] = useState("");


    const {data, isPending, error} = useFetch("http://localhost:3001/users")

    let history = useHistory();
 
    const onSignupClick = (e) => {
        e.preventDefault();
        const loadedData = isPending ? "Loading" : error ? error : data;

        const gottencredentials = loadedData.filter((item) => {
            return (item.email === email )
        })

        console.log(gottencredentials);

        const credentials = {
            password: password,
            email: email,
            fullName: fullName,
            status: ""
        }

        if(password === "" || email === "" || fullName === "" || passwordRepeat === "" || phoneNumber === "") {
            seterrorMessage("All fields required");
        } else {

            if(gottencredentials.length === 0) {
                
                setId(gottencredentials.id)
    
                if(password === passwordRepeat) {
                    if (phoneNumber.length === 11) {
    
                        setTimeout(() => {
                            fetch(usersURL, {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(credentials)
                            })
                            .then (() => {
                                console.log("Posted to DB");
                            })
                        }, 100)
                        setEmail("")
                        setfullName("")
                        setPassword("")
                        setPasswordRepeat("")
                        setPhoneNumber("")
                        history.push("/login")
                    } else {
                        seterrorMessage("Passwords don't match");    
                        setPassword("")
                        setPasswordRepeat("")
                        setPhoneNumber("")
                    }
                }else {
                    seterrorMessage("Passwords don't match");    
                    setPassword("")
                    setPasswordRepeat("")
                }
    
                
    
            } else {
                console.log("Email already exists");setTimeout(() => {
                    seterrorMessage("");
                }, 3000)
                seterrorMessage("Email already exists");
                setEmail("")
                setfullName("")
                setPassword("")
                setPasswordRepeat("")
                setPhoneNumber("")
            }
        }

    }
    return (
        <div className="">
            <Navbar />
            <div className={classes.wrapper}>
                <div className={classes.signupWrapper}>
                    <div className={classes.carousel}>
                        {/* Create a carousel and put abeg */}
                    </div>
                    <div className={classes.loginForm}>
                        <h1>Create Your Account</h1>
                        <div className={classes.signinOpts}>
                            <button className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} ><FcGoogle className={classes.logo} /> Sign up with Google</button>
                            <button className={`${classes.signinOptsBtnFacebook} ${classes.btns}`} ><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                        </div>
                        <p className={classes.text}>Or Sign up with email address below</p>
                        <form action="">
                            <p class={classes.errMsg}>{errorMessage}</p>
                            <input className={classes.inputBox} type="text" placeholder="Full Name" name="name" onChange={e => setfullName(e.target.value)} value={fullName} />
                            <br/>
                            <input className={classes.inputBox} type="text" placeholder="Phone Number" name="pnumber" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} />
                            <br/>
                            <input className={classes.inputBox} type="email" placeholder="Email Address" name="username" onChange={e => setEmail(e.target.value)} value={email} />
                            <br/>
                            {/* <p class="hidden">Not a valid username</p> */}
            
                            <input className={classes.inputBox} type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
                            <br/>
                            <input className={classes.inputBox} type="password" placeholder="Repeat Password" name="password" onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat} />
                            <br/>
                            <br/>
                            {/* <input className={classes.check} type="checkbox" name="check"/> */}
                            <button className={classes.loginBtn} onClick={onSignupClick} >Sign up</button>
                        </form>
                        <p className={classes.signupOpt}>Already have an account? <Link to="/login" className={classes.signupBtn}>Login</Link></p>
                    </div>
            
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Signup