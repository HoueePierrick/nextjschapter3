import React from "react";

function UserIdPage(props: any) {
  return <h1>{props.id}</h1>;
}

// There is no pre-generation, unlike getStaticProps
export async function getServerSideProps(context: any) {
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

export default UserIdPage;
