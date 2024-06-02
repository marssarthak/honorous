"use client";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NameLookup } from "@/components/ens";

import { GlobeDemo } from "@/components/world";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="flex-1 relative h-80">
        <GlobeDemo />
      </div>
      <div className="z-10 flex flex-col gap-4 flex-1">
        <div className="col-span-2 text-6xl md:text-7xl lg:row-start-2">
          Honoros
        </div>
        <div className="col-span-2 mb-4 text-2xl leading-none text-foreground-2 md:text-5xl">
          Are you a human?
        </div>
        {/* <GlobeDemo  /> */}
        <div className="col-span-2 max-w-md text-lg lg:max-w-sm mb-4">
          Honoros helps you prove your humanity and reputation. You own all your
          data and choose who to share it with.
        </div>
        {address ? (
          <Link href="/dashboard">
          <Button onClick={() => {}} variant="default">Dashboard</Button>
          </Link>
        ) : (
          <ConnectButton />
        )}
      </div>

      {/* <NameLookup /> */}
    </div>
  );
}
