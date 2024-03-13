import React from "react";
import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div>
      <Link to="rail/polled-data/data-browse">
        <button>RAIL</button>
      </Link>
      <Link to="bus">
        <button>BUS</button>
      </Link>
    </div>
  );
}
