import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import StockNewsCreate from "./components/StockNewsCreate/StockNewsCreate";
import StockNewsDelete from "./components/StockNewsDelete/StockNewsDelete";
import StockNewsUpdate from "./components/StockNewsUpdate/StockNewsUpdate";
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
        <Route path="stocknews">
          <Route path="" element={<StockNews />} />
          <Route path="create" element={<StockNewsCreate />} />
          <Route path="update">
            <Route path=":id" element={<StockNewsUpdate />} />
          </Route>
          <Route path="delete">
            <Route path=":id" element={<StockNewsDelete />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
