'use client';

import { useState, useEffect } from 'react';
import './styles.css';

const suryaNamaskarPoses = [
  { name: 'Pranamasana', en: 'Prayer Pose', position: 'standing' },
  { name: 'Hasta Uttanasana', en: 'Raised Arms Pose', position: 'raised' },
  { name: 'Hasta Padasana', en: 'Hand to Foot Pose', position: 'forward' },
  { name: 'Ashwa Sanchalanasana', en: 'Equestrian Pose', position: 'lunge' },
  { name: 'Dandasana', en: 'Stick Pose', position: 'plank' },
  { name: 'Ashtanga Namaskara', en: 'Eight Limbed Pose', position: 'eight' },
  { name: 'Bhujangasana', en: 'Cobra Pose', position: 'cobra' },
  { name: 'Adho Mukha Svanasana', en: 'Downward Dog', position: 'down-dog' },
  { name: 'Ashwa Sanchalanasana', en: 'Equestrian Pose', position: 'lunge' },
  { name: 'Hasta Padasana', en: 'Hand to Foot Pose', position: 'forward' },
  { name: 'Hasta Uttanasana', en: 'Raised Arms Pose', position: 'raised' },
  { name: 'Tadasana', en: 'Mountain Pose', position: 'standing' }
];

export default function Home() {
  const [currentPose, setCurrentPose] = useState(0);
  const [sunPosition, setSunPosition] = useState(0);
  const [practitioners, setPractitioners] = useState([
    { id: 1, offset: 0, speed: 1 },
    { id: 2, offset: 3, speed: 0.95 },
    { id: 3, offset: 6, speed: 1.05 },
    { id: 4, offset: 2, speed: 1.02 },
    { id: 5, offset: 8, speed: 0.98 }
  ]);

  useEffect(() => {
    const sunInterval = setInterval(() => {
      setSunPosition(prev => (prev + 0.1) % 100);
    }, 100);

    return () => clearInterval(sunInterval);
  }, []);

  useEffect(() => {
    const poseInterval = setInterval(() => {
      setCurrentPose(prev => (prev + 1) % suryaNamaskarPoses.length);
    }, 2500);

    return () => clearInterval(poseInterval);
  }, []);

  return (
    <main className="scene">
      <div className="sky" style={{
        background: `linear-gradient(to bottom,
          ${sunPosition < 30 ? '#1a1a2e' : '#FF6B6B'} 0%,
          ${sunPosition < 30 ? '#16213e' : '#FFA07A'} 30%,
          ${sunPosition < 30 ? '#0f3460' : '#FFD93D'} 60%,
          ${sunPosition < 30 ? '#533483' : '#87CEEB'} 100%)`
      }}>
        <div
          className="sun"
          style={{
            bottom: `${Math.min(sunPosition * 1.5, 70)}%`,
            opacity: Math.min(sunPosition / 30, 1),
            boxShadow: `0 0 ${40 + sunPosition}px ${20 + sunPosition / 2}px rgba(255, 200, 100, ${Math.min(sunPosition / 30, 0.8)})`
          }}
        />
        <div className="birds">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bird"
              style={{
                left: `${(i * 15 + sunPosition * 2) % 100}%`,
                top: `${15 + Math.sin(i) * 10}%`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              ︿
            </div>
          ))}
        </div>
      </div>

      <div className="ganges">
        <div className="water">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="wave"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        <div className="reflection" />
      </div>

      <div className="ghat">
        <div className="steps">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="step"
              style={{
                bottom: `${i * 6}%`,
                height: '6%'
              }}
            />
          ))}
        </div>

        <div className="temple">
          <div className="dome"></div>
          <div className="spire"></div>
        </div>

        <div className="practitioners">
          {practitioners.map((practitioner, idx) => (
            <div
              key={practitioner.id}
              className={`practitioner pose-${suryaNamaskarPoses[(currentPose + practitioner.offset) % suryaNamaskarPoses.length].position}`}
              style={{
                left: `${15 + idx * 15}%`,
                bottom: '35%',
                animationDuration: `${2.5 / practitioner.speed}s`
              }}
            >
              <div className="head"></div>
              <div className="body"></div>
              <div className="arm left"></div>
              <div className="arm right"></div>
              <div className="leg left"></div>
              <div className="leg right"></div>
            </div>
          ))}
        </div>

        <div className="diyas">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="diya"
              style={{
                left: `${10 + i * 7}%`,
                bottom: `${30 + (i % 2) * 8}%`
              }}
            >
              <div className="flame"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-panel">
        <h1>Surya Namaskar at Assi Ghat</h1>
        <div className="current-pose">
          <h2>{suryaNamaskarPoses[currentPose].name}</h2>
          <p>{suryaNamaskarPoses[currentPose].en}</p>
          <span className="pose-count">Pose {currentPose + 1} of 12</span>
        </div>
        <div className="location">
          <p>📍 Assi Ghat, Varanasi</p>
          <p>🌅 Sunrise Yoga Session</p>
        </div>
      </div>
    </main>
  );
}
