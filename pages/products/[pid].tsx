import React, { Fragment } from "react";
import fs from "fs/promises";
// Module helping to build path
import path from "path";

function ProductDetailPage(props: any) {
  const { loadedProduct } = props;
  // Kinda the same as useEffect in React
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const JSONdata = await fs.readFile(filePath);
  const data = JSON.parse(JSONdata.toString());
  return data;
}

export async function getStaticProps(context: any) {
  // does the same as useRouter // router.query
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  // Filtering on the product
  const product = data.products.find(
    (product: any) => product.id === productId
  );

  // Case if we don't have a product
  if (!product) {
    return {
      // Shows the 404 error
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

// Function telling nextJS which instances of this page should be generated
export async function getStaticPaths() {
  const data = await getData();
  const ids: string[] = data.products.map((product: any) => {
    return product.id;
  });
  const pathsWithParams = ids.map((id: string) => {
    return { params: { pid: id } };
  });
  return {
    // Array of all cases on which the page should be generated
    // Params should hold all the dynamic identifiers
    // And values for which this page should be generated
    paths: pathsWithParams,
    // [
    //   {
    //     params: {
    //       pid: "p1",
    //     },
    //   },
    // {
    //   params: {
    //     pid: "p2",
    //   },
    // },
    // {
    //   params: {
    //     pid: "p3",
    //   },
    // },
    // ],
    // Fallback is true if we only want to return some pages
    // Tells that other values may be valid
    // Then requires to return a fallback statement in the main function
    fallback: true,
    // Fallback ist blocking if you want to wait for loading
    // Instead of having a fallback function in main block
    // fallback: "blocking",
    // Fallback is false if we want to preload all the possible pages
    // fallback: false,
  };
}

export default ProductDetailPage;
