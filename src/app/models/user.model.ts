export interface User {
  id: string;
  email: string;
  password: string;
  name:string;

}

export interface CreteUserDTO extends Omit<User,'id'> {

}
