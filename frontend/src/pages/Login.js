import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSuccess, handleError } from "../util";
import { ToastContainer } from "react-toastify";

function Login() {

    const [loginInfo, setloginInfo] = useState({
        email: "",
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setloginInfo(copyLoginInfo);
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("All fields are required");
        } try {

            const url = "http://localhost:8080/auth/login"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();

            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);

                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate("/home");
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message || message || "Loginfailed";
                handleError(details);
            } else if (!success) {
                handleError(message);

            }
            console.log(result);
        } catch (err) {
            handleError(err.massage);
        }


    }







    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogIn}>
                <div >

                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        id="email"
                        type="email"
                        name="email"

                        placeholder="Enter yout email"
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter yout password"
                        value={loginInfo.password}

                    />
                </div>
                <button type='submit'>Login</button>
                <span>I don't have a account
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;
