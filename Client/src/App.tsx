import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import StockDetails from "./pages/StockDetails/StockDetails";
import StockNews from "./pages/StockNews/StockNews";
import StockScreener from "./pages/StockScreener/StockScreener";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StockScreener />} />
        <Route path="stock" element={<StockDetails />} />
        <Route path="stocknews" element={<StockNews />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
