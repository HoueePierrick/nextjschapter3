import React from "react";
// FS can only be used on the server side, not on the client side
import fs from "fs/promises";
// Module helping to build path
import path from "path";

function HomePage(props: any) {
  const { products } = props;

  return (
    <ul>
      {products.map((product: any) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
}

// Prepares the props for the component
// NextJS will first execute this function and then the component
// Runs invisible code to the user (doesn't run on client side)
// Is executed on build
export async function getStaticProps() {
  // Is asynchronous because we imported fs/promises
  // cwd = Current Working Directory
  // process.cwd() givew the cwd of the current file
  // In nextJS the CWD will be the overall project directory
  // Add arguments to build the string
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const JSONdata = await fs.readFile(filePath);
  const data = JSON.parse(JSONdata.toString());

  return {
    props: {
      products: data?.products,
    },
  };
}

export default HomePage;
