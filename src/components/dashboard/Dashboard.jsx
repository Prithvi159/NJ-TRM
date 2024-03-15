import React from "react";
import { Link } from "react-router-dom";
import Train_Logo from "../../assets/images/train-solid.png";
import Bus_Logo from "../../assets/images/bus-solid.png";
import Path from "../../assets/images/Path 4358.png";


export function Dashboard() {
  return (
    <div className="button-align">
      <div className="train-align">
      <img src={Train_Logo} className="logo"/>
      <Link to="rail/polled-data/data-browse">
        <div className="display-icon"><button>Rail</button><img src={Path} className="logo"/></div>
      </Link>
      </div>
      <div className="bus-align">
      <img src={Bus_Logo} className="logo"/>
      <Link to="bus">
      <div className="display-icon"><button>Bus</button><img src={Path} className="logo"/></div>
      </Link>
      </div>
    </div>
  );
}
