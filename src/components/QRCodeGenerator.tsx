import React, { useEffect } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import { useFormState } from '../hooks/useFormState';
import Controls from './Controls';
import QRControls from './QRControls';
import QRCodeDisplay from './QRCodeDisplay';
import { DEBOUNCE_DELAY } from '../constants';

const QRCodeGenerator: React.FC = () => {
  const [formState, formActions] = useFormState();

  const { canvasRef, showQRCode, error, generateQRCode, downloadQRCode } =
    useQRCode();

  const handleGeneration = () => {
    generateQRCode(
      formState.qrType,
      formState.textInput,
      formState.vcardData,
      formState.colors,
      formState.qrSettings
    );
  };

  // Debounced effect to regenerate QR code when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGeneration();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [
    formState.qrType,
    formState.textInput,
    formState.vcardData,
    formState.colors,
    formState.qrSettings,
  ]);

  return (
    <div className="qr-generator">
      {/* Skip Navigation Links */}
      <div className="skip-links">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#qr-code-display" className="skip-link">
          Skip to QR code
        </a>
      </div>

      <div className="desktop-layout">
        <section
          id="main-content"
          className="controls-panel"
          aria-labelledby="input-section-title"
          role="form"
        >
          <h2 id="input-section-title" className="sr-only">
            QR Code Configuration
          </h2>
          <Controls formState={formState} formActions={formActions} />
        </section>

        <section
          className="output-panel"
          aria-labelledby="output-section-title"
        >
          <h2 id="output-section-title" className="sr-only">
            QR Code Output and Settings
          </h2>

          <div
            id="qr-code-display"
            className="qr-output-area"
            role="region"
            aria-labelledby="qr-display-title"
          >
            <h3 id="qr-display-title" className="sr-only">
              Generated QR Code
            </h3>
            <QRCodeDisplay
              canvasRef={canvasRef}
              showQRCode={showQRCode}
              error={error}
              qrType={formState.qrType}
              textInput={formState.textInput}
              vcardData={formState.vcardData}
              qrSettings={formState.qrSettings}
              onDownload={downloadQRCode}
            />
          </div>

          <div
            className="qr-controls-area"
            role="region"
            aria-labelledby="qr-controls-title"
          >
            <h3 id="qr-controls-title" className="sr-only">
              QR Code Customization
            </h3>
            <QRControls formState={formState} formActions={formActions} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
