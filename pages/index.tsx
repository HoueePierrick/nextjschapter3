import React from "react";
// FS can only be used on the server side, not on the client side
import fs from "fs/promises";
// Module helping to build path
import path from "path";
import Link from "next/link";

function HomePage(props: any) {
  const { products } = props;

  return (
    <ul>
      {products.map((product: any) => {
        return (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

// Prepares the props for the component
// NextJS will first execute this function and then the component
// Runs invisible code to the user (doesn't run on client side)
// Is executed on build
export async function getStaticProps() {
  console.log("Re-generated");
  // Is asynchronous because we imported fs/promises
  // cwd = Current Working Directory
  // process.cwd() givew the cwd of the current file
  // In nextJS the CWD will be the overall project directory
  // Add arguments to build the string
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const JSONdata = await fs.readFile(filePath);
  const data = JSON.parse(JSONdata.toString());

  // Case if there is no data
  if (!data) {
    // Automatically redirect to another route
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  // Case if there is no fetched data
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data?.products,
    },
    // Time period for every refrech by NextJS for every incoming request
    // 10 means re-generated every 10s
    revalidate: 10,
    // If notFound: true, the page will return a 404 page
    // Usefull if we can't fetch the data
    notFound: false,
  };
}

export default HomePage;
