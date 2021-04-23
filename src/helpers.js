export const renderChangePercent = changePercent => {
    if (changePercent > 0) {
      return <span className="percent-raised">{changePercent}% &uarr;</span>
    } else if (changePercent < 0) {
      return <span className="percent-fallen">{changePercent}% &darr;</span>
    } else {
      return <span>{changePercent}</span>
    }
  }
  

const transformCurrencyData = (currencyData) => {
  if(currencyData) {
    const data = Object.keys(currencyData);
    return data.map(key => {
      return ({
        name: key,
        value: currencyData[key]
      })
    })
  };

  return []
}

export const filterCurrencyData = (data) => {
  if (data) {
    const { name, symbol, image: {small}, market_cap_rank, market_data: {price_change_24h} } = data;
    return ({
      name, 
      symbol, 
      currencyImg: small,
      marketCapRank: market_cap_rank,
      priceChange24h: price_change_24h,
      currencyList: transformCurrencyData(data.market_data?.current_price),
    })
  }

  return {}
}