import { useState } from "react";
import navJson from "./nav.json";
import { Link } from "react-router-dom";
import styles from "./Nav.module.scss";

interface Nav {
  index: number;
  path: string;
  label: string;
  searchValue: string;
  isActive: boolean;
}

function Nav() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navMenu, setNavMenu] = useState<Nav[]>(navJson);
  const navLinks = navMenu.map((nav: Nav) => {
    return (
      <Link key={nav.index} to={nav.path}>
        <small className="text-normal font-medium leading-10">
          {nav.label}
        </small>
      </Link>
    );
  });

  return <nav className={styles.nav}>{navLinks}</nav>;
}

export { Nav };
