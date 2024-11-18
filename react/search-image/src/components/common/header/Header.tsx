import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
} from "@/components/ui";
import { BookMarked } from "lucide-react";

function Header() {
  const navigate = useNavigate();

  const handleClickBookmarkLink = () => {
    navigate("/bookmark");
  };

  return (
    <header className={styles.header}>
      <div className={styles[`header__logo-box`]}>
        <Link to={"/"}>
          <img
            src="src/assets/logo.svg"
            alt=""
            className={styles[`header__logo-box__logo`]}
          />
        </Link>
      </div>
      <div className={styles[`header__user-box`]}>
        {/* 북마크 버튼 */}
        <Button variant={"secondary"} onClick={handleClickBookmarkLink}>
          <BookMarked />
          북마크
        </Button>
        <Separator orientation="vertical" className="h-10 mx-1" />
        {/* 아바타  */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* 유저 닉네임 & 이메일 */}
        <div className="flex items-center gap-1">
          <small className="text-base font-medium leading-none">Yoonstar</small>
          &middot;
          <small className="text-base font-medium leading-none">
            Search Image
          </small>
        </div>
      </div>
    </header>
  );
}

export { Header };
