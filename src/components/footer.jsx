import { Link } from 'gatsby';
import React from 'react';

const Footer = () => (
  <footer className="bg-blueGray-200 px-8 pt-5 pb-2">
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
  </footer>
);

export default Footer;
