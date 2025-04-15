import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";
import { Link } from "react-router-dom";
import Header from './components/header';

function App() {
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "medlem"]{
        _id,
        navn,
        epost,
        "bildeUrl": bilde.asset->url
      }`)
      .then((data) => setMedlemmer(data))
      .catch(console.error);
  }, []);

  return (
    <div>
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
      </main>
    </div>
  );
}

export default App;
