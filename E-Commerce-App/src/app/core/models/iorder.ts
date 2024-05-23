import { Iproduct } from "./iproduct";

export interface Iorder {
    city:string,
    email:string,
    pinCode:string,
    firstAddress:string,
    secondAddress:string,
    landMark:string,
    paymentNaration:string,
    cart:Iproduct[],
    totalPrice:number | null,
    totalItems:number | null

}
