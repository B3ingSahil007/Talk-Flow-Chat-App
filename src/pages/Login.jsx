import React, { useState } from 'react';
import backgroundImage from '../assets/background.png';
import { SiImessage } from "react-icons/si";
import { login, signup, resetPassword } from '../config/firebase';

const Login = () => {
    // States for user input fields
    const [currentState, setCurrentState] = useState("Log In"); // State to handle current view - "Log In" or "Sign Up"
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    // Handles form submission for login/signup
    const onSubmitHandle = (event) => {
        event.preventDefault()

        // Handle sign up
        if (currentState === "Sign Up") {
            signup(username, email, password, mobileNumber) // Call signup function
            // Clear input fields after submission
            setUserName("")
            setMobileNumber("")
            setEmail("")
            setPassword("")
        } else {
            // Handle login
            login(email, password)  // Call login function
            // Clear input fields after submission
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div className="login min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Main container for login/sign-up content */}
            <div className="flex flex-col lg:flex-row w-full max-w-7xl p-6 bg-opacity-70 rounded-lg">
                {/* Left section with app logo and title */}
                <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-center justify-center mb-6 lg:mb-0 lg:mr-10 text-center lg:text-left gap-4">
                    <SiImessage className="text-7xl lg:text-9xl" />
                    <h2 className="text-4xl lg:text-6xl font-semibold prata-regular underline underline-offset-8">Talk-Flow</h2>
                </div>

                {/* Right section with the form */}
                <div className="flex-1 rounded-lg shadow-2xl w-full max-w-[660px] lg:max-w-[700px]">
                    {/* Form for login or sign up */}
                    <form onSubmit={onSubmitHandle} className="login-form p-3">
                        {/* Heading for current state (Log In or Sign Up) */}
                        <h2 className="text-2xl font-bold mb-2 prata-regular">{currentState} :</h2>
                        {/* Conditional rendering based on current state */}
                        {currentState === "Sign Up" && (
                            // Inputs for sign up (username, email, password, mobile number)
                            <div className="flex flex-col space-y-4 mb-4">
                                <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Username" required />
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Email Address" required />
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Password" required />
                                <input onChange={(e) => setMobileNumber(e.target.value)} value={mobileNumber} style={{ MozAppearance: "textfield" }} type="number" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Mobile Number" required />
                            </div>
                        )}
                        {currentState === "Log In" && (
                            // Inputs for login (email, password)
                            <div className="flex flex-col space-y-4 mb-4">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Email Address" required />
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Password" required />
                            </div>
                        )}

                        {/* Submit button */}
                        <button type="submit" className="btn btn-outline-dark w-full mb-4 text-gray-400">{currentState}</button>
                        {/* Terms of service checkbox for Sign Up */}
                        {currentState === "Sign Up" && (
                            <div className="login-term mb-2 flex items-center">
                                <input type="checkbox" />
                                <p className="ml-2 text-gray-400 text-sm sm:text-base">Agree to the terms of use & privacy policy.</p>
                            </div>
                        )}

                        {/* Forgot password and toggle between login and signup */}
                        <div className="login-forgot">
                            {currentState === "Sign Up" ? (
                                // Toggle link to switch to login
                                <p className="login-toggle text-gray-400 text-sm sm:text-base"> Already have an account ?{" "} <span onClick={() => setCurrentState("Log In")} className="text-blue-500 cursor-pointer"> Login Here </span> </p>
                            ) : (
                                // Toggle link to switch to sign up
                                <p className="login-toggle text-gray-400"> Don't have an account ?{" "} <span onClick={() => setCurrentState("Sign Up")} className="text-blue-500 cursor-pointer"> Register Here </span> </p>
                            )}
                            {/* Forgot password link */}
                            {currentState === "Log In" ? <p className="login-toggle text-gray-400">Forgot Password ?{" "} <span onClick={() => resetPassword(email)} className="text-blue-500 cursor-pointer"> Reset Here </span> </p> : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
