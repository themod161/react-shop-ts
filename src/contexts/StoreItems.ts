import { createContext } from "react";
import { IProduct } from "../interfaces/Product";
interface IStoreItems {
    storeItems: IProduct[],
    setStoreItems: Function
}

export const StoreItems = createContext<IStoreItems>({
    storeItems: [],
    setStoreItems: () => {}
});