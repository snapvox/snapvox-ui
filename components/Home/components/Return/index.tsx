import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../utils/contexts/ThemeContext";
import backArrow from "../../../../public/assets/svgicons/backArrow.svg";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import ProposalsContext from "../../../../utils/contexts/ProposalsContext";

const Return = () => {
  const { theme } = useContext(ThemeContext);
  const route = useRouter();

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container} onClick={() => route.push('/')}>
        <div className={styles.left}>
          <span>Go Back to Spaces</span>
        </div>
        <div className={styles.right}>
          <img src={backArrow.src} alt="Inverted Share" />
        </div>
      </div>
    </div>
  );
};

export default Return;
