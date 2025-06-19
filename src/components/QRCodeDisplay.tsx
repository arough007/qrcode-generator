import React, { useState } from 'react';
import { QRType, VCardData, QRSettings, DownloadFormat } from '../types';
import ExportOptions from './ExportOptions';

interface QRCodeDisplayProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showQRCode: boolean;
  error: string;
  qrType: QRType;
  textInput: string;
  vcardData: VCardData;
  qrSettings: QRSettings;
  onDownload: (qrType: QRType, textInput: string, vcardData: VCardData, format: DownloadFormat) => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  canvasRef,
  showQRCode,
  error,
  qrType,
  textInput,
  vcardData,
  qrSettings,
  onDownload,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>('png');
  // Create a skeleton QR code using a dummy image
  const QRSkeleton = () => {
    const size = qrSettings.size;

    return (
      <div
        className="qr-skeleton"
        style={{
          width: size,
          height: size,
          maxWidth: '100%',
          filter: 'blur(4px)',
        }}
      >
        <img
          src="/qrcode-generator/assets/images/dummy-qr.png"
          alt="QR Code Placeholder"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={e => {
            // Fallback to a simple placeholder if image doesn't exist
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, #000 25%, transparent 25%), 
                           linear-gradient(-45deg, #000 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, #000 75%), 
                           linear-gradient(-45deg, transparent 75%, #000 75%);
                background-size: 20px 20px;
                background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                opacity: 0.2;
              "></div>
            `;
          }}
        />
      </div>
    );
  };

  return (
    <div className="output-section">
      {error && <div className="error">{error}</div>}
      <div className="qr-output">
        <div className="qr-display-container">
          <div className="qr-content">
            <canvas
              ref={canvasRef}
              style={{
                display: showQRCode ? 'block' : 'none',
                maxWidth: '100%',
                height: 'auto',
                margin: '0 auto',
              }}
            />
            {!showQRCode && <QRSkeleton />}
          </div>
          <ExportOptions
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            onDownload={(format) => onDownload(qrType, textInput, vcardData, format)}
            disabled={!showQRCode}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
