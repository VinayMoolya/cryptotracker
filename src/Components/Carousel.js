import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    color: "white",
    textDecoration: "none",
    justifyItems: "space-between",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
  const classes = useStyles();
  const { currency, symbol } = CryptoState();
  const [trend, setTrend] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrend(data);
  };
  console.log(trend);
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 6,
    },
  };

  const items = trend.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        className={classes.carouselItem}
        to={`/cryptotracker/coins/${coin.id}`}
      >
        <img
          src={coin.image}
          alt={coin.name}
          height="90"
          width="90"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}&nbsp;&nbsp;&nbsp;
          <span style={{ color: profit > 0 ? "green" : "red" }}>
            {profit && "+"}&nbsp;{coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin.current_price?.toFixed(2))}
        </span>
      </Link>
    );
  });
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
