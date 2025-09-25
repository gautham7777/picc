import React from 'react';

const Spinner = ({ small = false }) => {
  const sizeClasses = small ? 'h-5 w-5' : 'h-12 w-12';
  const borderClasses = small ? 'border-2' : 'border-4';
  const colorClasses = small ? 'text-white' : 'text-rose-500';

  return (
    <div
      className={`${sizeClasses} ${borderClasses} ${colorClasses} border-t-transparent border-solid rounded-full animate-spin`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
