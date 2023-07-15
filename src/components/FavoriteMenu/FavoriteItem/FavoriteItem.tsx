import { IProduct } from "../../../interfaces/Product";
import { Link } from "react-router-dom";
import './FavoriteItem.css'
import { Button } from "react-bootstrap";
import Favorite from "@mui/icons-material/Favorite";

interface IFavoriteItem {
    item: IProduct,
    setFavoriteItems: Function
}

export function FavoriteItem({item, setFavoriteItems}: IFavoriteItem) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setFavoriteItems((prev:IProduct[])=> prev.filter(x=> x.id !== item.id))
    }
    return <Link to={`/products/${item.id}`} className="favorite-item-inner">
        <div className="favorite-item-logo">
            <img src={item.image} alt={item.title}/>
        </div>
        <div className="favorite-item-description">
            <h6>{item.title}</h6>
            <p>$ {item.price}</p>
        </div>
        <div className="favorite-item-button">
            <Button variant="text" onClick={handleClick}><Favorite color="error"/></Button>
        </div>
    </Link>;
}