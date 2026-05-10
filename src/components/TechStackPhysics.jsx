import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { usePortfolio } from '../context/PortfolioContext';

const TechStackPhysics = () => {
    const sceneRef = useRef(null);
    const canvasRef = useRef(null);
    const { skills } = usePortfolio();

    useEffect(() => {
        const engine = Matter.Engine.create();
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: 800,
                height: 400,
                background: 'transparent',
                wireframes: false,
            },
        });

        const ground = Matter.Bodies.rectangle(400, 410, 810, 20, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-10, 200, 20, 400, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(810, 200, 20, 400, { isStatic: true });

        const techBodies = skills.slice(0, 10).map((skill, index) => {
            return Matter.Bodies.rectangle(
                Math.random() * 800, 
                Math.random() * -500, 
                120, 40, 
                {
                    chamfer: { radius: 10 },
                    render: {
                        fillStyle: '#10b981',
                        strokeStyle: '#ffffff',
                        lineWidth: 1,
                        text: {
                            content: skill.name,
                            color: '#ffffff',
                            size: 16,
                            family: 'Inter',
                        }
                    }
                }
            );
        });

        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ...techBodies, mouseConstraint]);
        
        Matter.Runner.run(engine);
        Matter.Render.run(render);

        return () => {
            Matter.Render.stop(render);
            Matter.Engine.clear(engine);
        };
    }, [skills]);

    return (
        <div className="w-full flex justify-center py-10">
            <div ref={sceneRef} className="relative glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <canvas ref={canvasRef} />
                <div className="absolute top-4 left-6 pointer-events-none">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary-500">Interactive Tech Playground</h3>
                    <p className="text-[10px] text-gray-500 font-medium">Drag and toss the skills!</p>
                </div>
            </div>
        </div>
    );
};

export default TechStackPhysics;
