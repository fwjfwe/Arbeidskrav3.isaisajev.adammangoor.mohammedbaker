import React from "react";
import { Link } from "react-router-dom";

function MedlemsListe({ medlemmer = [] }) {
  return (
    <section>
      <h2>Gruppemedlemmer</h2>
      <article className="kort-container">
        {medlemmer.map((m) => {
          if (!m.slug?.current) return null;
          return (
            <Link to={`/profil/${m.slug.current}`} key={m._id} className="kort">
              <img src={m.bildeUrl} alt={m.navn} />
              <h3>{m.navn}</h3>
              <p>{m.epost}</p>
            </Link>
          );
        })}
      </article>
    </section>
  );
}

export default MedlemsListe;
