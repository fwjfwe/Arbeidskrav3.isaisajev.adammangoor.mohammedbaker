import React from "react";

function SamletLogg({ medlemmer }) {
  if (!medlemmer || medlemmer.length === 0) return null;

  const samletLogg = medlemmer
    .flatMap((m) =>
      (m.logg || []).map((entry) => ({
        ...entry,
        navn: m.navn,
      }))
    )
    .filter((entry) => entry.createdAt && entry.beskrivelse)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h2>Samlet logg for gruppa</h2>
      <ul className="LoggUl">
        {samletLogg.map((entry, idx) => {
          const loggDato = new Date(entry.createdAt).toLocaleString("no-NO");
          return (
            <li className="LoggLi" key={entry._key || idx}>
              <strong>{entry.navn}</strong> – {loggDato}: {entry.beskrivelse}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SamletLogg;
