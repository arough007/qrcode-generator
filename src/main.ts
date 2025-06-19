import QRCode from 'qrcode';

interface QRCodeOptions {
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  transparentBackground: boolean;
}

class QRCodeGenerator {
  private canvas: HTMLCanvasElement;
  private form: HTMLFormElement;
  private textInput: HTMLTextAreaElement;
  private foregroundColorInput: HTMLInputElement;
  private backgroundColorInput: HTMLInputElement;
  private transparentBackgroundInput: HTMLInputElement;
  private qrOutput: HTMLElement;
  private downloadBtn: HTMLButtonElement;
  private errorMessage: HTMLElement;

  constructor() {
    this.canvas = document.getElementById('qrCanvas') as HTMLCanvasElement;
    this.form = document.getElementById('qrForm') as HTMLFormElement;
    this.textInput = document.getElementById(
      'textInput'
    ) as HTMLTextAreaElement;
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

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    this.form.addEventListener('submit', e => this.handleFormSubmit(e));
    this.downloadBtn.addEventListener('click', () => this.downloadQRCode());

    // Update background color input state when transparent checkbox changes
    this.transparentBackgroundInput.addEventListener('change', () => {
      this.backgroundColorInput.disabled =
        this.transparentBackgroundInput.checked;
    });

    // Real-time preview when inputs change
    [
      this.textInput,
      this.foregroundColorInput,
      this.backgroundColorInput,
      this.transparentBackgroundInput,
    ].forEach(input => {
      input.addEventListener('input', () => this.debounceGenerate());
    });
  }

  private debounceTimer: number | null = null;

  private debounceGenerate(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      if (this.textInput.value.trim()) {
        this.generateQRCode();
      }
    }, 500);
  }

  private handleFormSubmit(e: Event): void {
    e.preventDefault();
    this.generateQRCode();
  }

  private getQRCodeOptions(): QRCodeOptions {
    return {
      text: this.textInput.value.trim(),
      foregroundColor: this.foregroundColorInput.value,
      backgroundColor: this.backgroundColorInput.value,
      transparentBackground: this.transparentBackgroundInput.checked,
    };
  }

  private async generateQRCode(): Promise<void> {
    try {
      this.hideError();

      const options = this.getQRCodeOptions();

      if (!options.text) {
        this.showError('Please enter some text to generate a QR code.');
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
      link.download = 'qrcode.png';
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
document.addEventListener('DOMContentLoaded', () => {
  new QRCodeGenerator();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
  });
} else {
  new QRCodeGenerator();
}
