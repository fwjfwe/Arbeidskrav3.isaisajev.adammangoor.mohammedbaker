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
          logg
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

      {/* Logg Section */}
      <section className="Logg">
        <h3 className="BioOver">Loggføringer</h3>
        <ul>
          {person.logg?.map((logg, idx) => {
            const loggDate = new Date(logg.dato);
            const dateString = loggDate.toLocaleDateString("no-NO");
            const timeString = loggDate.toLocaleTimeString("no-NO");

            return (
              <li key={logg._key || idx}>
                {/* Displaying Name, Date, Time, and Log Description */}
                <strong>{person.navn}</strong> - 
                <span>{dateString} {timeString}</span>: {logg.beskrivelse}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

export default Profil;
