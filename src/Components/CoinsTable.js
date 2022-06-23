import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  head: {
    fontSize: 18,
    fontFamily: "Monsterrat",
    color: "black",
    fontWeight: 900,
  },
  cont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subhead1: {
    fontFamily: "Monsterrat",
    fontSize: 20,
    color: "black",
    fontWeight: 900,
    width: "1000px",
  },
  subhead: {
    fontFamily: "Monsterrat",
    fontSize: 20,
    color: "black",
    fontWeight: 900,
    width: "19vw",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    textDecoration: "none",
    justifyItems: "space-between",
    cursor: "pointer",
    textTransform: "uppercase",
    width: "100%",
  },
  inneritem: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    margin: "25px",
    width: "7vw",
  },
});
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
  const classes = useStyles();
  const fetchCoins = async () => {
    setLoad(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoad(false);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const SearchHandler = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Monsterrat" }}
        >
          Cryptocurrency prices by Market Cap
        </Typography>
        <TextField
          style={{ marginBottom: 20, width: "100%" }}
          label="Search for a Cryptocurrency"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {load ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <>
              <Table>
                <TableHead
                  className={classes.cont}
                  style={{ backgroundColor: "#EEBC1D" }}
                >
                  <TableRow>
                    <TableCell className={classes.subhead1}>Coin</TableCell>
                    <TableCell className={classes.subhead}>Name</TableCell>
                    <TableCell className={classes.subhead}>Symbol</TableCell>
                    <TableCell className={classes.subhead}>Price</TableCell>
                    <TableCell className={classes.subhead}>
                      24hr Change
                    </TableCell>
                    <TableCell className={classes.subhead}>
                      Market Cap
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SearchHandler().map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow>
                        <Link to={`/coins/${row.id}`} className={classes.item}>
                          <TableCell
                            component="th"
                            scope="row"
                            styles={{
                              display: "flex",
                              gap: 15,
                            }}
                            key={row.id}
                            className={classes.item}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              width="50"
                              style={{ marginRight: "25vw" }}
                            />
                            <span className={classes.inneritem}>
                              {row.name}
                            </span>
                            <span className={classes.inneritem}>
                              {row.symbol}
                            </span>
                            <span className={classes.inneritem}>
                              {numberWithCommas(row.current_price?.toFixed(2))}
                            </span>
                            <span
                              className={classes.inneritem}
                              style={{ color: profit > 0 ? "green" : "red" }}
                            >
                              {profit && "+"}&nbsp;
                              {row.price_change_percentage_24h}%
                            </span>
                            <span className={classes.inneritem}>
                              {numberWithCommas(row.market_cap?.toFixed(2))}
                            </span>
                          </TableCell>
                        </Link>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {/* <TablePagination 
                        count={(SearchHandler()?.length).toFixed(0)}
                        rowsPerPage={10}
                        page={page-1}
                        onPageChange={(e)=>{ console.log(e)}}>
                        </TablePagination> */}
              </Table>
            </>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
