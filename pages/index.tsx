import React from "react";

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
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  };
}

export default HomePage;
