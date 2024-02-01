import React, { useContext, useEffect, useRef, useState } from "react";

import { KeycloakContext } from "./context/keycloak";
import { AddressCard } from "./components/address-card";
import { PageLoading } from "./components/page-loading";
import wallet, { init } from "./wallet/index";

export default function Dashboard() {
  const auth = useContext(KeycloakContext);

  const [user, setUser] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isConnected, setConnected] = useState<boolean>(false);
  const initRef = useRef<boolean>(false); // Avoid reinitialize

  const openWallet = () => wallet.open();
  const handleLogout = () => auth?.logoutSession();
  const handleRefresh = async () => await auth?.refreshSession(-1);

  useEffect(() => {
    setLoading(true);
    if (auth) {
      try {
        // Read user session from localstorage
        const info = JSON.parse(localStorage.getItem("account") as string);
        if (!initRef.current && info?.token) {
          (async () => {
            // Use fresh tokens to login in wallet
            initRef.current = true;
            const refreshed = await handleRefresh();
            await init(refreshed?.token);

            const walletConnected = wallet.isConnected();
            if (!walletConnected) wallet.connect();
            setUser({ ...info, ...refreshed });
            setConnected(walletConnected);
            setLoading(false);
          })();
        }
      } catch (err) {
        console.log(err);
        handleLogout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {isLoading && <PageLoading />}

      <section style={{ margin: "auto" }}>
        <h3>Hi {user?.name || "..."}, Welcome to wallet</h3>
        {isConnected && <AddressCard />}
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={openWallet}>Your wallet</button>
          <button onClick={handleRefresh}>Refresh</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </section>
    </main>
  );
}
