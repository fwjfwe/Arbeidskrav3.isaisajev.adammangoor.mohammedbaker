import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "./sanityClient";

function Profil() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

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

  if (!person) return <p>Laster profil...</p>;

  return (
    <div>
      <h1>{person.navn}</h1>
      <img src={person.bildeUrl} alt={person.navn} width="200" />
      <p><strong>E-post:</strong> {person.epost}</p>
      <h3>Interesser</h3>
      <ul>
        {person.interesser?.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <h3>Biografi</h3>
      <p>{person.bio}</p>
      <h3>Loggføringer</h3>
      <ul>
        {person.logg?.map((logg, idx) => (
          <li key={idx}>{logg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profil;
