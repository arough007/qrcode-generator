import jsPDF from 'jspdf';
import { DownloadFormat } from '../types';



/**
 * Download QR code canvas as different file formats
 */
export const exportQRCode = async (
  canvas: HTMLCanvasElement,
  format: DownloadFormat,
  filename: string
): Promise<void> => {
  const baseFilename = filename.replace(/\.[^/.]+$/, ''); // Remove existing extension
  
  switch (format) {
    case 'png':
      downloadCanvasAsImage(canvas, `${baseFilename}.png`, 'image/png');
      break;
    
    case 'jpg':
    case 'jpeg':
      downloadCanvasAsImage(canvas, `${baseFilename}.jpg`, 'image/jpeg', 0.9);
      break;
    
    case 'svg':
      await downloadCanvasAsSVG(canvas, `${baseFilename}.svg`);
      break;
    
    case 'pdf':
      downloadCanvasAsPDF(canvas, `${baseFilename}.pdf`);
      break;
    
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

/**
 * Download canvas as image file (PNG/JPEG)
 */
const downloadCanvasAsImage = (
  canvas: HTMLCanvasElement,
  filename: string,
  mimeType: string,
  quality: number = 1.0
): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(mimeType, quality);
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Download canvas as PDF using jsPDF
 */
const downloadCanvasAsPDF = (canvas: HTMLCanvasElement, filename: string): void => {
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Calculate dimensions to center the QR code on A4 page
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  // Size the QR code to be about 1/3 of the page width
  const qrSize = Math.min(pdfWidth, pdfHeight) * 0.6;
  const x = (pdfWidth - qrSize) / 2;
  const y = (pdfHeight - qrSize) / 2;

  pdf.addImage(imgData, 'PNG', x, y, qrSize, qrSize);
  pdf.save(filename);
};

/**
 * Download canvas as SVG with embedded PNG data
 */
const downloadCanvasAsSVG = async (canvas: HTMLCanvasElement, filename: string): Promise<void> => {
  try {
    // Convert canvas to base64 PNG data
    const dataURL = canvas.toDataURL('image/png');
    
    // Create SVG with embedded image
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image x="0" y="0" width="${canvas.width}" height="${canvas.height}" xlink:href="${dataURL}"/>
</svg>`;

    // Create and download the SVG file
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error exporting as SVG:', error);
    // Fallback to PNG if SVG export fails
    downloadCanvasAsImage(canvas, filename.replace('.svg', '.png'), 'image/png');
  }
};



/**
 * Get file extension for a given format
 */
export const getFileExtension = (format: DownloadFormat): string => {
  switch (format) {
    case 'png': return '.png';
    case 'jpg':
    case 'jpeg': return '.jpg';
    case 'svg': return '.svg';
    case 'pdf': return '.pdf';
    default: return '.png';
  }
};

/**
 * Get MIME type for a given format
 */
export const getMimeType = (format: DownloadFormat): string => {
  switch (format) {
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'svg': return 'image/svg+xml';
    case 'pdf': return 'application/pdf';
    default: return 'image/png';
  }
}; 