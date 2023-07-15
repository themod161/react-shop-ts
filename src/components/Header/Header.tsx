import './Header.css';
import Logo from '../../assets/img/logo.png';
import { useEffect, useState } from 'react';
import {InputGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllCategories } from '../../controllers/products.controller';
import { Category } from '../Category/Category';
import FavoriteItemsMenu from '../FavoriteMenu/FavoriteMenu';
import BasketItemsMenu from '../Basket/BasketMenu';


export function Header() {
    const [categories, setCategories] = useState<string[]>([]);
    const [leftCategories, setLeftCategories] = useState<string[]>([]);
    const [rightCategories, setRightCategories] = useState<string[]>([]);
    const [isSticky, setIsSticky] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsSticky(scrollTop > 1);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(()=> {
        const getCategories = async () => {
            let categories_data = await getAllCategories();
            setCategories(categories_data);
        }
        getCategories();
    }, [])
    useEffect(()=> {
        let categories_list:Array<string> = ['all', ...JSON.parse(JSON.stringify(categories))];
        setLeftCategories(categories_list.slice(0, Math.ceil(categories_list.length/2)));
        setRightCategories(categories_list.slice(Math.ceil(categories_list.length/2),categories_list.length ))
        
    }, [categories])
    return <>
        <div className={`header-inner${isSticky ? ' sticky' : ''}`}>
            <div className="header-left-side">
                <div className="header-left-logo">
                    <img src={Logo} alt="logo"></img>
                    
                </div>
                <div className="header-left-name">
                    
                </div>
            </div>
            
            {leftCategories.map((x,ind)=> <Category key={ind} category={x} />)}
            {/*<div className="header-center-search">
                <InputGroup>
                    <Form.Control
                    placeholder="Search..."
                    aria-label="Search"
                    />
                </InputGroup>
            </div>*/}
            {rightCategories.map((x,ind)=> <Category key={ind} category={x} />)}
            <div className="header-right-side">
                <div className="header-right-user-inner">
                    <BasketItemsMenu />
                    <FavoriteItemsMenu />
                </div>
            </div>
        </div>
    </>;
}