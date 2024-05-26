import React, { useState, useEffect } from "react";

export function LoadingDots() {
  const loaderStyle = {
    height: '15px',
    aspectRatio: '2.5',
    '--_g': 'no-repeat radial-gradient(farthest-side,#000 90%,#0000)',
    background: 'var(--_g), var(--_g), var(--_g), var(--_g)',
    backgroundSize: '20% 50%',
    animation: 'l43 1s infinite linear',
    display:'inline-block',
    "margin-left":'15px'
  };

  return (
    <div className="loader" style={loaderStyle}>
      <style>
        {`
          @keyframes l43 {
            0% { background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%; }
            16.67% { background-position: calc(0*100%/3) 0, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%; }
            33.33% { background-position: calc(0*100%/3) 100%, calc(1*100%/3) 0, calc(2*100%/3) 50%, calc(3*100%/3) 50%; }
            50% { background-position: calc(0*100%/3) 50%, calc(1*100%/3) 100%, calc(2*100%/3) 0, calc(3*100%/3) 50%; }
            66.67% { background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 100%, calc(3*100%/3) 0; }
            83.33% { background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 100%; }
            100% { background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%; }
          }
        `}
      </style>
    </div>
  );
}
