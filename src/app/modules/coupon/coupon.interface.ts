export type TCoupon ={
    CODE:string,
    offer:number,
    couponName : string;
    limit:number;
    type:'entire' | 'custom';
    product:string[]  
} 

