import React from 'react';
import { QRType, VCardData } from '../types';

interface QRCodeDisplayProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showQRCode: boolean;
  error: string;
  qrType: QRType;
  textInput: string;
  vcardData: VCardData;
  onDownload: (qrType: QRType, textInput: string, vcardData: VCardData) => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  canvasRef,
  showQRCode,
  error,
  qrType,
  textInput,
  vcardData,
  onDownload,
}) => {
  return (
    <div className="output-section">
      <h2>Generated QR Code</h2>
      {error && <div className="error">{error}</div>}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {showQRCode && (
        <div className="qr-output">
          <canvas
            ref={canvasRef}
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
          <button
            onClick={() => onDownload(qrType, textInput, vcardData)}
            className="download-btn"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
