import { useRef, useCallback, useState } from 'react';
import QRCode from 'qrcode';
import {
  VCardData,
  QRType,
  ColorOptions,
  QRSettings,
  DownloadFormat,
} from '../types';
import { QR_SCALE_FACTOR, ERROR_MESSAGES } from '../constants';
import { hasVCardData, generateVCardString } from '../utils/vcard';
import { exportQRCode } from '../utils/export';

export const useQRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState('');

  const generateQRCode = useCallback(
    async (
      qrType: QRType,
      textInput: string,
      vcardData: VCardData,
      options: ColorOptions,
      qrSettings: QRSettings
    ) => {
      if (!canvasRef.current) return;

      try {
        // Clear any previous errors
        setError('');

        let text = '';
        if (qrType === 'vcard') {
          // Check if there's actual VCard data before generating
          if (!hasVCardData(vcardData)) {
            setShowQRCode(false);
            return;
          }
          text = generateVCardString(vcardData);
        } else {
          text = textInput.trim();
        }

        // Don't show error during generation, just don't generate if empty
        if (!text) {
          setShowQRCode(false);
          return;
        }

        // Prepare QR code generation options
        const scale = Math.round(qrSettings.size / QR_SCALE_FACTOR); // Calculate scale based on desired size
        const qrOptions = {
          errorCorrectionLevel: qrSettings.errorCorrectionLevel,
          type: 'image/png' as const,
          quality: qrSettings.quality,
          margin: qrSettings.margin,
          scale: scale,
          width: qrSettings.size,
          color: {
            dark: options.foregroundColor,
            light: options.transparentBackground
              ? '#00000000'
              : options.backgroundColor,
          },
        };

        // Generate QR code on canvas
        await QRCode.toCanvas(canvasRef.current, text, qrOptions);

        // Show the output
        setShowQRCode(true);
      } catch (error) {
        console.error('Error generating QR code:', error);
        // Don't show generation errors to user, just hide QR code
        setShowQRCode(false);
      }
    },
    []
  );

  const downloadQRCode = useCallback(
    async (
      qrType: QRType,
      textInput: string,
      vcardData: VCardData,
      format: DownloadFormat = 'png'
    ) => {
      // Check if there's data to download before attempting
      let hasData = false;

      if (qrType === 'vcard') {
        hasData = hasVCardData(vcardData);
      } else {
        hasData = textInput.trim() !== '';
      }

      if (!hasData) {
        const errorMessage =
          qrType === 'vcard'
            ? ERROR_MESSAGES.NO_VCARD_DATA
            : ERROR_MESSAGES.NO_TEXT_DATA;
        setError(errorMessage);
        return;
      }

      if (!canvasRef.current || !showQRCode) {
        setError(ERROR_MESSAGES.NO_QR_CODE);
        return;
      }

      try {
        // Clear any previous errors
        setError('');

        const baseFilename = qrType === 'vcard' ? 'contact-qrcode' : 'qrcode';
        await exportQRCode(canvasRef.current, format, baseFilename);
      } catch (error) {
        console.error('Error downloading QR code:', error);
        setError(ERROR_MESSAGES.DOWNLOAD_FAILED);
      }
    },
    [showQRCode]
  );

  return {
    canvasRef,
    showQRCode,
    error,
    generateQRCode,
    downloadQRCode,
    setShowQRCode,
  };
};
