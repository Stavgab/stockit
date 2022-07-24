import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import CreateStock from "./pages/CreateStock/CreateStock";
import DeleteStock from "./pages/DeleteStock/DeleteStock";
import StockDetails from "./pages/StockDetails/StockDetails";
import StockNews from "./pages/StockNews/StockNews";
import StockScreener from "./pages/StockScreener/StockScreener";
import UpdateStock from "./pages/UpdateStock/UpdateStock";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StockScreener />} />
        <Route path="stock">
          <Route path=":id" element={<StockDetails />} />
          <Route path="create" element={<CreateStock />} />
          <Route path="edit">
            <Route path=":id" element={<UpdateStock />} />
          </Route>
          <Route path="delete">
            <Route path=":id" element={<DeleteStock />} />
          </Route>
        </Route>
        <Route path="stocknews" element={<StockNews />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
