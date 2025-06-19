import { useRef, useCallback, useState } from 'react';
import QRCode from 'qrcode';
import { VCardData, QRType, ColorOptions, QRSettings } from '../types';

export const useQRCode = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState('');

  const generateVCardString = (data: VCardData): string => {
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';

    // Full name
    if (data.firstName || data.lastName) {
      vcard += `FN:${data.firstName} ${data.lastName}`.trim() + '\n';
      vcard += `N:${data.lastName};${data.firstName};;;\n`;
    }

    // Organization and title
    if (data.organization) {
      vcard += `ORG:${data.organization}\n`;
    }
    if (data.title) {
      vcard += `TITLE:${data.title}\n`;
    }

    // Contact info
    if (data.phone) {
      vcard += `TEL:${data.phone}\n`;
    }
    if (data.email) {
      vcard += `EMAIL:${data.email}\n`;
    }
    if (data.website) {
      vcard += `URL:${data.website}\n`;
    }

    // Address
    if (data.address) {
      vcard += `ADR:;;${data.address};;;;\n`;
    }

    vcard += 'END:VCARD';
    return vcard;
  };

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
        const scale = Math.round(qrSettings.size / 37.5); // Calculate scale based on desired size
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
    (qrType: QRType, textInput: string, vcardData: VCardData) => {
      // Check if there's data to download before attempting
      let hasData = false;

      if (qrType === 'vcard') {
        hasData = Object.values(vcardData).some(value => value.trim() !== '');
      } else {
        hasData = textInput.trim() !== '';
      }

      if (!hasData) {
        const errorMessage =
          qrType === 'vcard'
            ? 'Please fill in at least one contact field before downloading.'
            : 'Please enter some text before downloading.';
        setError(errorMessage);
        return;
      }

      if (!canvasRef.current || !showQRCode) {
        setError(
          'No QR code available to download. Please generate a QR code first.'
        );
        return;
      }

      try {
        // Clear any previous errors
        setError('');

        const link = document.createElement('a');
        const filename =
          qrType === 'vcard' ? 'contact-qrcode.png' : 'qrcode.png';

        link.download = filename;
        link.href = canvasRef.current.toDataURL();

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading QR code:', error);
        setError('Failed to download QR code. Please try again.');
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
