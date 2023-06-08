export interface NumberingInterface {
  customerName: string;
  serviceName: string;
  issuanceDate: Date;
  expirationDate: Date;
  status: "Active" | "Expired" | "Cancelled";
  source: string;
}