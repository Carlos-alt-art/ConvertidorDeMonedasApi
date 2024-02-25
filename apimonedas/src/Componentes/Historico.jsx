import React, { useState, useEffect } from 'react';

const HistoricalRates = () => {
  const [date, setDate] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();
        setCurrencyList(Object.keys(data));
      } catch (error) {
        console.error('Error fetching currency list:', error);
      }
    };

    fetchCurrencyList();
  }, []);

  const fetchHistoricalRate = async () => {
    try {
      const response = await fetch(`https://api.frankfurter.app/${date}?from=${baseCurrency}&to=${targetCurrency}`);
      const data = await response.json();
      setExchangeRate(data.rates[targetCurrency]);
    } catch (error) {
      console.error('Error fetching historical exchange rate:', error);
    }
  };

  const handleFetchRate = () => {
    fetchHistoricalRate();
  };

  return (
    <div className="centered-container" style={{ backgroundColor: 'lightgray' }}>
      <h2>Historial de Tasas de Cambio</h2>
      <label>
        Fecha:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Moneda Base:
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
          {currencyList.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Moneda de Destino:
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {currencyList.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleFetchRate}>Buscar Tasa</button>
      {exchangeRate !== null && (
        <p>
          La tasa de cambio para {baseCurrency} a {targetCurrency} en {date} es: {exchangeRate}
        </p>
      )}
    </div>
  );
};

export default HistoricalRates;
