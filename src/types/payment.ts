export type PaymentFlow = 'electronicSignature' | 'identityVerification';

export interface Participant {
  id: string;
  category: string;
  name: string;
  email: string;
}

export interface UserCreditData {
  identificacionTitular: string;
  scoreFinanciero: number;
  factoresScore: string;
  manejoCuentasCorrientes: string;
  deudaVigenteTotal: string;
  gastoFinanciero: string;
  operacionesCodeudorGarante: string;
  informacionConRUC: string;
  operacionesVigentesTarjeta: string;
  detalleTarjetaSaldoVigente: string;
  indicadoresTarjeta: string;
  detalleTarjetaCredito: string;
  operacionesVigentesBanco: string;
  estructuraOperacionBancosDetalle: string;
  operacionesVigentesCooperativa: string;
  estructuraOperacionCooperativaDetalle: string;
  operacionesVigentesEmpresa: string;
  operacionesVigentesServicio: string;
  operacionesVigentesCobranza: string;
  evolucionScoreFinanciero: string;
  semaforoMaximoDiasVencido: string;
  tendenciaDeuda: string;
  indicadoresDeuda: string;
  operacionesHistoricasTarjeta: string;
  operacionesHistoricasBanco: string;
  operacionesHistoricasCooperativa: string;
  operacionesHistoricasEmpresa: string;
  operacionesHistoricasServicio: string;
  operacionesHistoricasCobranza: string;
  relacionEmpresas: string;
  datosContacto: string;
  titularConsultado12Meses: string;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}