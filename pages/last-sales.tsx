import React, { useEffect, useState } from "react";

interface Sales {
  id: any;
  username: any;
  volume: any;
}

function LastSalesPage() {
  const [sales, setSales] = useState<Sales[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    // Fetch is an API available in the navigator
    // Using Firebase as a mock database (adding /sales.json to url)
    fetch(
      "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
      // Taking the response as a json (is a promise, so requires an addtional then)
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedSales: any[] = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!sales) {
    return <p>No data yet</p>;
  }
  return (
    <ul>
      {sales?.map((sale: Sales, index: number) => {
        return (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
}

export default LastSalesPage;
