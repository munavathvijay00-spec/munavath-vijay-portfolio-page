import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            <motion.div
                className="w-8 h-8 rounded-full border border-primary-500 flex items-center justify-center"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? "rgba(16, 185, 129, 0.1)" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary-500 absolute top-0 left-0"
                animate={{
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
            />
        </div>
    );
};

export default CustomCursor;
