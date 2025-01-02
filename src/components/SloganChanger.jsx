import React, { useState, useEffect } from "react";

// Array of slogans to be displayed
const slogans = [
    "Connect. Chat. Flourish.",
    "Where Conversations Come Alive.",
    "Your Gateway to Meaningful Connections.",
    "Chat Smarter, Live Better.",
    "Bringing People Closer, One Message at a Time.",
    "Talk Freely, Flow Effortlessly.",
    "Connecting Hearts, Bridging Minds.",
    "From Thoughts to Threads—Seamlessly.",
    "Empowering Conversations, Anytime, Anywhere.",
    "Where Every Message Matters."
];

const SloganChanger = () => {
    // State to store the current slogan being displayed
    const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);

    useEffect(() => {
        // Set an interval to change the slogan every 10 seconds
        const interval = setInterval(() => {
            setCurrentSlogan((prevSlogan) => {
                const currentIndex = slogans.indexOf(prevSlogan);   // Get the index of the current slogan
                const nextIndex = (currentIndex + 1) % slogans.length;  // Get the next index in the slogans array, looping back to the start
                return slogans[nextIndex];  // Return the next slogan to be displayed
            });
        }, 10000); // Change every 10 seconds (10000ms)


        return () => clearInterval(interval); // Cleanup the interval when the component unmounts to avoid memory leaks
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        // Display the current slogan in white text
        <p className="text-white">{currentSlogan}</p>
    );
};

export default SloganChanger;
