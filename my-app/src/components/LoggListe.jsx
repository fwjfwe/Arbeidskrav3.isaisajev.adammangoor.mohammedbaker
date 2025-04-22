import React from "react";

function LoggListe({ logg = [] }) {
  return (
    <section className="Logg">
      <h3 className="LoggOver">Loggføringer</h3>
      <ul className="LoggUl">
        {logg.map((entry, idx) => {
          const loggDato = entry.createdAt
            ? new Date(entry.createdAt).toLocaleString("no-NO")
            : "Ukjent dato";
          return (
            <li className="LoggLi" key={entry._key || idx}>
              <strong>{loggDato}</strong>: {entry.beskrivelse}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default LoggListe;
