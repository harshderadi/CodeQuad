import React from "react";
import styled from "styled-components";

const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span className="bracket">&lt;</span>
        <span className="text">LOADING</span>
        <span className="dots">...</span>
        <span className="bracket">/&gt;</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: radial-gradient(circle at center, #1e1e2f, #12121a);
  padding: 20px;

  .loader {
    font-size: 5vw;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 0.5vw;
    text-transform: uppercase;
    animation: float 3s infinite ease-in-out;
  }

  .bracket {
    color: #ff4da6;
    text-shadow: 0 0 10px #ff4da6;
  }

  .text {
    color: #00eaff;
    text-shadow: 0 0 15px #00eaff;
    animation: glow 1.5s infinite alternate;
  }

  .dots {
    color: #ffcc00;
    text-shadow: 0 0 10px #ffcc00;
    animation: blink 1.5s infinite alternate;
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 10px #00eaff;
    }
    to {
      text-shadow: 0 0 20px #00eaff;
    }
  }

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loader {
      font-size: 8vw;
      gap: 1vw;
    }
  }

  @media (max-width: 480px) {
    .loader {
      font-size: 10vw;
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default Loader;
