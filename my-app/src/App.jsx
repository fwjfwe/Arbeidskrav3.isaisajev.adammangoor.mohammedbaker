import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";
import { Link } from "react-router-dom";
import Header from './components/header';
import PageTitle from "./components/PageTitle";

function App() {
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "medlem"]{
        _id,
        navn,
        epost,
        "bildeUrl": bilde.asset->url,
        logg[] {
          _key,
          beskrivelse,
          createdAt
        }
      }`)
      .then((data) => {
        console.log("DATA FRA SANITY:", data);
        setMedlemmer(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <PageTitle title="23" />
      <Header medlemmer={medlemmer} />
      <main>
        <h2>Gruppemedlemmer</h2>
        <div className="kort-container">
          {medlemmer.map((m) => (
            <Link to={`/profil/${m._id}`} key={m._id} className="kort">
              <img src={m.bildeUrl} alt={m.navn} />
              <h3>{m.navn}</h3>
              <p>{m.epost}</p>
            </Link>
          ))}
        </div>

        <h2>Samlet logg for gruppa</h2>
        <ul calssName="LoggUl">
          {medlemmer
            .flatMap((m) =>
              (m.logg || []).map((entry) => ({
                ...entry,
                navn: m.navn,
              }))
            )
            .filter((entry) => entry.createdAt && entry.beskrivelse)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((entry, idx) => {
              const loggDato = new Date(entry.createdAt).toLocaleString("no-NO");
              return (
                <li className="LoggLi" key={entry._key || idx}>
                  <strong>{entry.navn}</strong> – {loggDato}: {entry.beskrivelse}
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}

export default App;
