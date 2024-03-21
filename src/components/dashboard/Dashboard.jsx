import React from "react";
import { Link } from "react-router-dom";
import Train_Logo from "../../assets/images/train-solid.png";
import Bus_Logo from "../../assets/images/bus-solid.png";
import Path from "../../assets/images/Path 4358.png";


export function Dashboard() {
  return (

    <div class="button-align">
    <div class="section-container">
      <div class="train-align">
        <Link to="rail/polled-data/data-browse">
          <div class="box-container">
            <div class="icon-container">
              <img src={Train_Logo} class="logo" alt="Train Logo" />
            </div>
            <div class="display-icon">
              <button>Rail</button>
              <img src={Path} class="arrow" alt="Arrow Icon" />
            </div>
          </div>
        </Link>
      </div>
    </div>
    <div class="section-container">
      <div class="bus-align">
        <Link to="rail/polled-data/data-browse">
          <div class="box-container">
            <div class="icon-container">
              <img src={Bus_Logo} class="logo" alt="Bus Logo" />
            </div>
            <div class="display-icon">
              <button>Bus</button>
              <img src={Path} class="arrow" alt="Arrow Icon" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
   
  );
}
