import { getAvatar, Address, Avatar, Name, Identity, EthBalance } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import { useAccount } from "wagmi";
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownLink, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";

export function WalletComponents() {
  return (
    <Wallet>
      <ConnectWallet withWalletAggregator>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar address={useAccount().address} />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
          Wallet
        </WalletDropdownLink>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
