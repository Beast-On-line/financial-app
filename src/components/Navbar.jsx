import React from "react";
import "../css/sip.css";
import SvgIcon from "@mui/material/SvgIcon";

import { Link } from "react-router-dom";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/" className="liststyle">
            <HomeIcon sx={{ color: "Black" }} />
          </Link>
        </li>
        <li style={{ listStyle: "none" }}>
          <Link to="/" className="liststyle">
            SIP
          </Link>
        </li>
        <li>
          <Link to="/lumpsum" className="liststyle">
            LumpSum
          </Link>
        </li>

        <li>
          <Link to="/emicalculator" className="liststyle">
            EMI
          </Link>
        </li>

        <li>
          <Link to="/incometax" className="liststyle">
            Income Tax
          </Link>
        </li>
      </ul>
    </nav>
  );
}
