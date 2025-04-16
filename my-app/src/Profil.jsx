import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import Header from './components/header';

function Profil() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "medlem" && _id == $id][0]{
          navn,
          epost,
          "bildeUrl": bilde.asset->url,
          interesser,
          bio,
          logg[] {
            beskrivelse,
            createdAt
          }
        }`,
        { id }
      )
      .then((data) => setPerson(data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    client
      .fetch(`*[_type == "medlem"]{ _id, navn }`)
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

      <section className="Logg">
        <h3 className="LoggOver">Loggføringer</h3>
        <ul className="LoggUl">
          {person.logg?.map((logg, idx) => {
            const loggDato = logg.createdAt ? new Date(logg.createdAt).toLocaleString("no-NO") : "Ukjent dato";
            return (
              <li className="LoggLi" key={logg._key || idx}>
                <strong>{loggDato}</strong>: {logg.beskrivelse}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default Profil;
