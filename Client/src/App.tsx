import React, { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import StockGroupBySectors from "./components/StockGroupBySectors/StockGroupBySectors";
import StockNewsDelete from "./components/StockNewsDelete/StockNewsDelete";
import { LiveSearchContext } from "./context/Context";
import CreateStock from "./pages/CreateStock/CreateStock";
import CreateStockNews from "./pages/CreateStockNews/CreateStockNews";
import DeleteStock from "./pages/DeleteStock/DeleteStock";
import LiveSearch from "./pages/LiveSearch/LiveSearch";
import StockDetails from "./pages/StockDetails/StockDetails";
import StockNewDetails from "./pages/StockNewDetails/StockNewDetails";
import StockNews from "./pages/StockNews/StockNews";
import StockScreener from "./pages/StockScreener/StockScreener";
import UpdateStock from "./pages/UpdateStock/UpdateStock";
import UpdateStockNews from "./pages/UpdateStockNews/UpdateStockNews";

const App: FC = () => {
  const [isLiveSearch, setIsLiveSearch] = useState<Boolean>(false);
  return (
    <LiveSearchContext.Provider value={{ isLiveSearch, setIsLiveSearch }}>
      <BrowserRouter>
        {isLiveSearch && <LiveSearch />}
        <Header />
        <Routes>
          <Route path="/" element={<StockScreener />} />
          <Route path="sectorbymarketcap" element={<StockGroupBySectors />} />
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
            <Route path=":id" element={<StockNewDetails />} />
            <Route path="create" element={<CreateStockNews />} />
            <Route path="update">
              <Route path=":id" element={<UpdateStockNews />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<StockNewsDelete />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LiveSearchContext.Provider>
  );
};

export default App;
