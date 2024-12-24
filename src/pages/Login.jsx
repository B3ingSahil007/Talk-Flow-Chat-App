import React, { useState } from 'react';
import assets from '../assets/assets';
import backgroundImage from '../assets/background.png'; // Use import for the background image

const Login = () => {
    const [currentState, setCurrentState] = useState("Log In");

    return (
        <div className="login min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: `url(${backgroundImage})` }} >
            <div className="flex flex-col lg:flex-row w-full max-w-6xl p-6 bg-opacity-70 rounded-lg">
                {/* Left side with logo and heading */}
                <div className="flex-1 flex flex-col items-center lg:items-start justify-center mb-6 lg:mb-0 lg:mr-10 text-center lg:text-left">
                    <img className="logo w-[200px] lg:w-[max(20vw,200px)] h-auto" src={assets.logo_icon} alt="Logo_Image" />
                    <h2 className="text-4xl lg:text-6xl text-white font-semibold mt-4 prata-regular">Talk-Flow</h2>
                </div>
                {/* Right side with form */}
                <div className="flex-1 p-5 rounded-lg shadow-2xl w-full max-w-[500px]">
                    <form className="login-form">
                        <h2 className="text-2xl font-bold mb-6 prata-regular">{currentState} :</h2>
                        {currentState === "Sign Up" && (
                            <div className="flex flex-col space-y-4 mb-4">
                                <input type="text" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Username" required />
                                <input type="email" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Email Address" required />
                                <input type="password" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Password" required />
                            </div>
                        )}
                        {currentState === "Log In" && (
                            <div className="flex flex-col space-y-4 mb-4">
                                <input type="email" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Email Address" required />
                                <input type="password" className="form-input p-2 border-black rounded border flex-1 bg-transparent" placeholder="Password" required />
                            </div>
                        )}
                        <button type="submit" className="btn btn-outline-dark w-full mb-4">{currentState}</button>
                        {currentState === "Sign Up" && (
                            <div className="login-term mb-2 flex items-center">
                                <input type="checkbox" />
                                <p className="ml-2 text-gray-400">Agree to the terms of use & privacy policy.</p>
                            </div>
                        )}
                        <div className="login-forgot">
                            {currentState === "Sign Up" ? (
                                <p className="login-toggle text-gray-400"> Already have an account ?{" "} <span onClick={() => setCurrentState("Log In")} className="text-blue-500 cursor-pointer"> Login Here </span> </p>
                            ) : (
                                <p className="login-toggle text-gray-400"> Don't have an account ?{" "} <span onClick={() => setCurrentState("Sign Up")} className="text-blue-500 cursor-pointer"> Register Here </span> </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
