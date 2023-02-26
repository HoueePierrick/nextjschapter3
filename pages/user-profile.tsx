import React from "react";

function UserProfilePage(props: any) {
  return <h1>{props.userName}</h1>;
}

// Will return props
// Runs on the server only
// Not in advance, but for each request
// We get access to the full request object
// As well as the response
export async function getServerSideProps(context: any) {
  const { params, req, res } = context;
  console.log("Server-side code");
  //   console.log(req);
  //   console.log(res);
  return {
    props: {
      userName: "Max",
    },
  };
}

export default UserProfilePage;
