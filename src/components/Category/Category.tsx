import { StoreItems } from '../../contexts/StoreItems';
import { getAllProducts, getProductsByCategory } from '../../controllers/products.controller';
import './Category.css';
import {useContext} from 'react';
interface ICategory {
    category: string;
}

export function Category({category}: ICategory) {

    const {storeItems, setStoreItems} = useContext(StoreItems);

    const onClickHandler = async () => {
        let itms;
        if(category == 'all') 
            itms = await getAllProducts();
        else 
            itms = await getProductsByCategory(category);

        setStoreItems(itms);
    }

    return <div className="category-inner" onClick={onClickHandler}>
        {category}
    </div>
} 