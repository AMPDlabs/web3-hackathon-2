# 🚀 OPEN HACKATHON 2 - Web3 for beginners

## ⚙️ Prerequisites
Before we start there are a few things you need to do.

### Wallet setup
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Sepolia ETH from Faucet - https://www.alchemy.com/faucets/base-sepolia

### API Key
* Obtain a Public API Key from the Coinbase Developer Platform APIs https://portal.cdp.coinbase.com/products/onchainkit
* Create a file called .env and copy the content from .env.example
* Copy your key into PUBLIC_ONCHAINKIT_API_KEY in the .env file.

## ✨ Optional!
### Wallet Key (optional already provided in project)
* Go to https://cloud.walletconnect.com/sign-in
* Sign up
* Create  a project
* Copy Project ID and add to PUBLIC_WALLET_CONNECT_PROJECT_ID in .env file

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
