import React from 'react';

const Card = ({
  title = '',
  children,
  className = '',
}) => {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-md ${className}`}>
      {title && <h3 className="text-xl font-bold py-3 mb-2 text-center uppercase ">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
