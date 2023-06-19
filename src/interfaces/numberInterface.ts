export interface NumberingInterface {
  idNumber: string;
  customerName: string;
  serviceName: string;
  issuanceDate: string;
  expirationDate: string;
  state: "Đã sử dụng" | "Đang chờ" | "Bỏ qua";
  source: string;
  phone: string;
  email: string;
}
