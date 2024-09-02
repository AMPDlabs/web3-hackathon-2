"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider, connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { ModeToggle } from "@/components/modeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { baseSepolia } from "wagmi/chains";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WalletComponents } from "@/components/walletComponents";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended Wallet",
        wallets: [coinbaseWallet],
      },
      {
        groupName: "Other Wallets",
        wallets: [rainbowWallet, metaMaskWallet],
      },
    ],
    {
      appName: "Coinflip",
      projectId: "6d2d354c2a2b5e079fc777f8a5514d17",
    }
  );

  const wagmiConfig = getDefaultConfig({
    appName: "onchainkit",
    connectors,
    projectId: "6d2d354c2a2b5e079fc777f8a5514d17",
    chains: [baseSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={process.env.PUBLIC_ONCHAINKIT_API_KEY} chain={baseSepolia}>
          <RainbowKitProvider modalSize="compact">
            <div className="fixed top-0 left-0 right-0 p-4 flex justify-between text-sm top-0 z-50 w-full border-b dark:border-none dark:bg-white/5 backdrop-blur-sm">
              <div className="text-2xl flex justify-center items-center">
                <Image className="mr-2" src="/logo.png" width={32} height={32} alt="AMPD Labs logo" />
                <span className="text-base">AMPDLabs</span>
              </div>
              <div className="flex justify-end">
                <WalletComponents />
                <div className="ml-2">
                  <ModeToggle />
                </div>
              </div>
            </div>
            {children}
            <footer className="fixed bottom-0 left-0 right-0 text-center p-2 flex justify-center items-center text-sm">Made with ❤️ by your frens at AMPDLabs </footer>
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
