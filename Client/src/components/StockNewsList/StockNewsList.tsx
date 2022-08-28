import React, { FC } from "react";
import { Body, Container, StocksTable } from "./styles";
import StockNewsListItem, {
  StockNewsProps,
} from "../StockNewsListItem/StockNewsListItem";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../common/styles";
import { ButtonColors } from "../../utils/Palette";

interface Props {
  stockNews: StockNewsProps[];
  isShow: boolean;
}
const StockNewsList: FC<Props> = ({ stockNews, isShow }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <StocksTable>
        <Body>
          {isShow && (
            <CommonButton
              opposite
              color={ButtonColors.GREEN}
              style={{ textTransform: "uppercase" }}
              onClick={() => navigate(`${"create"}`)}
            >
              add new stock News
            </CommonButton>
          )}
          {stockNews &&
            stockNews.map((stockNews, index) => (
              <StockNewsListItem
                key={index}
                _id={stockNews._id}
                title={stockNews.title}
                photo={stockNews.photo}
                author={stockNews.author}
                source={stockNews.source}
                date={stockNews.date}
                sectors={stockNews.sectors}
                context={stockNews.context}
              />
            ))}
        </Body>
      </StocksTable>
    </Container>
  );
};

export default StockNewsList;
