export interface Register_Auth {
  id?: string;
  custID:number,
  firstName:string,
  lastName:string,
  email:string,
  mobileNumber:number| null,
  password:string
}


export interface Login_Auth {
  email:string;
  password:string;
}