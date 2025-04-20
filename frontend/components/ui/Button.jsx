import React from 'react';

const Button = ({
  children = 'Click Me',
  onClick = () => {},
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary',
}) => {
  const baseStyle =
    'px-4 py-2 rounded-md text-white font-medium transition duration-200 ease-in-out';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    danger: 'bg-red-600 hover:bg-red-700',
    none:"",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
