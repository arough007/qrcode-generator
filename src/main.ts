import QRCode from 'qrcode';

interface QRCodeOptions {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
}

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

class QRCodeGenerator {
  private canvas: HTMLCanvasElement;
  private form: HTMLFormElement;
  private qrTypeSelect: HTMLSelectElement;
  private textInput: HTMLTextAreaElement;
  private textSection: HTMLElement;
  private vcardSection: HTMLElement;
  private foregroundColorInput: HTMLInputElement;
  private backgroundColorInput: HTMLInputElement;
  private transparentBackgroundInput: HTMLInputElement;
  private qrOutput: HTMLElement;
  private downloadBtn: HTMLButtonElement;
  private errorMessage: HTMLElement;

  // vCard form elements
  private firstNameInput: HTMLInputElement;
  private lastNameInput: HTMLInputElement;
  private organizationInput: HTMLInputElement;
  private titleInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private websiteInput: HTMLInputElement;
  private addressInput: HTMLTextAreaElement;

  constructor() {
    this.canvas = document.getElementById('qrCanvas') as HTMLCanvasElement;
    this.form = document.getElementById('qrForm') as HTMLFormElement;
    this.qrTypeSelect = document.getElementById('qrType') as HTMLSelectElement;
    this.textInput = document.getElementById(
      'textInput'
    ) as HTMLTextAreaElement;
    this.textSection = document.getElementById('textSection') as HTMLElement;
    this.vcardSection = document.getElementById('vcardSection') as HTMLElement;
    this.foregroundColorInput = document.getElementById(
      'foregroundColor'
    ) as HTMLInputElement;
    this.backgroundColorInput = document.getElementById(
      'backgroundColor'
    ) as HTMLInputElement;
    this.transparentBackgroundInput = document.getElementById(
      'transparentBackground'
    ) as HTMLInputElement;
    this.qrOutput = document.getElementById('qrOutput') as HTMLElement;
    this.downloadBtn = document.getElementById(
      'downloadBtn'
    ) as HTMLButtonElement;
    this.errorMessage = document.getElementById('errorMessage') as HTMLElement;

    // Initialize vCard form elements
    this.firstNameInput = document.getElementById(
      'firstName'
    ) as HTMLInputElement;
    this.lastNameInput = document.getElementById(
      'lastName'
    ) as HTMLInputElement;
    this.organizationInput = document.getElementById(
      'organization'
    ) as HTMLInputElement;
    this.titleInput = document.getElementById('title') as HTMLInputElement;
    this.phoneInput = document.getElementById('phone') as HTMLInputElement;
    this.emailInput = document.getElementById('email') as HTMLInputElement;
    this.websiteInput = document.getElementById('website') as HTMLInputElement;
    this.addressInput = document.getElementById(
      'address'
    ) as HTMLTextAreaElement;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.form.addEventListener('submit', e => this.handleFormSubmit(e));
    this.downloadBtn.addEventListener('click', () => this.downloadQRCode());

    // Handle QR type selection change
    this.qrTypeSelect.addEventListener('change', () =>
      this.handleQRTypeChange()
    );

    // Update background color input state when transparent checkbox changes
    this.transparentBackgroundInput.addEventListener('change', () => {
      this.backgroundColorInput.disabled =
        this.transparentBackgroundInput.checked;
    });

    // Real-time preview when inputs change
    const allInputs = [
      this.textInput,
      this.foregroundColorInput,
      this.backgroundColorInput,
      this.transparentBackgroundInput,
      this.firstNameInput,
      this.lastNameInput,
      this.organizationInput,
      this.titleInput,
      this.phoneInput,
      this.emailInput,
      this.websiteInput,
      this.addressInput,
    ];

    allInputs.forEach(input => {
      input.addEventListener('input', () => this.debounceGenerate());
    });
  }

  private debounceTimer: number | null = null;

  private handleQRTypeChange(): void {
    const selectedType = this.qrTypeSelect.value;

    if (selectedType === 'vcard') {
      this.textSection.style.display = 'none';
      this.vcardSection.style.display = 'block';
    } else {
      this.textSection.style.display = 'block';
      this.vcardSection.style.display = 'none';
    }

    // Clear existing QR code when switching types
    this.qrOutput.style.display = 'none';
  }

  private debounceGenerate(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      const currentType = this.qrTypeSelect.value;
      const hasContent =
        currentType === 'vcard'
          ? this.hasVCardContent()
          : this.textInput.value.trim();

      if (hasContent) {
        this.generateQRCode();
      }
    }, 500);
  }

  private hasVCardContent(): boolean {
    return !!(
      this.firstNameInput.value.trim() ||
      this.lastNameInput.value.trim() ||
      this.emailInput.value.trim() ||
      this.phoneInput.value.trim()
    );
  }

  private getVCardData(): VCardData {
    return {
      firstName: this.firstNameInput.value.trim(),
      lastName: this.lastNameInput.value.trim(),
      organization: this.organizationInput.value.trim(),
      title: this.titleInput.value.trim(),
      phone: this.phoneInput.value.trim(),
      email: this.emailInput.value.trim(),
      website: this.websiteInput.value.trim(),
      address: this.addressInput.value.trim(),
    };
  }

  private generateVCardString(data: VCardData): string {
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
  }

  private handleFormSubmit(e: Event): void {
    e.preventDefault();
    this.generateQRCode();
  }

  private getQRCodeOptions(): QRCodeOptions {
    const currentType = this.qrTypeSelect.value;
    let text = '';

    if (currentType === 'vcard') {
      const vcardData = this.getVCardData();
      text = this.generateVCardString(vcardData);
    } else {
      text = this.textInput.value.trim();
    }

    return {
      text,
      foregroundColor: this.foregroundColorInput.value,
      backgroundColor: this.backgroundColorInput.value,
      transparentBackground: this.transparentBackgroundInput.checked,
    };
  }

  private async generateQRCode(): Promise<void> {
    try {
      this.hideError();

      const options = this.getQRCodeOptions();
      const currentType = this.qrTypeSelect.value;

      if (!options.text) {
        const errorMessage =
          currentType === 'vcard'
            ? 'Please fill in at least one contact field to generate a vCard QR code.'
            : 'Please enter some text to generate a QR code.';
        this.showError(errorMessage);
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
          dark: options.foregroundColor,
          light: options.transparentBackground
            ? '#00000000'
            : options.backgroundColor,
        },
      };

      // Generate QR code on canvas
      await QRCode.toCanvas(this.canvas, options.text, qrOptions);

      // Show the output
      this.qrOutput.style.display = 'block';
    } catch (error) {
      console.error('Error generating QR code:', error);
      this.showError('Failed to generate QR code. Please try again.');
    }
  }

  private downloadQRCode(): void {
    try {
      // Create download link
      const link = document.createElement('a');
      const currentType = this.qrTypeSelect.value;
      const filename =
        currentType === 'vcard' ? 'contact-qrcode.png' : 'qrcode.png';

      link.download = filename;
      link.href = this.canvas.toDataURL();

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      this.showError('Failed to download QR code. Please try again.');
    }
  }

  private showError(message: string): void {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
    this.qrOutput.style.display = 'none';
  }

  private hideError(): void {
    this.errorMessage.style.display = 'none';
  }
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
  });
} else {
  new QRCodeGenerator();
}
