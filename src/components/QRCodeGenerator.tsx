import React, { useState, useCallback } from 'react';
import {
  VCardData,
  QRType,
  ColorOptions,
  QRSettings as QRSettingsType,
} from '../types';
import { useQRCode } from '../hooks/useQRCode';
import { useDebounce } from '../hooks/useDebounce';
import QRTypeSelector from './QRTypeSelector';
import TextInput from './TextInput';
import VCardForm from './VCardForm';
import ColorControls from './ColorControls';
import QRCodeDisplay from './QRCodeDisplay';
import QRSettings from './QRSettings';

const QRCodeGenerator: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [qrType, setQrType] = useState<QRType>('text');
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  });
  const [colors, setColors] = useState<ColorOptions>({
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    transparentBackground: false,
  });
  const [qrSettings, setQrSettings] = useState<QRSettingsType>({
    errorCorrectionLevel: 'M',
    size: 300,
    margin: 1,
    quality: 0.92,
  });
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const { canvasRef, showQRCode, error, generateQRCode, downloadQRCode } =
    useQRCode();

  const handleGeneration = useCallback(() => {
    generateQRCode(qrType, textInput, vcardData, colors, qrSettings);
  }, [generateQRCode, qrType, textInput, vcardData, colors, qrSettings]);

  // Debounced effect to regenerate QR code when inputs change
  useDebounce(handleGeneration, [handleGeneration]);

  const handleVcardDataChange = useCallback(
    (field: keyof VCardData, value: string) => {
      setVcardData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleColorChange = useCallback(
    (field: keyof ColorOptions, value: string | boolean) => {
      setColors(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleQRSettingsChange = useCallback(
    (field: keyof QRSettingsType, value: string | number) => {
      setQrSettings(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div className="qr-generator">
      <h1>QR Code Generator</h1>
      <div className="content">
        <div className="controls-section">
          <QRTypeSelector qrType={qrType} onTypeChange={setQrType} />

          {qrType === 'text' ? (
            <TextInput value={textInput} onChange={setTextInput} />
          ) : (
            <VCardForm
              vcardData={vcardData}
              onDataChange={handleVcardDataChange}
            />
          )}

          <ColorControls colors={colors} onColorChange={handleColorChange} />

          <QRSettings
            settings={qrSettings}
            onSettingsChange={handleQRSettingsChange}
            isExpanded={settingsExpanded}
            onToggleExpanded={() => setSettingsExpanded(!settingsExpanded)}
          />
        </div>

        <QRCodeDisplay
          canvasRef={canvasRef}
          showQRCode={showQRCode}
          error={error}
          qrType={qrType}
          textInput={textInput}
          vcardData={vcardData}
          onDownload={downloadQRCode}
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
