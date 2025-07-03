import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  :root {
    --color-jmi-100: #F4FFC3;
    --color-jmi-200: #E9F5D0;
    --color-jmi-300: #DFF09E;
    --color-jmi-400: #A9C46C;
    --color-jmi-500: #809D3C;
    --color-jmi-600: #5D8736;
    --color-jmi-700: #3E5C25;
    --color-jmi-800: #2F441B;
    --color-jmi-900: #1E2C12;
  }

  .loader {
    width: 120px;
    height: 150px;
    background-color: var(--color-jmi-500);
    background-repeat: no-repeat;
    background-image:
      linear-gradient(var(--color-jmi-100) 50%, var(--color-jmi-200) 51%),
      linear-gradient(var(--color-jmi-100), var(--color-jmi-100)),
      linear-gradient(var(--color-jmi-100), var(--color-jmi-100)),
      radial-gradient(ellipse at center, var(--color-jmi-400) 25%, var(--color-jmi-300) 26%, var(--color-jmi-300) 50%, #0000 55%),
      radial-gradient(ellipse at center, var(--color-jmi-400) 25%, var(--color-jmi-300) 26%, var(--color-jmi-300) 50%, #0000 55%),
      radial-gradient(ellipse at center, var(--color-jmi-400) 25%, var(--color-jmi-300) 26%, var(--color-jmi-300) 50%, #0000 55%);
    background-position: 0 20px, 45px 0, 8px 6px, 55px 3px, 75px 3px, 95px 3px;
    background-size: 100% 4px, 1px 23px, 30px 8px, 15px 15px, 15px 15px, 15px 15px;
    position: relative;
    border-radius: 6%;
    animation: shake 3s ease-in-out infinite;
    transform-origin: 60px 180px;
  }

  .loader:before {
    content: "";
    position: absolute;
    left: 5px;
    top: 100%;
    width: 7px;
    height: 5px;
    background: var(--color-jmi-700);
    border-radius: 0 0 4px 4px;
    box-shadow: 102px 0 var(--color-jmi-700);
  }

  .loader:after {
    content: "";
    position: absolute;
    width: 95px;
    height: 95px;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 20px;
    background-color: var(--color-jmi-200);
    background-image:
      linear-gradient(to right, #0004 0%, #0004 49%, #0000 50%, #0000 100%),
      linear-gradient(135deg, var(--color-jmi-300) 50%, var(--color-jmi-600) 51%);
    background-size: 30px 100%, 90px 80px;
    border-radius: 50%;
    background-repeat: repeat, no-repeat;
    background-position: 0 0;
    box-sizing: border-box;
    border: 10px solid var(--color-jmi-100);
    box-shadow: 0 0 0 4px var(--color-jmi-300) inset, 0 0 6px 6px #0004 inset;
    animation: spin 3s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    50% {
      transform: rotate(360deg)
    }
    75% {
      transform: rotate(750deg)
    }
    100% {
      transform: rotate(1800deg)
    }
  }

  @keyframes shake {
    65%, 80%, 88%, 96% {
      transform: rotate(0.5deg)
    }
    50%, 75%, 84%, 92% {
      transform: rotate(-0.5deg)
    }
    0%, 50%, 100% {
      transform: rotate(0)
    }
  }
`;

export default Loader;
