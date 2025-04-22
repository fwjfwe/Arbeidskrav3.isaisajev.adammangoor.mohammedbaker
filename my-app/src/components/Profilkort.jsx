import React from "react";
import { Link } from "react-router-dom";

function Profilkort({ medlem }) {
  return (
    <Link to={`/profil/${medlem.slug.current}`} className="kort">
      <img src={medlem.bildeUrl} alt={medlem.navn} />
      <h3>{medlem.navn}</h3>
      <p>{medlem.epost}</p>
    </Link>
  );
}

export default Profilkort;
