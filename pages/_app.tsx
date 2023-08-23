import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import BlockchainProvider from "../utils/contexts/BlockchainProvider";
import { PopupContext } from "../utils/contexts/PopupContext";
import ProposalsProvider from "../utils/contexts/ProposalsContext";
import StatusUpdater from "../utils/contexts/StatusUpdater";
import { Theme, ThemeContext } from "../utils/contexts/ThemeContext";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import Web3ModalProvider from "../utils/contexts/Web3ModalProvider";
import "../styles/globals.scss";
import PreviewProvider, { PreviewContext } from "../utils/contexts/PreviewContext";
import { SpaceProvider } from "../utils/contexts/SpaceContext";

export default function App({ Component, pageProps }: AppProps) {
  const [popup, setPopup] = useState(false);
  const [theme, setTheme] = useState(Theme.DARK);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.style.backgroundColor = "#0d1117";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Web3ModalProvider>
        <BlockchainProvider>
          <PopupContext.Provider value={{ popup, setPopup }}>
            <ProposalsProvider>
              <StatusUpdater>
                <PreviewProvider>
                  <SpaceProvider>
                    <Component {...pageProps} />
                  </SpaceProvider>
                </PreviewProvider>
                <NotificationContainer />
              </StatusUpdater>
            </ProposalsProvider>
          </PopupContext.Provider>
        </BlockchainProvider>
      </Web3ModalProvider>
    </ThemeContext.Provider>
  );
}
