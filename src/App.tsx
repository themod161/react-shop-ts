import React, {useState} from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main/Main.page';
import { ProductPage } from './pages/Product/Product.page';
import { IProduct } from './interfaces/Product';
import { FavoriteItems } from './contexts/FavoriteItems';
import { StoreItems } from './contexts/StoreItems';
import { BasketItems } from './contexts/BasketItems';

function App() {
  let [favoriteItems, setFavoriteItems] = useState<IProduct[]>([]);
  let [storeItems, setStoreItems] = useState<IProduct[]>([]);
  let [basketItems, setBasketItems] = useState<IProduct[]>([]);
  return (
    <FavoriteItems.Provider value={{ favoriteItems, setFavoriteItems }}>
      <StoreItems.Provider value={{ storeItems, setStoreItems }}>
        <BasketItems.Provider value={{ basketItems, setBasketItems }}>
          <div className="App">
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path='/products/:id' element={<ProductPage />} />
                <Route path='*' element={<MainPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </BasketItems.Provider>
      </StoreItems.Provider>
    </FavoriteItems.Provider>
  );
}

export default App;
