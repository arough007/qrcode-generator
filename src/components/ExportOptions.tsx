import React from 'react';
import { DownloadFormat } from '../types';

interface ExportOptionsProps {
  selectedFormat: DownloadFormat;
  onFormatChange: (format: DownloadFormat) => void;
  onDownload: (format: DownloadFormat) => void;
  disabled?: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  selectedFormat,
  onFormatChange,
  onDownload,
  disabled = false,
}) => {
  const formats: { value: DownloadFormat; label: string; description: string }[] = [
    {
      value: 'png',
      label: 'PNG',
      description: 'Best for web and digital use',
    },
    {
      value: 'jpeg',
      label: 'JPEG',
      description: 'Best for smaller file sizes',
    },
    {
      value: 'svg',
      label: 'SVG',
      description: 'Best for print and scaling',
    },
    {
      value: 'pdf',
      label: 'PDF',
      description: 'Best for documents',
    },
  ];

  return (
    <div className="export-options">
      <div className="export-header">
        <h3 className="export-title">Export Format</h3>
      </div>

      <div className="format-grid">
        {formats.map((format) => (
          <div
            key={format.value}
            className={`format-option ${
              selectedFormat === format.value ? 'selected' : ''
            } ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onFormatChange(format.value)}
          >
            <div className="format-info">
              <span className="format-name">{format.label}</span>
              <small className="format-desc">{format.description}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="export-buttons">
        <button
          onClick={() => onDownload(selectedFormat)}
          disabled={disabled}
          className="download-btn primary"
          title={
            disabled
              ? 'Enter data first'
              : `Download QR code as ${selectedFormat.toUpperCase()}`
          }
        >
          Download {selectedFormat.toUpperCase()}
        </button>
      </div>
    </div>
  );
};



export default ExportOptions; 