import { useCallback } from "react";
import { abi, contractAddress } from "@/lib/abi";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import type { LifeCycleStatus } from "@coinbase/onchainkit/transaction";
import { Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel, TransactionToast, TransactionToastAction, TransactionToastIcon, TransactionToastLabel } from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { baseSepolia } from "viem/chains";
import { parseEther } from "viem";

export default function CreateMatchTransaction(props: any) {
  const handleOnStatus = useCallback((status: LifeCycleStatus) => {
    props.handleOnStatus(status);
  }, []);
  const { address } = useAccount();

  const contracts = [
    {
      address: contractAddress,
      abi: abi,
      functionName: "createMatch",
      value: parseEther("0.0001"),
    },
  ];

  return address ? (
    <Transaction onStatus={handleOnStatus} chainId={baseSepolia.id} contracts={contracts}>
      <TransactionButton text="Create Match 🚀" />
      <TransactionStatusLabel />
      <TransactionToast>
        <TransactionToastIcon />
        <TransactionToastLabel />
        <TransactionToastAction />
      </TransactionToast>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
