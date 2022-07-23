import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { chartDays } from "../Config/data";
import SelectButton from "./SelectButton";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [hisdata, setHisdata] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  const classes = useStyles();
  const fetchHisData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHisdata(data.prices);
  };
  console.log(hisdata);
  useEffect(() => {
    fetchHisData();
    // eslint-disable-next-line
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#14161a",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!hisdata ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: hisdata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: hisdata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} days in ${currency} )`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
