"use client";
import Cookies from 'js-cookie'
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ConnectContextType {
  publicKey: string | null;
  connect: (token: string | null) => void;
  disconnect: () => void;
}

const ConnectContext = createContext<ConnectContextType | null>(null);

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<string | null>(() => {
    return Cookies.get("publicKey") || null; // Load from cookies
  });

  const connect = (publicKey: string | null) => {
    setPublicKey(publicKey);
    if (publicKey) {
      Cookies.set("publicKey", publicKey, { secure: true, sameSite: "strict" });
      console.log(
        "Public key set in cookies:", publicKey
      );
      

    } else {
      Cookies.remove("publicKey");
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    Cookies.remove("publicKey");
  };

  return (
    <ConnectContext.Provider
      value={{ publicKey, connect, disconnect }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => {
  const context = useContext(ConnectContext);
  if (!context) {
    throw new Error("useConnect must be used within an ConnectionProvider");
  }
  return context;
};
