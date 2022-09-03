// import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import useFetch from "../useFetch"
import { Link } from "react-router-dom"
import useAddToCart from "../AddToCart";
import api from "../api/api"
import { useEffect } from "react";
import { useState } from "react";

const CardList = (props) => {

    const [data, setData] = useState({})
    const [loadedCard, setLoadedCard] = useState()

    const onAddToCartClick = useAddToCart(1, "L")

    const getData = async () => {
        try {
            const response = await api.get("/api/products")
            setData(response.data)
            // console.log(response.data);
            const loadedCard0 = data.success === false ? <div>Failed to fetch</div> : 
            data.data.map((item, pos) => {
        
                return (
                    <div key={item.id} className={classes.card}>
                        <Link className={classes.proImg} to={`/products/${item.id}`}  >
                            <img  src={item.productImg} alt="Product Pic" />
                        </Link>
                        <p className={classes.pName}>{item.productName}</p>
                        <p>N {item.productPrice}</p>
                        <button className={classes.cartBtn} onClick={() => onAddToCartClick(pos)} >ADD TO CART</button>
                    </div>
                    
                );
            })
            setLoadedCard(loadedCard0)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    useEffect(() => {
        getData();
    })

    return (
        <div className={classes.cards}>
            { loadedCard }
        </div>
    );
}

export default CardList;
