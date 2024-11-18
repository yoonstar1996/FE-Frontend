import { useEffect, useState } from "react";
import navJson from "./nav.json";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.scss";
import { useAtom } from "jotai";
import { searchValueAtom } from "@/store";

interface Nav {
  index: number;
  path: string;
  label: string;
  searchValue: string;
  isActive?: boolean;
}

function Nav() {
  const { pathname } = useLocation();
  const [, setSearchValue] = useAtom(searchValueAtom);
  const [navMenu, setNavMenu] = useState<Nav[]>(navJson);

  useEffect(() => {
    navMenu.forEach((nav: Nav) => {
      if (nav.path === pathname || pathname.includes(nav.path)) {
        setSearchValue(nav.searchValue);
      }
    });
    setNavMenu([...navMenu]);
  }, [pathname]);

  const navLinks = navMenu.map((nav: Nav) => {
    const isActive = nav.path === pathname;
    return (
      <Link
        key={nav.index}
        to={nav.path}
        className={isActive ? "bg-slate-400 rounded-lg p-1" : "p-1"}
      >
        <small className="text-normal font-medium leading-10">
          {nav.label}
        </small>
      </Link>
    );
  });

  return <nav className={styles.nav}>{navLinks}</nav>;
}

export { Nav };
