export type Product = {
   id:number,
   name:string,
   price: number,
   quantity:number
}

export type Response<T> = {
  data:T,
  status:number
}

const API_URL = "http://localhost:8080";

export const getProductsService = async (): Promise<Array<Product>> => {
  const response = await fetch(API_URL + `/api/product`)
  return  await response.json(); 
};

export const saveProductService = async (obj:Object): Promise<Product> => {
   
   const config = { body: JSON.stringify(obj), method:'POST', headers:{ 'Content-Type': 'application/json'}}
   const response = await fetch(API_URL + `/api/product/save`, config)
   return await response.json();
 };

 export const updateProductService = async (obj:Object): Promise<void> => {
   
   const config = { body: JSON.stringify(obj), method:'PUT', headers:{ 'Content-Type': 'application/json'}}
   await fetch(API_URL + `/api/product/update`, config)
   
 };

 export const deleteProductService = async (id:number): Promise<void> => {
   
   const config = { method:'DELETE', headers:{ 'Content-Type': 'application/json'}}
   await fetch(API_URL + `/api/product/delete/${id}`, config);
     
 };

 export const getProductService = async (id:string): Promise<Product> => {
   const response = await fetch(API_URL + `/api/product/get/${id}`)
   return response.json();
       
 };