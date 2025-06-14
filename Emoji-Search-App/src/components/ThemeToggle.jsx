import { transform } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    const [isHovered , setIsHovered] = useState(false);

    useEffect(() => {
        // Apply the theme to the body
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme); // Save theme to localStorage
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        borderRadius: '50px',
        backgroundColor: 'blue',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        background: 'Linear-gradient(to right, #4CAF50, #2196F3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };

    return (
        <button
            onClick={toggleTheme}
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};



export default ThemeToggle;