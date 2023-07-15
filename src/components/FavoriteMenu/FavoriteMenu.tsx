import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useContext} from 'react';
import { FavoriteItems } from '../../contexts/FavoriteItems';
import { FavoriteItem } from './FavoriteItem/FavoriteItem';
import './FavoriteMenu.css';

const FavoriteItemsMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {favoriteItems, setFavoriteItems} = useContext(FavoriteItems);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <div>
            <IconButton onClick={handleClick} color="error">
                <FavoriteIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {(favoriteItems.length && favoriteItems.map((x,ind)=> <FavoriteItem item={x} setFavoriteItems={setFavoriteItems} key={ind}/>)) || <div className="favorite-list-empty"><h5>Favorite list is empty</h5></div>}
            </Menu>
        </div>
    );
}

export default FavoriteItemsMenu;
