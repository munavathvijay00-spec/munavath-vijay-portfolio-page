import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '../context/SoundContext';

const MagneticButton = ({ children, className = "" }) => {
    const { playHover, playClick } = useSoundEffects();
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouse}
            onMouseEnter={playHover}
            onMouseLeave={reset}
            onClick={playClick}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
