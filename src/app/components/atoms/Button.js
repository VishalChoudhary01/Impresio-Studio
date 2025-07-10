"use client"
import React from 'react';

const Button = ({
  buttonText,
  buttonStyle,
  leftIcon,
  leftStyle,
  rightIcon,
  rightStyle,
  disable = false,
  buttonOnClick,
  buttonType = "button"
}) => {
  return (
    <button
      type={buttonType}
      onClick={buttonOnClick}
      disabled={disable}
      className={`
        ${buttonStyle} 
        flex items-center justify-center 
        font-medium
        gap-x-2
        px-4 py-2
        text-sm md:text-base
        rounded-md
        cursor-pointer
        transition-all duration-200
        
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {leftIcon && <span className={`${leftStyle} flex items-center`}>{leftIcon}</span>}
      <span>{buttonText}</span>
      {rightIcon && <span className={`${rightStyle} flex items-center`}>{rightIcon}</span>}
    </button>
  )
}

export default Button;