import { useState, useEffect } from "react";

function Coin() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedCoinPriceinUSD, setSelectedCoinPriceinUSD] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers/")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSelectedCoin(coins.filter((coin) => coin.symbol === "BTC"));
    if (selectedCoin.length > 0)
      setSelectedCoinPriceinUSD(selectedCoin[0].quotes.USD.price);
  }, [coins]);

  console.log({ selectedCoin, selectedCoinPriceinUSD });

  return (
    <div>
      <h1>{loading ? "Loading..." : "USD to BTC converter"}</h1>
      <h2>1 BTC is ${selectedCoinPriceinUSD} USD now.</h2>
    </div>
  );
}

export default Coin;
