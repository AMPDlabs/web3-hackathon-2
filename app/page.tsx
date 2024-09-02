"use client";

import { useReadContract } from "wagmi";
import { abi, contractAddress } from "@/lib/abi";
import { baseSepolia } from "viem/chains";
import { formatEther } from "viem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CreateMatchTransaction from "@/components/createMatchTransaction";
import JoinMatchTransaction from "@/components/joinMatchTransaction";
import { useEffect, useState } from "react";

export default function Home() {
  const [resetKey, setResetKey] = useState(0);
  const [refreshMatches, setRefreshMatches] = useState(false);

  const {
    data: incompleteMatches,
    isError,
    isLoading,
    refetch: refetchIncompleteMatches,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "",
    chainId: baseSepolia.id,
  });

  const totalMatchesResult = useReadContract({
    chainId: baseSepolia.id,
    address: contractAddress,
    abi,
    functionName: "",
  });

  const createMatchStatusUpdate = (status) => {
    if (status.statusName === "success") {
      // Trigger refetch of incomplete matches
      setRefreshMatches(true);
      console.log("refetching matches", status);

      // Trigger reset of Create Match button
      setTimeout(() => {
        setResetKey((prevKey) => prevKey + 1);
        console.log("refetching create match button");
      }, 2000);
    }
  };

  // Use useEffect to refetch matches when refreshMatches is set to true
  useEffect(() => {
    if (refreshMatches) {
      refetchIncompleteMatches();
      setRefreshMatches(false); // Reset refresh flag after refetching
    }
  }, [refreshMatches, refetchIncompleteMatches]);

  const getMatchList = () => {
    if (incompleteMatches?.length > 0) {
      return incompleteMatches?.map((match, index) => (
        <Card className="m-2" key={match.matchId}>
          <CardHeader>
            <CardTitle>Match: {match?.matchId.toString()}</CardTitle>
            <CardDescription>
              <a rel="noreferrer" target="_blank" href={`https://sepolia.basescan.org/address/${match?.player1}`}>
                <Button variant="outline">
                  <OpenInNewWindowIcon className="mr-2" />
                  Player 1
                </Button>
              </a>
            </CardDescription>
            <CardDescription>Bet: {formatEther(match?.bet1)}ETH</CardDescription>
          </CardHeader>
          <CardFooter>
            <JoinMatchTransaction matchId={match.matchId} betAmount={match.bet1} />
          </CardFooter>
        </Card>
      ));
    }
  };

  return (
    <main className="min-h-screen dark:bg-gradient-to-r dark:from-black dark:via-indigo-900 dark:to-black bg-gradient-to-b from-stone-50 to-rose-50">
      <div className="flex flex-col items-center">
        <h1 className="mt-24 lg:text-4xl sm:text-3xl text-lg">
          Welcome to <b className="lg:text-4xl sm:text-3xl text-xl uppercase">Hackathon-2</b>
        </h1>
        <div className="max-w-4xl text-center opacity-80 pl-8 pr-8 pt-2 sm:text-xl text-s">
          This NextJs template is setup to use <a href="https://ui.shadcn.com/">⚫️ shadcn/ui</a>, <a href="https://github.com/rainbow-me/rainbowkit">🌈 RainbowKit</a>, <a href="https://onchainkit.xyz/">🔵 OnchainKit</a> and <a href="https://wagmi.sh/">🟣🩵 wagmi.sh</a>. It also comes equipped with a
          light and dark mode toggle setup ☀️🌕 and read/write integration with smart contract, enjoy 🤝.
        </div>
        <div className="max-w-4xl text-center opacity-80 pl-8 pr-8 pt-10 sm:text-xl text-s">
          <Badge>TODO 1.</Badge> Connect smart contract address + abi.
          <br />
          Open <strong>todo.md</strong> for details.
        </div>
        <div className="mt-12">
          <Badge>{"TODO 2."}</Badge> matches have been played so far.
          <div className="flex items-center justify-center mt-2">
            <CreateMatchTransaction key={resetKey} handleOnStatus={createMatchStatusUpdate} />
          </div>
        </div>
        <div className="mt-8">
          <div className="mb-32 justify-center items-center text-center flex flex-wrap">
            {isLoading && <p>Loading matches...</p>}
            {isError && <p>Error loading matches.</p>}
            {getMatchList()}
          </div>
        </div>
      </div>
    </main>
  );
}
