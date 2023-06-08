export interface ServiceInterface {
  serviceId: string;
  serviceName: string;
  description: string;
  numberingRule: "Increase" | "Decrease" | "Prefix";
  prefix?: string;
  startNumber?: number;
  endNumber?: number;
}