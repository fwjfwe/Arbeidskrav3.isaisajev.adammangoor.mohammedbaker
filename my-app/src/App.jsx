import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";
import { Link } from 'react-router-dom';
import Header from './components/header';
import PageTitle from "./components/PageTitle";
import MedlemsListe from "./components/MedlemsListe"; 
import SamletLogg from "./components/SamletLogg";


function App() {
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "medlem"]{
        _id,
        navn,
        epost,
        "bildeUrl": bilde.asset->url,
        slug, 
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
    <section>
      <PageTitle title="23" />
      <Header medlemmer={medlemmer} />

      <main>
        <MedlemsListe medlemmer={medlemmer} /> 
        <SamletLogg medlemmer={medlemmer} />
      </main>
    </section>
  );
}

export default App;
