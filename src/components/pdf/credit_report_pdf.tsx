import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
} from '@react-pdf/renderer';
import type { UserCreditData } from '../../types/payment';

// Registrar fuentes (opcional, para mejor apariencia)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
    padding: 5,
  },
  card: {
    border: 1,
    borderColor: '#E5E7EB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingVertical: 2,
  },
  label: {
    width: '35%',
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  value: {
    width: '65%',
    fontSize: 9,
    color: '#1F2937',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  footer: {
    marginTop: 30,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
});

interface CreditReportPDFProps {
  userData: UserCreditData;
}

// Helper component for info rows
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export const CreditReportPDF: React.FC<CreditReportPDFProps> = ({ userData }) => {
  const getScoreColor = (score: number) => {
    if (score >= 700) return '#10B981';
    if (score >= 600) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CREDIT REPORT</Text>
          <Text style={styles.subtitle}>Financial Credit Analysis Report</Text>
          <Text style={[styles.subtitle, { fontSize: 8, marginTop: 5 }]}>
            Generated: {new Date().toLocaleString()}
          </Text>
        </View>

        {/* Credit Score Section */}
        <View style={[styles.scoreContainer, { backgroundColor: `${getScoreColor(userData.scoreFinanciero)}10` }]}>
          <View>
            <Text style={styles.scoreLabel}>Credit Score</Text>
            <Text style={[styles.scoreValue, { color: getScoreColor(userData.scoreFinanciero) }]}>
              {userData.scoreFinanciero}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.scoreLabel}>Score Evolution</Text>
            <Text style={[styles.scoreLabel, { fontSize: 9, color: '#6B7280' }]}>
              {userData.evolucionScoreFinanciero}
            </Text>
          </View>
        </View>

        {/* 1. User Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. USER INFORMATION</Text>
          <View style={styles.card}>
            <InfoRow label="Identification" value={userData.identificacionTitular} />
            <InfoRow label="Score Factors" value={userData.factoresScore} />
            <InfoRow label="Credit Score Evolution" value={userData.evolucionScoreFinanciero} />
          </View>
        </View>

        {/* 2. Credit Score Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. CREDIT SCORE ANALYSIS</Text>
          <View style={styles.card}>
            <InfoRow label="Traffic Light" value={userData.semaforoMaximoDiasVencido} />
            <InfoRow label="Debt Trend" value={userData.tendenciaDeuda} />
            <InfoRow label="Debt Indicators" value={userData.indicadoresDeuda} />
          </View>
        </View>

        {/* 3. Financial Indicators */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. FINANCIAL INDICATORS</Text>
          <View style={styles.card}>
            <InfoRow label="Current Account Management" value={userData.manejoCuentasCorrientes} />
            <InfoRow label="Total Outstanding Debt" value={userData.deudaVigenteTotal} />
            <InfoRow label="Financial Expense" value={userData.gastoFinanciero} />
            <InfoRow label="Co-debtor/Guarantor Operations" value={userData.operacionesCodeudorGarante} />
            <InfoRow label="Information with RUC" value={userData.informacionConRUC} />
          </View>
        </View>

        {/* 4. Debt Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. DEBT INFORMATION</Text>
          <View style={styles.card}>
            <InfoRow label="Active Card Operations" value={userData.operacionesVigentesTarjeta} />
            <InfoRow label="Card Outstanding Balance" value={userData.detalleTarjetaSaldoVigente} />
            <InfoRow label="Card Indicators" value={userData.indicadoresTarjeta} />
            <InfoRow label="Card Credit Details" value={userData.detalleTarjetaCredito} />
          </View>
        </View>

        {/* Two columns layout for remaining sections */}
        <View style={styles.twoColumns}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* 5. Credit Card Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5. CREDIT CARDS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Cards" value={userData.operacionesVigentesTarjeta} />
                <InfoRow label="Outstanding Balance" value={userData.detalleTarjetaSaldoVigente} />
                <InfoRow label="Indicators" value={userData.indicadoresTarjeta} />
                <InfoRow label="Credit Details" value={userData.detalleTarjetaCredito} />
              </View>
            </View>

            {/* 6. Bank Operations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>6. BANK OPERATIONS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Operations" value={userData.operacionesVigentesBanco} />
                <InfoRow label="Details" value={userData.estructuraOperacionBancosDetalle} />
              </View>
            </View>

            {/* 7. Cooperative Operations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>7. COOPERATIVE OPERATIONS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Operations" value={userData.operacionesVigentesCooperativa} />
                <InfoRow label="Details" value={userData.estructuraOperacionCooperativaDetalle} />
              </View>
            </View>

            {/* 8. Company Operations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>8. COMPANY OPERATIONS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Operations" value={userData.operacionesVigentesEmpresa} />
                <InfoRow label="Relationships" value={userData.relacionEmpresas} />
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.column}>
            {/* 9. Service Operations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>9. SERVICE OPERATIONS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Operations" value={userData.operacionesVigentesServicio} />
              </View>
            </View>

            {/* 10. Collection Operations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>10. COLLECTION OPERATIONS</Text>
              <View style={styles.card}>
                <InfoRow label="Active Operations" value={userData.operacionesVigentesCobranza} />
              </View>
            </View>

            {/* 11. Historical Data */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>11. HISTORICAL DATA</Text>
              <View style={styles.card}>
                <InfoRow label="Card Operations" value={userData.operacionesHistoricasTarjeta} />
                <InfoRow label="Bank Operations" value={userData.operacionesHistoricasBanco} />
                <InfoRow label="Cooperative Operations" value={userData.operacionesHistoricasCooperativa} />
                <InfoRow label="Company Operations" value={userData.operacionesHistoricasEmpresa} />
                <InfoRow label="Service Operations" value={userData.operacionesHistoricasServicio} />
                <InfoRow label="Collection Operations" value={userData.operacionesHistoricasCobranza} />
                <InfoRow label="Consulted in last 12 months" value={userData.titularConsultado12Meses} />
              </View>
            </View>

            {/* 12. Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>12. CONTACT INFORMATION</Text>
              <View style={styles.card}>
                <InfoRow label="Contact Details" value={userData.datosContacto} />
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Report generated on {new Date().toLocaleString()}
          </Text>
          <Text style={styles.footerText}>
            This is an automated credit report. Please verify all information.
          </Text>
          <Text style={[styles.footerText, { marginTop: 5 }]}>
            © {new Date().getFullYear()} Credit Report System - Confidential Document
          </Text>
        </View>
      </Page>
    </Document>
  );
};