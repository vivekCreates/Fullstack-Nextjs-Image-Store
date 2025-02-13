"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "imagekitio-next";


const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;




export default function Provider({children}:{children:React.ReactNode}) {
  
    const authenticator = async () => {
      try {
        const response = await fetch("/api/auth/imagekit-auth");
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        return response.json()
      } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
      }
    };    
  
  return (
    <div className="App">
      <SessionProvider>
        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}>
          {children}
        </ImageKitProvider>
      </SessionProvider>
    </div>
  );
}

