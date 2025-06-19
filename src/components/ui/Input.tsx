import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  error, 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'form-input';
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'error' : '';
  const classes = `${baseClasses} ${widthClass} ${errorClass} ${className}`.trim();

  return (
    <div className="input-wrapper">
      <input className={classes} {...props} />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input; 