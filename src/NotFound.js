import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Error 404 Not Found</h1>

      <Link to="/">
        <button>Return to home page</button>
      </Link>
    </div>
  );
};

export default NotFound;