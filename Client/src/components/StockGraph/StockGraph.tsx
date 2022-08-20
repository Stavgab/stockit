import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as d3 from "d3";
import axios from "axios";
import { SERVER_URL, STOCK_ROUTE } from "../../utils/Consts";
import { Interval } from "../../common/enum/IntervalType";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type DataPoint = { close: number; date: number };

type LineChartProps = {
  width: number;
  height: number;
  ticker: string;
};

const StockGraph: FC<LineChartProps> = ({ width, height, ticker }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const [stockHistory, setStockHistory] = useState<DataPoint[]>([
    { close: 1, date: 90 },
  ]);
  const [min, max] = d3.extent(stockHistory, (d) => d.close);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}${STOCK_ROUTE}history/${ticker}`, {
        period1: "2022-02-01",
        period2: new Date(),
        events: "history",
        includeAdjustedClose: true,
        interval: Interval.DAY,
      })
      .then((res) => {
        setStockHistory(res.data.graphData);
      })
      .catch((e) => console.log(e));
  }, []);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min || 0, max || 0])
      .range([boundsHeight, 0]);
  }, [stockHistory, height]);

  const [xMin, xMax] = d3.extent(stockHistory, (d) => d.date);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [stockHistory, width]);

  useLayoutEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale).tickFormat((d, i) => {
      const tempDate = new Date(Number(d));
      return i % 2 === 0 ? tempDate.toLocaleDateString("en-US") : "";
    });
    svgElement
      .append("g")
      .attr("transform", `translate(0,${boundsHeight})`)
      .call(xAxisGenerator);
    const yAxisGenerator = d3.axisLeft(yScale);

    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const lineBuilder = d3
    .line<DataPoint>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.close));

  const linePath = lineBuilder(stockHistory);
  if (!linePath) {
    return null;
  }

  return (
    <div>
      <svg width={width} height={height}>
        {/* Graph Line */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#00ca28"
            fill="none"
            strokeWidth={2}
          />
        </g>
        {/* Coordinate system */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

export default StockGraph;
