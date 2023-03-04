import React, { useEffect, useState } from "react";
// Function to fetch data from an API
import useSWR from "swr";

interface Sales {
  id: any;
  username: any;
  volume: any;
}

function LastSalesPage(props: any) {
  const [sales, setSales] = useState<Sales[]>(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data from an API, instead of useEffect and useState
  // Possibility to add a fetcher function to fine-tune the request
  // Need to look in the documentation
  const { data, error } = useSWR(
    "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales: Sales[] = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   // Fetch is an API available in the navigator
  //   // Using Firebase as a mock database (adding /sales.json to url)
  //   fetch(
  //     "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //     // Taking the response as a json (is a promise, so requires an addtional then)
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales: any[] = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load</p>;
  }
  // if (isLoading) {
  // if no data is equal to isLoading
  if (!data || !sales) {
    return <p>Loading...</p>;
  }
  // if (!sales) {
  //   return <p>No data yet</p>;
  // }

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

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    // Taking the response as a json (is a promise, so requires an addtional then)
  );
  const data = await response.json();

  const transformedSales: Sales[] = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformedSales, revalidate: 10 } };
}

export default LastSalesPage;
