// src/components/Button.jsx
import React from 'react'

function Button({ className = '', children = 'Click Me', onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center  font-sans font-semibold tracking-wide text-white 
                  rounded-lg bg-gradient-to-r from-[#5D8736] via-[#809D3C] to-[#A9C46C] hover:scale-105 
                  transition-transform duration-300 shadow-xl ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
