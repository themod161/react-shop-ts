import { createContext } from "react";
import { IProduct } from "../interfaces/Product";
interface IBasketItems {
    basketItems: IProduct[],
    setBasketItems: Function
}

export const BasketItems = createContext<IBasketItems>({
    basketItems: [],
    setBasketItems: () => {}
});