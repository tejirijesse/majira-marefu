import { Link } from 'react-router-dom';

interface FooterProps {
  links?: { to: string; label: string }[];
  right?: string;
}

const DEFAULT_LINKS = [
  { to: '/chapter', label: 'Chapter' },
  { to: '/journeys', label: 'Journeys' },
  { to: '/partners', label: 'Partners' },
  { to: '/letter', label: 'Letter' },
];

export function Footer({ links = DEFAULT_LINKS, right = 'August 2027' }: FooterProps) {
  return (
    <footer>
      <div className="container">
        <div className="mark">Majira Marefu</div>
        <ul>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div>{right}</div>
      </div>
    </footer>
  );
}
