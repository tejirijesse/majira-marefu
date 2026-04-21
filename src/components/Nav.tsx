import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NavProps {
  /** Landing page wants transparent nav over the hero until scroll. */
  transparentUntilScroll?: boolean;
}

const LINKS = [
  { to: '/chapter', label: 'The Chapter' },
  { to: '/arc', label: 'The Arc' },
  { to: '/journeys', label: 'Journeys' },
  { to: '/hand', label: 'The Hand' },
  { to: '/guestbook', label: 'Guestbook' },
  { to: '/letter', label: 'Letter' },
];

export function Nav({ transparentUntilScroll }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const classes = [
    'nav',
    scrolled || !transparentUntilScroll ? 'nav--solid' : 'nav--transparent',
    open ? 'nav--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} aria-label="Primary">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        Majira <em>Marefu</em>
      </Link>
      <ul>
        {LINKS.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="nav-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? 'Close' : 'Menu'}
      </button>
    </nav>
  );
}
