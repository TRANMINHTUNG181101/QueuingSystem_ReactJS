export interface RoleInterface {
  idRole : String;
  roleName: string;
  description: string;
  permissions: {
    [functionGroup: string]: string[];
  };
}