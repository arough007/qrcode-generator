import React, { ReactNode } from 'react';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ 
  htmlFor, 
  children, 
  className = '', 
  required = false 
}) => {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`.trim()}>
      {children}
      {required && <span className="required">*</span>}
    </label>
  );
};

export default Label; 