import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {ShoppingCart} from '@mui/icons-material';
import {useContext} from 'react';
import { BasketItems } from '../../contexts/BasketItems';
import { BasketItem } from './BasketItem/BasketItem';
import './BasketMenu.css';

const BasketItemsMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {basketItems} = useContext(BasketItems);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <IconButton onClick={handleClick} color="success">
                <ShoppingCart />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {(basketItems.length && basketItems.map((x,ind)=> <BasketItem item={x} key={ind}/>)) || <div className="basket-list-empty"><h5>Basket is empty</h5></div>}
            </Menu>
        </div>
    );
}

export default BasketItemsMenu;
