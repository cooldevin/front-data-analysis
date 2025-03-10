import type { ISourceOptions } from '@tsparticles/engine';

export const particlesConfig: ISourceOptions = {
  background: { color: 'transparent' },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' }
    }
  },
  particles: {
    color: { value: 'var(--particle-color, #ffffff)' },
    opacity: { value: { min: 0.1, max: 0.3 } },
    size: { value: { min: 0.5, max: 1.5 } },
    move: { enable: true, speed: 0.8 },
    number: { density: { enable: true }, value: 80 }
  }
};