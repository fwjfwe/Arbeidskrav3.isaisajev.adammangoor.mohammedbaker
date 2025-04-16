import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";
import { Link } from "react-router-dom";
import Header from './components/header';
import PageTitle from "./components/PageTitle";

function App() {
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "medlem"]{
      _id,
      navn,
      epost,
      "bildeUrl": bilde.asset->url,
      logg[] {
        beskrivelse,
        dato
      }
    }`)
      .then((data) => {
        console.log("DATA FRA SANITY:", data); // 🔍 Se her i konsollen!
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
        <ul>
          {medlemmer
            .flatMap((m) => 
              m.logg?.map(logg => ({
                ...logg,  // Spread the log properties
                navn: m.navn,  // Add the member's name to the log entry
                dato: new Date(logg.dato),  // Convert the date string into a Date object for formatting
              }))
            )
            .filter((entry) => entry?.dato && entry?.beskrivelse)
            .sort((a, b) => b.dato - a.dato)  // Sort logs by date
            .map((entry, idx) => (
              <li key={idx}>
                {/* Display the name, formatted date, time, and log description */}
                <strong>{entry.navn}</strong> - 
                <span>{entry.dato.toLocaleDateString("no-NO")} {entry.dato.toLocaleTimeString("no-NO")}</span>: {entry.beskrivelse}
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
