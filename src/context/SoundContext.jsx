import React, { createContext, useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('isMuted');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('isMuted', JSON.stringify(isMuted));
    }, [isMuted]);

    // UI Sound URLs (High-end minimalist sounds)
    const hoverSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
    const clickSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
    const transitionSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3';

    const [playHover] = useSound(hoverSoundUrl, { volume: 0.2, soundEnabled: !isMuted });
    const [playClick] = useSound(clickSoundUrl, { volume: 0.4, soundEnabled: !isMuted });
    const [playTransition] = useSound(transitionSoundUrl, { volume: 0.3, soundEnabled: !isMuted });

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playTransition }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSoundEffects = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error('useSoundEffects must be used within a SoundProvider');
    return context;
};
