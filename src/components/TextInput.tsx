import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="textInput">Text or URL to encode:</label>
      <textarea
        id="textInput"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter text, URL, or any data you want to encode..."
      />
    </div>
  );
};

export default TextInput; 