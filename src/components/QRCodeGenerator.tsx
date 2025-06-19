import React, { useCallback, useEffect } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import { useFormState } from '../hooks/useFormState';
import InputControls from './InputControls';
import SettingsControls from './SettingsControls';
import QRCodeDisplay from './QRCodeDisplay';
import { DEBOUNCE_DELAY } from '../constants';

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
    handleGeneration,
  ]);

  return (
    <div className="qr-generator">
      <div className="desktop-layout">
        <div className="controls-panel">
          <InputControls formState={formState} formActions={formActions} />
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
          
          <div className="output-settings">
            <SettingsControls formState={formState} formActions={formActions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
