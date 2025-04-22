import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "./sanityClient";
import Header from './components/header';
import LoggListe from './components/LoggListe'; // 

function Profil() {
  const { slug } = useParams();
  const [person, setPerson] = useState(null);
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type == "medlem" && slug.current == $slug][0]{
          navn,
          epost,
          "bildeUrl": bilde.asset->url,
          interesser,
          bio,
          logg[] {
            _key,
            beskrivelse,
            createdAt
          }
        }`,
        { slug }
      )
      .then((data) => {
        console.log("Profildata:", data);
        setPerson(data);
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    client
      .fetch(`*[_type == "medlem"]{ _id, navn, slug }`)
      .then((data) => setMedlemmer(data))
      .catch(console.error);
  }, []);

  if (!person) return <p>Laster profil...</p>;

  return (
    <section>
      <Header medlemmer={medlemmer} />
      <section className="ProfilBoks">
        <img className="ProfilBilde" src={person.bildeUrl} alt={person.navn} />
        <section className="ProfilBio">
          <h1 className="ProfilNavn">{person.navn}</h1>
          <p className="Epost">E-post: {person.epost}</p>
          <h3 className="BioOver">Biografi</h3>
          <p className="BioTekst">{person.bio}</p>
          <h3 className="BioOver">Interesser</h3>
          <ul className="Interesser">
            {person.interesser?.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </section>
      </section>

      <LoggListe logg={person.logg} />
    </section>
  );
}

export default Profil;
