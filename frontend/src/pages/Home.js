
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";

function Home() {

    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState();
    const [products, setproducts] = useState();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))

    }, [])

    const handdleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("user loggedout Successful");
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProduct = async () => {
        try {

            const url = "https://deploy-mern-app1-llgl.vercel.app/product";
            localStorage.getItem('token');
            const headers = {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
            const response = await fetch(url,
                { headers }
            );
            const result = await response.json();

            setproducts(result);

        } catch (err) {

            handleError(err);

        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <div>
            <h1>{loggedInUser}</h1>

            <button onClick={handdleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>

                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>

    )
}

export default Home;
