import { pdf } from '@react-pdf/renderer';
import { CreditReportPDF } from '../components/pdf/credit_report_pdf';
import type { UserCreditData } from '../types/payment';

export const generateCreditReportPDF = async (userData: UserCreditData): Promise<void> => {
  try {
    // Generar el PDF como blob
    const blob = await pdf(<CreditReportPDF userData={userData} />).toBlob();
    
    // Crear URL para descargar
    const url = URL.createObjectURL(blob);
    
    // Crear elemento anchor para descargar
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit_report_${userData.identificacionTitular}.pdf`;
    
    // Trigger descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpiar URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF', { cause: error });
  }
};

// Versión para descarga múltiple o uso en worker
export const generateCreditReportPDFBlob = async (userData: UserCreditData): Promise<Blob> => {
  return await pdf(<CreditReportPDF userData={userData} />).toBlob();
};

// Versión para previsualización (abrir en nueva pestaña)
export const previewCreditReportPDF = async (userData: UserCreditData): Promise<void> => {
  const blob = await generateCreditReportPDFBlob(userData);
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  URL.revokeObjectURL(url);
};
