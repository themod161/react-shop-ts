import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { getProductById } from "../../controllers/products.controller";
import { IProduct } from "../../interfaces/Product";
import './Product.css';
import { Stars } from "../../components/Stars/Stars";
import {Button} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteItems } from "../../contexts/FavoriteItems";
import { ShoppingCart } from "@mui/icons-material";
import { BasketItems } from "../../contexts/BasketItems";
export function ProductPage() {
    const {id} = useParams();
    const {favoriteItems, setFavoriteItems} = useContext(FavoriteItems);
    const {basketItems, setBasketItems} = useContext(BasketItems);
    const [product, setProduct] = useState<IProduct>();

    useEffect(()=> {
        const getProduct = async () => {
            let prod = await getProductById(+(id || 1));
            setProduct(prod);
        }
        getProduct();
    }, [id])
    const handleFavoriteClick = () => {
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
            if(!product) return;
            product.count = 1;
            setBasketItems((prev:IProduct[]) => [...prev, product])
        }
    }
    return <>
        <Link to='/'><Button variant="outlined" style={{margin: '10px', display: 'flex'}}><KeyboardBackspaceIcon/> Back</Button></Link>
        <div className="product-page-inner">
            <div className="product-page-left-side">
                <img src={product?.image} alt={product?.title} />
            </div>
            <div className="product-page-right-side">
                <h1>{product?.title}</h1>
                <div className="product-page-category"><p>Category:</p> <p>{product?.category}</p></div>
                <div className="product-page-category"><p>Description:</p> <p style={{maxWidth: 'calc(100% - 200px)',textAlign: 'center'}}>{product?.description}</p></div>
                <div className="product-page-rating">
                    <p>Rating:</p>
                    <Stars rate={product?.rating?.rate} count={product?.rating?.count} />
                </div>
                <div className="product-page-price">
                    $ {product?.price}
                </div>
                <div className="product-page-buttons">
                    <Button color="success" variant="contained" onClick={handleBuyClick}><ShoppingCartIcon/> Buy now</Button>
                    <Button color="primary" variant="text" onClick={handleFavoriteClick}><FavoriteIcon color={favoriteItems.find(x=> x.id == product?.id) ? "error" : "action"}/></Button>
                </div>
            </div>
        </div>
    </>
}