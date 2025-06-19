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
      <div className="desktop-layout">
        <div className="controls-panel">
          <Controls formState={formState} formActions={formActions} />
        </div>

        <div className="output-panel">
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

          <QRControls formState={formState} formActions={formActions} />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
