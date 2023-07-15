import { IProduct } from "../../../interfaces/Product";
import { Link } from "react-router-dom";
import './BasketItem.css'
import { Button, InputGroup, Form } from "react-bootstrap";
import Favorite from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormEvent, useContext } from "react";
import { BasketItems } from "../../../contexts/BasketItems";

interface IBasketItem {
    item: IProduct
}

export function BasketItem({ item }: IBasketItem) {
    const { basketItems, setBasketItems } = useContext(BasketItems);
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setBasketItems((prev: IProduct[]) => prev.filter(x => x.id !== item.id))
    }
    const handleChange = (e: FormEvent) => {
        e.stopPropagation();
        let itm = basketItems.find(x => x.id == item?.id);
        if (itm) {
            let itemIndex = basketItems.findIndex(x => x.id == item?.id);
            itm.count = itm.count ? itm.count + 1 : 1;
            setBasketItems((prev: IProduct[]) => {
                if (!prev[itemIndex] || itemIndex === undefined || !itm) {
                    return [...prev];
                }
                prev[itemIndex] = itm;
                return [...prev];
            });
        }
        else {
            item.count = 1;
            setBasketItems((prev: IProduct[]) => [...prev, item])
        }
    }
    return <Link to={`/products/${item.id}`} className="favorite-item-inner">
        <div className="favorite-item-logo">
            <img src={item.image} alt={item.title} />
        </div>
        <div className="favorite-item-description">
            <h6>{item.title}</h6>
            <p>$ {item.price * (item.count || 1)}</p>
            <InputGroup style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"

            }} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation()
            }}>
                <Form.Control
                    type="number"
                    min={"1"}
                    max="1500"
                    placeholder="Count"
                    defaultValue={item.count || 1}
                    aria-label="Count"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation()
                    }}
                    onInput={handleChange}
                    style={{
                        textAlign: "end",
                        maxWidth: "50%"
                    }}
                />
            </InputGroup>
        </div>
        <div className="favorite-item-button">
            <Button variant="text" onClick={handleClick}><DeleteIcon color="error" /></Button>
        </div>
    </Link>;
}