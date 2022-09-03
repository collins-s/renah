import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [isPending, setISPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const aborter = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: aborter.signal })
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
        
        
        return () => aborter.abort();
    }, [url]);
    return {isPending, error, data}
}

export default useFetch;