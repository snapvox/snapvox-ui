import { useContext } from "react";
import { Theme, ThemeContext } from "../../utils/contexts/ThemeContext";
import About from "./components/About";
import Return from "./components/Return";
import List from "./components/List";
import Search from "./components/Search";
import styles from "./styles.module.scss";
import AboutDAO from "./components/AboutDAO";
import { useSpaceContext } from "../../utils/contexts/SpaceContext";

import xdclogo from '../../public/assets/spaces/xdc-logo.svg'
import snapvoxlogo from '../../public/assets/spaces/snapvox-logo.svg'

const HomeComponent = () => {
  const { theme } = useContext(ThemeContext);
  const { spaceType } = useSpaceContext()

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <Search />
          <div className={styles.contentGrid}>
            <div className={styles.left}>
              <Return />
              {spaceType == 'XDC' ?
                <AboutDAO id={2} image={xdclogo} title="XDC Community" description="A hub for proposals related to the XDC Community." isActive={true} isVerified={false} />
              :
                <AboutDAO id={1} image={snapvoxlogo} title="SnapVox DAO" description="A hub for making decisions about the future of the Snapvox dApp." isActive={true} isVerified={true} />
              }
              <About />
            </div>

            <div className={styles.right}>
              <List />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
