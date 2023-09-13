import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";

import { Theme, ThemeContext } from "../../utils/contexts/ThemeContext";

import moon from "../../public/assets/darkmode/moon.svg";
import sun from "../../public/assets/lightmode/sun.svg";
import logo from "../../public/assets/logo/votinglogo.svg";
import menu from '../../public/assets/svgicons/hamburguermenu.svg'
import close from '../../public/assets/svgicons/menuclose.svg'

import { PopupContext } from "../../utils/contexts/PopupContext";
import { Web3ModalContext } from "../../utils/contexts/Web3ModalProvider";
import { ellipseAddress } from "../../utils";
import styles from "./styles.module.scss";

const Navbar = () => {
  const router = useRouter();
  const { setPopup } = useContext(PopupContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { connect, disconnect, account } = useContext(Web3ModalContext);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const [menuState, setMenuState] = useState(false);

  const toggleMenu = () => {
    const menuContainer = document.querySelector(`.${styles.menuContainer}`);
    
    if (menuContainer) {
      if (menuState) {
        // Fechar o menu
        menuContainer.classList.add(styles.closeMenu);
        menuContainer.addEventListener("animationend", handleAnimationEnd);
      } else {
        // Verifique se o menu está fechado antes de abri-lo novamente
        const isOpening = menuContainer.classList.contains("open");
        if (!isOpening) {
          // Abrir o menu apenas se ele estiver fechado
          setMenuState(true);
        }
      }
    }
  };
  
  const handleAnimationEnd = () => {
    const menuContainer = document.querySelector(`.${styles.menuContainer}`);
    
    if (menuContainer) {
      menuContainer.removeEventListener("animationend", handleAnimationEnd);
      
      if (menuState) {
        // Mantenha a classe de fechamento após a animação de fechamento
        menuContainer.classList.remove(styles.closeMenu);
      } else {
        // Remova a classe de fechamento após a animação de abertura
        menuContainer.classList.remove(styles.closeMenu);
      }
    }
    setMenuState(false)
  };

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        {menuState == true ?
          <div className={`${styles.menuContainer} ${menuState ? 'open' : ''}`}>
            <div className={styles.navbar}>
              <div className={styles.logo} onClick={toggleMenu}>
                <Image src={logo} alt='Logo' width={65} />
              </div>

              <div className={styles.close} onClick={toggleMenu}>
                <Image src={close} alt='Close' width={24} />
              </div>
            </div>

            <div className={styles.optionsContainer}>
              <div className={styles.option} onClick={() => window.open('/spaces', '_self')}>
                Vote Spaces
              </div>

              <div className={styles.option} onClick={() => window.open('/staking', '_self')}>
                Staking
              </div>
            </div>

            <div className={styles.policy}>
              Privacy Policy
            </div>
          </div>
        :null}

        <div className={styles.limitedContainer}>
          <div className={styles.logoContainer}>
            <div className={styles.menu}>
              <Image src={menu} alt="Menu" width={26} onClick={() => setMenuState(true)} />
            </div>

            <div className={styles.logo} onClick={() => router.push("/")}>
              <Image src={logo} alt="Logo" />
            </div>
          </div>

          <div className={styles.userOptions}>
            {!account ? (
              <div
                className={styles.connectButton}
                onClick={() => {
                  if (localStorage.getItem("terms") == "true") {
                    handleConnect();
                  } else {
                    setPopup(true);
                  }}
                }
              >
                Connect Wallet
              </div>
            ) : (
              <div className={styles.connectButton} onClick={handleDisconnect}>
                {ellipseAddress(account)}
              </div>
            )}

            {/* <div
              className={
                theme == Theme.DARK ? styles.darkMode : styles.lightMode
              }
              onClick={() => {
                if (theme == Theme.DARK) {
                  setTheme(Theme.LIGHT);
                } else {
                  setTheme(Theme.DARK);
                }
              }}
            >
              <div className={styles.limitWidth}>
                <Image src={theme === Theme.DARK ? sun : moon} alt="Switch" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;