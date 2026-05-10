import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';

const DigitalCore = () => {
    const sphereRef = useRef();

    useFrame((state) => {
        const { clock } = state;
        if (sphereRef.current) {
            sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group>
            {/* Primary Inner Glow */}
            <Sphere args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#10b981"
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </Sphere>

            {/* Outer Wireframe Layer */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[1.5, 32, 32]} ref={sphereRef}>
                    <meshStandardMaterial 
                        color="#10b981" 
                        wireframe 
                        transparent 
                        opacity={0.1}
                    />
                </Sphere>
            </Float>

            {/* Floating Dust/Particles could be added here */}
        </group>
    );
};

const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#064e3b" />
                
                <DigitalCore />
            </Canvas>
        </div>
    );
};

export default Hero3D;
