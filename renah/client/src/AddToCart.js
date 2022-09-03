import { useState, useEffect } from "react";
import useFetch from "./useFetch"

const useAddToCart = (amount, size) => {

    const {data: cards} = useFetch("http://localhost:8000/products")
    // const [isPending2, setISPending2] = useState(true);
    const [data2, setData2] = useState(null);
    // const [error2, setError2] = useState(null);
    // const [ subTotal, setSubTotal] = useState(0);
    // const [ qty, setqty] = useState(0);
    
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
                    setData2(data);
                    // setISPending2(false);
                    // setError2(null);
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        console.log("Error aborted");
                    } else {
                        // setError2(err.message);
                        // setISPending2(false);
                    }
                    
                })
        }, 200);
            
    } 

    const onAddToCartClick = (cardItemPos) => {

        const cartDetails = {
            productImg: cards[cardItemPos].productImg,
            productName: cards[cardItemPos].productName,
            productPrice: cards[cardItemPos].productPrice,
            quantity: amount,
            size: size,    
            parentId: cards[cardItemPos].id    
        }

        if( data2.length === 0) {
            setTimeout(() => {
                fetch("http://localhost:5000/products", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(cartDetails)
                })
                .then (() => {
                    getData();
                    // console.log(data2);
                })
            }, 100)
        }else {
            let cartVar = data2.find(code=>code.parentId===cards[cardItemPos].id);

            console.log(cartVar);

            if(cartVar === undefined) {
                setTimeout(() => {
                    fetch("http://localhost:5000/products", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(cartDetails)
                    })
                    .then (() => {
                        getData();
                    })
                }, 100)
            } else {

                let sameSize = data2.find(code=>code.parentId===cards[cardItemPos].id && code.size===cartDetails.size);
                
                if (sameSize !== undefined) {

                    setTimeout(() => {
                        fetch("http://localhost:5000/products/" + sameSize.id, {
                            method: "DELETE"
                        })
                        .then((res) => {
                            getData()
                            // findTotal();
                            console.log(`${cartVar.id} was deleted \n `)
                        })
                    }, 1000)
                }
                console.log("Is in cart");
                
                setTimeout(() => {
                    fetch("http://localhost:5000/products", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(cartDetails)
                    })
                    .then (() => {
                        getData();
                    })
                }, 100)
            }
        }
    }

    useEffect(() => {
    
        getData();

    }, [data2]);

    return onAddToCartClick;
}
 
export default useAddToCart;