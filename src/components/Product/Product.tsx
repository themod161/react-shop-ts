import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/Product"
import { Stars } from "../Stars/Stars";
import './Product.css';
import { Button } from "@mui/material";
import { useContext } from 'react';
import { FavoriteItems } from "../../contexts/FavoriteItems";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { BasketItems } from "../../contexts/BasketItems";
interface ProductsProps {
    product: IProduct
}


export function Product({ product }: ProductsProps) {
    const {favoriteItems, setFavoriteItems} = useContext(FavoriteItems);
    const {basketItems, setBasketItems} = useContext(BasketItems);
    const handleFavoriteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        let item = favoriteItems.find(x=> x.id == product?.id);
        if(item) setFavoriteItems((prev: IProduct[])=> prev.filter((x:IProduct)=> x.id !== product?.id));
        else setFavoriteItems((prev: IProduct[])=> [...prev, product]);
    }
    const handleBuyClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        let item = basketItems.find(x=> x.id == product?.id);
        if(item) {
            let itemIndex = basketItems.findIndex(x=> x.id == product?.id);
            item.count = item.count ? item.count+1 : 1;
            setBasketItems((prev: IProduct[]) => {
                if (!prev[itemIndex] || itemIndex === undefined || !item) {
                  return prev;
                }
                prev[itemIndex] = item;
                return prev;
            });
        }
        else {
            product.count = 1;
            
            setBasketItems((prev:IProduct[]) => [...prev, product])
        }
    }
    return <Link to={`/products/${product.id}`} className="product-inner">
        <div className="products-buttons product-favorite-button">
            <Button color="primary" variant="text" onClick={handleFavoriteClick}><Favorite color={favoriteItems.find(x=> x.id == product?.id) ? "error" : "action"}/></Button>
            <Button color="primary" variant="text" onClick={handleBuyClick}><ShoppingCart color="success"/></Button>
        </div>
        
        <div className="product-header">
            <img src={product.image} alt={product.title} />
        </div>
        <div className="product-body">
            <span>{product.title}</span>
        </div>
        <div className="product-footer">
            <Stars rate={product.rating?.rate} count={product.rating?.count} />
            <div className="product-price"><span>$ {product.price}</span></div>
        </div>
    </Link>
}