import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(API_URL);
  useEffect(() => {
    // Funkcja asynchroniczna do pobierania danych
    const fetchData = async () => {
      try {
        // Rozpoczynamy pobieranie danych i ustawiamy stan loading na true
        setLoading(true);
        setError(null);

        // Pobieranie danych z API
        const response = await fetch(
          "https://shoppingify-backend-61bb.onrender.com/api/products"
        );

        // Sprawdzamy, czy odpowiedź z serwera jest poprawna
        if (!response.ok) {
          throw new Error("Błąd sieci");
        }

        // Parsowanie odpowiedzi JSON
        const result = await response.json();

        // Ustawiamy pobrane dane w stanie komponentu
        setData(result);
      } catch (error) {
        // Jeśli pojawi się błąd, ustawiamy informacje o błędzie w stanie
        setError(error.message);
      } finally {
        // Niezależnie od wyniku, kończymy ładowanie ustawiając loading na false
        setLoading(false);
      }
    };

    // Wywołujemy funkcję fetchData
    fetchData();
  }, []); // Zależność od prop apiUrl

  console.log(data);

  // Renderowanie komponentu
  return <div>Products</div>;
};

export default Products;
