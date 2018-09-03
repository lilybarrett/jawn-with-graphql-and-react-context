function formatMoney (market, price) {
    const convertedPrice = market === "US"
        ? price
        : (parseInt(price, 10) * 0.79).toFixed(2);
    const currencySymbol = market === "US" ? "$" : "£";
    return `${currencySymbol}${convertedPrice}`;
};

export default formatMoney;
