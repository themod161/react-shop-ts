import {useState, useEffect, useContext} from 'react';
import { getAllProducts } from '../../controllers/products.controller';
import { IProduct } from '../../interfaces/Product';
import { Product } from '../../components/Product/Product';
import './Main.css';
import { StoreItems } from '../../contexts/StoreItems';

export function MainPage() {
    const {storeItems, setStoreItems} = useContext(StoreItems);

    useEffect(() => {
        let getProducts = async () => {
            let pr:IProduct[] = await getAllProducts();
            setStoreItems(pr);
        } 
        getProducts();
    }, [])

    return (<>
        <div className="main-page-inner">
            <div className="products-component-inner">
                {storeItems.map((product,index) => <Product product={product} key={index}/>)}
            </div>
        </div>
    </>);
}