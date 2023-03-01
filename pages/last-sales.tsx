import React, { useEffect } from "react";

function LastSalesPage() {
  useEffect(() => {
    // Fetch is an API available in the navigator
    // Using Firebase as a mock database (adding /sales.json to url)
    fetch(
      "https://nextjs-course-1541c-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
    ).then();
  }, []);

  return <ul></ul>;
}

export default LastSalesPage;
