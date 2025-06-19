import React, { useCallback } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import { useDebounce } from '../hooks/useDebounce';
import { useFormState } from '../hooks/useFormState';
import QRControls from './QRControls';
import QRCodeDisplay from './QRCodeDisplay';

const QRCodeGenerator: React.FC = () => {
  const [formState, formActions] = useFormState();

  const { canvasRef, showQRCode, error, generateQRCode, downloadQRCode } =
    useQRCode();

  const handleGeneration = useCallback(() => {
    generateQRCode(
      formState.qrType,
      formState.textInput,
      formState.vcardData,
      formState.colors,
      formState.qrSettings
    );
  }, [
    generateQRCode,
    formState.qrType,
    formState.textInput,
    formState.vcardData,
    formState.colors,
    formState.qrSettings,
  ]);

  // Debounced effect to regenerate QR code when inputs change
  useDebounce(handleGeneration, [handleGeneration]);

  return (
    <div className="qr-generator">
      <h1>QR Code Generator</h1>
      <div className="content">
        <QRControls formState={formState} formActions={formActions} />

        <QRCodeDisplay
          canvasRef={canvasRef}
          showQRCode={showQRCode}
          error={error}
          qrType={formState.qrType}
          textInput={formState.textInput}
          vcardData={formState.vcardData}
          onDownload={downloadQRCode}
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
