import React, { ReactNode } from 'react';

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  return <div className={`form-group ${className}`.trim()}>{children}</div>;
};

export default FormGroup;
