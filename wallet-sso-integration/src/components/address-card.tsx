import React, { useEffect, useState } from "react";

import wallet from "../wallet";

export function AddressCard() {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (wallet.isConnected()) {
        try {
          const walletAddress = await wallet.getAddress();
          setAddress(walletAddress);
        } catch (e) {
          console.error(e);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return <p>Your wallet address is {address || "..."}</p>;
}
