import Sketch from 'react-p5';
import { useRef, useEffect } from 'react';

export default function PerilNoise({ sentiment = 0, emotion = 'neutral' }) {
    const particlesRef = useRef([]);
    const numParticles = 100;
    
    const emotionConfigs = {
        happy: {
            speed: 3,
            noiseScale: 0.01,
            particleSize: 4,
            bounce: 0.2
        },
        sad: {
            speed: 0.8,
            noiseScale: 0.005,
            particleSize: 3,
            bounce: -0.1 
        },
        angry: {
            speed: 5,
            noiseScale: 0.03,
            particleSize: 2,
            bounce: 0
        },
        neutral: {
            speed: 2,
            noiseScale: 0.015,
            particleSize: 3,
            bounce: 0
        }
    };
    
    useEffect(() => {
        particlesRef.current = [];
    }, [emotion]);
    
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        p5.colorMode(p5.HSB, 360, 100, 100, 100);
        
        particlesRef.current = [];
        for (let i = 0; i < numParticles; i++) {
            particlesRef.current.push({
                x: p5.random(p5.width),
                y: p5.random(p5.height),
                prevX: p5.random(p5.width),
                prevY: p5.random(p5.height)
            });
        }
    };
    
    const draw = (p5) => {

        p5.fill(0, 0, 10, 25);  
        p5.rect(0, 0, p5.width, p5.height);
        
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < numParticles; i++) {
                particlesRef.current.push({
                    x: p5.random(p5.width),
                    y: p5.random(p5.height),
                    prevX: p5.random(p5.width),
                    prevY: p5.random(p5.height)
                });
            }
        }
        
        const config = emotionConfigs[emotion] || emotionConfigs.neutral;
        

        const hue = p5.map(sentiment, -1, 1, 0, 120);
        const saturation = Math.abs(sentiment) * 100 || 50;
        const brightness = 90;
        
        particlesRef.current.forEach((particle) => {
            particle.prevX = particle.x;
            particle.prevY = particle.y;
            
            const noiseVal = p5.noise(
                particle.x * config.noiseScale,
                particle.y * config.noiseScale,
                p5.frameCount * 0.001
            );
            
            const angle = noiseVal * p5.TWO_PI * 2;
            const vel = config.speed * (1 + sentiment * 0.5);
            
            particle.x += p5.cos(angle) * vel;
            particle.y += p5.sin(angle) * vel + config.bounce;
            

            if (particle.x > p5.width) {
                particle.x = 0;
                particle.prevX = p5.width;
            }
            if (particle.x < 0) {
                particle.x = p5.width;
                particle.prevX = 0;
            }
            if (particle.y > p5.height) {
                particle.y = 0;
                particle.prevY = p5.height;
            }
            if (particle.y < 0) {
                particle.y = p5.height;
                particle.prevY = 0;
            }
            
            
            const dist = p5.dist(particle.prevX, particle.prevY, particle.x, particle.y);
            if (dist < 50) {
                p5.stroke(hue, saturation, brightness, 30);
                p5.strokeWeight(config.particleSize * 0.5);
                p5.line(particle.prevX, particle.prevY, particle.x, particle.y);
            }
            
      
            p5.stroke(hue, saturation, brightness, 80);
            p5.strokeWeight(config.particleSize);
            p5.point(particle.x, particle.y);
        });
    };
    
    const windowResized = (p5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
        particlesRef.current.forEach(particle => {
            if (particle.x > p5.width) particle.x = p5.width;
            if (particle.y > p5.height) particle.y = p5.height;
        });
    };
    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1  
        }}>
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
        </div>
    );
}