import requestGet from "../services/StocksService.js";
import recentQuote from "../services/RecentQuote.js";

const compareQuotes = async (stockSymbolArray, stockFunction, stockInterval) => {
  const resultArray = [];
  for(const stockSymbol of stockSymbolArray){
    const response = await requestGet(stockFunction, stockSymbol, stockInterval);
    const informationData = response[Object.keys(response)[0]];
    const quoteResult = await recentQuote(stockSymbol, informationData);
    resultArray.push(quoteResult);
  }
  const result = {
    "lastPrices": resultArray
  };
  
  return result;
}

export default compareQuotes;