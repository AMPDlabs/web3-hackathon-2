import { useCallback } from "react";
import { abi, contractAddress } from "@/lib/abi";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import type { LifeCycleStatus } from "@coinbase/onchainkit/transaction";
import { Transaction, TransactionButton, TransactionStatusLabel, TransactionToast, TransactionToastAction, TransactionToastIcon, TransactionToastLabel } from "@coinbase/onchainkit/transaction";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import { baseSepolia } from "viem/chains";
import { decodeEventLog } from "viem";

export default function JoinMatchTransaction(match: { matchId: number; betAmount: number }) {
  const handleOnStatus = useCallback(async (status: LifeCycleStatus) => {
    console.log("StatusUpdate", status);
    if (status.statusName === "success") {
      // TODO 5.
    }
  }, []);

  const { address } = useAccount();
  const contracts = [
    {
      address: contractAddress,
      abi: abi,
      functionName: "",
      args: [match.matchId],
      value: match.betAmount,
    },
  ];

  return address ? (
    <Transaction className="w-full" onStatus={handleOnStatus} chainId={baseSepolia.id} contracts={contracts}>
      <TransactionButton text="Join Match TODO 4." />
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
