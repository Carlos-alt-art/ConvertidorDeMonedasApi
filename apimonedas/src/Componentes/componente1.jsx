import React, { useState, useEffect } from 'react';
import './Converter.css'; 

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1); 
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

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`);
      const data = await response.json();
      setExchangeRate(data.rates[targetCurrency]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const handleConvert = () => {
    fetchExchangeRate();
  };

  const calculateConvertedAmount = () => {
    if (exchangeRate !== null) {
      return amount * exchangeRate;
    }
    return null;
  };

  return (
    <div className="centered-container" style={{ backgroundColor: 'lightgray' }}>
      <h2>Convertidor de moneda</h2>
      <label>
        Cantidad de moneda base:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <br />
      <label>
        Moneda base:
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
          {currencyList.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Moneda de destino:
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {currencyList.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleConvert}>Convertir</button>
      {exchangeRate !== null && (
        <p>
          {amount} {baseCurrency} = {calculateConvertedAmount()} {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
