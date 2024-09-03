"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { RainbowKitProvider, connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { useTheme } from "next-themes";
import Image from "next/image";
import { baseSepolia } from "wagmi/chains";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

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
            {children}
            <footer className="fixed bottom-0 left-0 right-0 text-center p-2 flex justify-center items-center text-sm">Made with ❤️ by your frens at AMPDLabs </footer>
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
