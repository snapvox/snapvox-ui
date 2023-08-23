import { useContext } from "react";
import { Theme, ThemeContext } from "../../utils/contexts/ThemeContext";
import List from "./components/List";
import Search from "./components/Search";
import styles from "./styles.module.scss";

const SpacesComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <Search />
          <List />
          <div className={styles.contentGrid}>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacesComponent;
