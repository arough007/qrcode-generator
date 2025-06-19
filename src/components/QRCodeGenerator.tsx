import React, { useCallback } from 'react';
import { useQRCode } from '../hooks/useQRCode';
import { useDebounce } from '../hooks/useDebounce';
import { useFormState } from '../hooks/useFormState';
import QRTypeSelector from './QRTypeSelector';
import TextInput from './TextInput';
import VCardForm from './VCardForm';
import ColorControls from './ColorControls';
import QRCodeDisplay from './QRCodeDisplay';
import QRSettings from './QRSettings';

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
        <div className="controls-section">
          <QRTypeSelector qrType={formState.qrType} onTypeChange={formActions.setQrType} />

          {formState.qrType === 'text' ? (
            <TextInput value={formState.textInput} onChange={formActions.setTextInput} />
          ) : (
            <VCardForm
              vcardData={formState.vcardData}
              onDataChange={formActions.updateVcardData}
            />
          )}

          <ColorControls colors={formState.colors} onColorChange={formActions.updateColors} />

          <QRSettings
            settings={formState.qrSettings}
            onSettingsChange={formActions.updateQrSettings}
            isExpanded={formState.settingsExpanded}
            onToggleExpanded={() => formActions.setSettingsExpanded(!formState.settingsExpanded)}
          />
        </div>

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
