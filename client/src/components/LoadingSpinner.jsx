import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-teal-600 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
