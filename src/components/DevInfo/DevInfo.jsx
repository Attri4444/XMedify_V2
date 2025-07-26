import React from "react";
import { Link } from "react-router-dom";

const DevInfo = () => {
  return (
    <div className="dev-info">
      <h2>Developer Info</h2>
      <p>Built by Pankaj Attri</p>
      <p>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};

export default DevInfo;
