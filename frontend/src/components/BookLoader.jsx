import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap');
      `}</style>
      <div className="loader-container">
        {/* Deep Spotlight Glow */}
        <div className="spotlight-glow" />

        {/* Gradient Edge Glow */}
        <div className="edge-glow" />

        <div className="loader">
          <div className="glass-book">
            <div className="glass-reflection" />
            <ul>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
        <p className="loading-text">Loading Jamia Connect…</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Removed the hardcoded background gradient here to allow the parent container to control the overall background */

  .loader-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: float 4s ease-in-out infinite;
  }

  .spotlight-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(129,157,60,0.25) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 0;
    pointer-events: none;
  }

  .edge-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #809D3C, #5D8736, #A9C46C);
    filter: blur(20px);
    opacity: 0.4;
    border-radius: 24px;
    z-index: 0;
    pointer-events: none;
  }

  .loader {
    --duration: 4s; /* Slower, smoother animation */
    width: 200px;
    height: 140px;
    position: relative;
    z-index: 1;
  }

  .loader:before,
  .loader:after {
    --r: -6deg;
    content: "";
    position: absolute;
    bottom: 8px;
    width: 120px;
    top: 80%;
    box-shadow: 0 16px 20px rgba(0, 0, 0, 0.15);
    transform: rotate(var(--r));
    z-index: -1;
  }

  .loader:before {
    left: 4px;
  }

  .loader:after {
    --r: 6deg;
    right: 4px;
  }

  .glass-book {
    width: 100%;
    height: 100%;
    border-radius: 18px;
    position: relative;
    z-index: 1;
    perspective: 800px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(255,255,255,0.05);
    overflow: hidden;
  }

  .glass-reflection {
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg);
    animation: shine 5s infinite;
    z-index: 10;
    pointer-events: none;
  }

  .glass-book ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .glass-book ul li {
    --r: 180deg;
    --o: 0;
    /* Soft white to subtle green tint */
    --c: url(#pageGrad); 
    position: absolute;
    top: 10px;
    left: 10px;
    transform-origin: 100% 50%;
    color: rgba(255, 255, 255, 0.85); /* Default page color */
    opacity: var(--o);
    transform: rotateY(var(--r));
    animation: var(--duration) ease-in-out infinite;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
  }

  /* Defing gradients in SVG requires SVG defs, but we can simulate the tint via color */
  .glass-book ul li:nth-child(2) {
    color: rgba(255, 255, 255, 0.65);
    animation-name: page-2;
  }

  .glass-book ul li:nth-child(3) {
    color: rgba(235, 245, 225, 0.75); /* Soft green tint */
    animation-name: page-3;
  }

  .glass-book ul li:nth-child(4) {
    color: rgba(255, 255, 255, 0.65);
    animation-name: page-4;
  }

  .glass-book ul li:nth-child(5) {
    color: rgba(235, 245, 225, 0.75);
    animation-name: page-5;
  }

  .glass-book ul li svg {
    width: 90px;
    height: 120px;
    display: block;
    /* Applying subtle gradient to the svg fill using CSS drop shadow as a hack, or rely on solid color */
  }

  .glass-book ul li:first-child {
    --r: 0deg;
    --o: 1;
    color: rgba(255, 255, 255, 0.9);
  }

  .glass-book ul li:last-child {
    --o: 1;
    color: rgba(255, 255, 255, 0.85);
  }

  .loading-text {
    margin-top: 30px;
    font-family: 'Fraunces', serif;
    color: #5D8736;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0,0,0,0.05);
    animation: pulse-text 3s ease-in-out infinite;
    z-index: 2;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shine {
    0% {
      left: -150%;
    }
    20%, 100% {
      left: 200%;
    }
  }

  @keyframes pulse-text {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  /* Slowed down page animations */
  @keyframes page-2 {
    0% { transform: rotateY(180deg); opacity: 0; }
    20% { opacity: 1; }
    35%, 100% { opacity: 0; }
    50%, 100% { transform: rotateY(0deg); }
  }

  @keyframes page-3 {
    15% { transform: rotateY(180deg); opacity: 0; }
    35% { opacity: 1; }
    50%, 100% { opacity: 0; }
    65%, 100% { transform: rotateY(0deg); }
  }

  @keyframes page-4 {
    30% { transform: rotateY(180deg); opacity: 0; }
    50% { opacity: 1; }
    65%, 100% { opacity: 0; }
    80%, 100% { transform: rotateY(0deg); }
  }

  @keyframes page-5 {
    45% { transform: rotateY(180deg); opacity: 0; }
    65% { opacity: 1; }
    80%, 100% { opacity: 0; }
    95%, 100% { transform: rotateY(0deg); }
  }
`;

export default Loader;