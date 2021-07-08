import { Link } from 'gatsby';
import React from 'react';

function getBuildTime() {
  let date = new Date().toISOString();
  [date] = date.split(':');
  date = date.replace(`T`, '.');
  return date;
}

const Footer = () => (
  <footer className="bg-blueGray-200 px-8 pt-5 pb-2 text-sm text-gray-700">
    <div className="flex items-center justify-between">
      <div>
        © {new Date().getFullYear()}, Built by{' '}
        <a href="https://hartenfeller.dev" className="black-link">
          Philipp Hartenfeller
        </a>
      </div>
      <Link className="block black-link" to="/about/">
        About
      </Link>
      <div className="hidden md:block">Build {getBuildTime()}</div>
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span>This website does not use Cookies!</span>
      <a
        className="block black-link m-3"
        href="https://hartenfeller.dev/imprint"
      >
        Imprint
      </a>
      <a
        className="block black-link text-right"
        href="https://hartenfeller.dev/imprint"
      >
        Privacy Policy
      </a>
    </div>
    <div className="mt-2">
      This website is unofficial and is not associated in any way with the
      Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD
      CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One
      Licensing B.V.
    </div>
  </footer>
);

export default Footer;
