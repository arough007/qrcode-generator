import React, { useState, useRef, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

const QRCodeGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<'text' | 'vcard'>('text');
  const [textInput, setTextInput] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [transparentBackground, setTransparentBackground] = useState(false);
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
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const hasVCardContent = (): boolean => {
    return !!(
      vcardData.firstName.trim() ||
      vcardData.lastName.trim() ||
      vcardData.email.trim() ||
      vcardData.phone.trim()
    );
  };

  const generateQRCode = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      setError('');

      let text = '';
      if (qrType === 'vcard') {
        text = generateVCardString(vcardData);
      } else {
        text = textInput.trim();
      }

      if (!text) {
        const errorMessage =
          qrType === 'vcard'
            ? 'Please fill in at least one contact field to generate a vCard QR code.'
            : 'Please enter some text to generate a QR code.';
        setError(errorMessage);
        setShowQRCode(false);
        return;
      }

      // Prepare QR code generation options
      const qrOptions = {
        errorCorrectionLevel: 'M' as const,
        type: 'image/png' as const,
        quality: 0.92,
        margin: 1,
        scale: 8,
        width: 300,
        color: {
          dark: foregroundColor,
          light: transparentBackground ? '#00000000' : backgroundColor,
        },
      };

      // Generate QR code on canvas
      await QRCode.toCanvas(canvasRef.current, text, qrOptions);

      // Show the output
      setShowQRCode(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setError('Failed to generate QR code. Please try again.');
      setShowQRCode(false);
    }
  }, [
    qrType,
    textInput,
    vcardData,
    foregroundColor,
    backgroundColor,
    transparentBackground,
  ]);

  // Debounced QR code generation
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasContent =
        qrType === 'vcard' ? hasVCardContent() : textInput.trim();

      if (hasContent) {
        generateQRCode();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    generateQRCode,
    qrType,
    textInput,
    vcardData,
    foregroundColor,
    backgroundColor,
    transparentBackground,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQRCode();
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    try {
      const link = document.createElement('a');
      const filename = qrType === 'vcard' ? 'contact-qrcode.png' : 'qrcode.png';

      link.download = filename;
      link.href = canvasRef.current.toDataURL();

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      setError('Failed to download QR code. Please try again.');
    }
  };

  const updateVCardData = (field: keyof VCardData, value: string) => {
    setVcardData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="qrType">QR Code Type:</label>
        <select
          id="qrType"
          value={qrType}
          onChange={e => {
            setQrType(e.target.value as 'text' | 'vcard');
            setShowQRCode(false);
          }}
        >
          <option value="text">Text/URL</option>
          <option value="vcard">Contact Card (vCard)</option>
        </select>
      </div>

      {qrType === 'text' && (
        <div className="form-group">
          <label htmlFor="textInput">Text or URL to encode:</label>
          <textarea
            id="textInput"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder="Enter text, URL, or any data you want to encode..."
          />
        </div>
      )}

      {qrType === 'vcard' && (
        <div className="form-group">
          <div className="vcard-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={vcardData.firstName}
                onChange={e => updateVCardData('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={vcardData.lastName}
                onChange={e => updateVCardData('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization:</label>
              <input
                type="text"
                id="organization"
                value={vcardData.organization}
                onChange={e => updateVCardData('organization', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Job Title:</label>
              <input
                type="text"
                id="title"
                value={vcardData.title}
                onChange={e => updateVCardData('title', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={vcardData.phone}
                onChange={e => updateVCardData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={vcardData.email}
                onChange={e => updateVCardData('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website:</label>
              <input
                type="url"
                id="website"
                value={vcardData.website}
                onChange={e => updateVCardData('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                value={vcardData.address}
                onChange={e => updateVCardData('address', e.target.value)}
                placeholder="123 Main St, City, State 12345"
                rows={2}
              />
            </div>
          </div>
        </div>
      )}

      <div className="color-controls">
        <div className="color-group">
          <label htmlFor="foregroundColor">QR Code Color:</label>
          <input
            type="color"
            id="foregroundColor"
            value={foregroundColor}
            onChange={e => setForegroundColor(e.target.value)}
          />
        </div>
        <div className="color-group">
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={e => setBackgroundColor(e.target.value)}
            disabled={transparentBackground}
          />
        </div>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="transparentBackground"
          checked={transparentBackground}
          onChange={e => setTransparentBackground(e.target.checked)}
        />
        <label htmlFor="transparentBackground">
          Use transparent background
        </label>
      </div>

      <button type="submit" className="generate-btn">
        Generate QR Code
      </button>

      {showQRCode && (
        <div className="qr-output">
          <canvas ref={canvasRef} className="qr-canvas" />
          <br />
          <button
            type="button"
            onClick={downloadQRCode}
            className="download-btn"
          >
            Download QR Code
          </button>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default QRCodeGenerator;
