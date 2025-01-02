import React, { useState, useEffect } from "react";

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
    const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlogan((prevSlogan) => {
                const currentIndex = slogans.indexOf(prevSlogan);
                const nextIndex = (currentIndex + 1) % slogans.length;
                return slogans[nextIndex];
            });
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <p className="text-white">{currentSlogan}</p>
    );
};

export default SloganChanger;
