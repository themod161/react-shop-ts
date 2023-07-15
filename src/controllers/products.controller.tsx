import { IProduct } from "../interfaces/Product";

export function getAllProducts():Promise<IProduct[]> {
    return new Promise((resolve,reject) => {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}
export function getProductById(id:number):Promise<IProduct> {
    return new Promise((resolve,reject) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}
export function getProductsWithLimit(limit:number = 5):Promise<IProduct[]> {
    return new Promise((resolve,reject) => {
        fetch(`'https://fakestoreapi.com/products?limit=${limit}`)
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}
export function getProductWithSort(sort:string = 'desc' || 'asc'):Promise<IProduct[]> {
    return new Promise((resolve,reject) => {
        fetch(`https://fakestoreapi.com/products?sort=${sort}`)
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}

export function getAllCategories():Promise<string[]> {
    return new Promise((resolve,reject) => {
        fetch(`https://fakestoreapi.com/products/categories`)
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}
export function getProductsByCategory(category:string):Promise<IProduct[]> {
    return new Promise((resolve,reject) => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res=>res.json())
            .then(json=>resolve(json)).catch(reject);
    });
}
export function addNewProduct(product:IProduct) {
    return new Promise((resolve,reject) => {
        fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(product)
        })
            .then(res=>res.json())
            .then(json=>resolve(json))
            .catch(reject);
    });
}