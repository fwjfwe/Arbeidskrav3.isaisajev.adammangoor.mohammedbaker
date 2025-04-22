import { Link } from 'react-router-dom';

export default function Header({ medlemmer = [] }) {
  return (
    <header>
      <h1>Gruppe 23</h1>
      <nav>
        <Link to="/">Hjem</Link>
        {medlemmer.map((m) => (
          <Link key={m._id} to={`/profil/${m.slug.current}`}>
            {m.navn}
          </Link>
        ))}
      </nav>
    </header>
  );
}
