import React, { useRef } from 'react';
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
  const formatRefs = useRef<Record<DownloadFormat, HTMLDivElement | null>>({
    png: null,
    jpg: null,
    jpeg: null,
    svg: null,
    pdf: null,
  });

  const formats: {
    value: DownloadFormat;
    label: string;
    description: string;
  }[] = [
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

  // Handle keyboard navigation for format selection
  const handleKeyDown = (e: React.KeyboardEvent, format: DownloadFormat) => {
    if (disabled) return;

    const currentIndex = formats.findIndex(f => f.value === format);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onFormatChange(format);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % formats.length;
        const nextFormat = formats[nextIndex].value;
        formatRefs.current[nextFormat]?.focus();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex =
          currentIndex === 0 ? formats.length - 1 : currentIndex - 1;
        const prevFormat = formats[prevIndex].value;
        formatRefs.current[prevFormat]?.focus();
        break;

      case 'Home':
        e.preventDefault();
        formatRefs.current[formats[0].value]?.focus();
        break;

      case 'End':
        e.preventDefault();
        formatRefs.current[formats[formats.length - 1].value]?.focus();
        break;
    }
  };

  return (
    <div className="export-options">
      <div className="export-header">
        <h3 id="export-title" className="export-title">
          Export Format
        </h3>
      </div>

      <div
        className="format-grid"
        role="radiogroup"
        aria-labelledby="export-title"
      >
        {formats.map(format => (
          <div
            key={format.value}
            ref={el => {
              formatRefs.current[format.value] = el;
            }}
            className={`format-option ${
              selectedFormat === format.value ? 'selected' : ''
            } ${disabled ? 'disabled' : ''}`}
            role="radio"
            aria-checked={selectedFormat === format.value}
            aria-describedby={`format-desc-${format.value}`}
            tabIndex={disabled ? -1 : selectedFormat === format.value ? 0 : -1}
            onClick={() => !disabled && onFormatChange(format.value)}
            onKeyDown={e => handleKeyDown(e, format.value)}
          >
            <div className="format-info">
              <span className="format-name">{format.label}</span>
              <small id={`format-desc-${format.value}`} className="format-desc">
                {format.description}
              </small>
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
