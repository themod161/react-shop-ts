import { createContext } from "react";
import { IProduct } from "../interfaces/Product";
interface IFavoriteItems {
    favoriteItems: IProduct[],
    setFavoriteItems: Function
}

export const FavoriteItems = createContext<IFavoriteItems>({
    favoriteItems: [],
    setFavoriteItems: () => {}
});