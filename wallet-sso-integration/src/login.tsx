import React, { useContext, useEffect } from "react";

import { KeycloakContext } from "./context/keycloak";

export default function Login() {
  const auth = useContext(KeycloakContext);

  useEffect(() => {
    try {
      // Redirect logged in user to dashboard
      if (JSON.parse(localStorage.getItem("account") as string)) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      auth?.logoutSession();
    }
  }, []);

  return (
    <main style={{ height: "100vh", display: "flex" }}>
      <section style={{ margin: "auto" }}>
        <h1>Welcome, login to wallet</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <button onClick={() => auth?.loginUsingIdp("google")}>Google</button>
          <button onClick={() => auth?.loginUsingIdp("facebook")}>Facebook</button>
          <button onClick={() => auth?.loginUsingIdp("microsoft")}>Microsoft</button>
        </div>
      </section>
    </main>
  );
}
