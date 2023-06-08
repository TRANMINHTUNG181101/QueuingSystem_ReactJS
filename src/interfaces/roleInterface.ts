export interface RoleInterface {
  roleName: string;
  description: string;
  permissions: {
    [functionGroup: string]: string[];
  };
}