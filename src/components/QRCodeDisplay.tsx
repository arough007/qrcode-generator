import React from 'react';
import { QRType } from '../types';

interface QRCodeDisplayProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showQRCode: boolean;
  error: string;
  qrType: QRType;
  onDownload: (qrType: QRType) => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  canvasRef,
  showQRCode,
  error,
  qrType,
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
          <button onClick={() => onDownload(qrType)} className="download-btn">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay; 