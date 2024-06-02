"use client";
import { useAccount } from "wagmi";
import EnsCard from "@/components/ensCard";

export default function Dashboard() {
  const { address } = useAccount();
  return (
    <div className="min-h-screen p-24">
      <div className="text-2xl ">Your points: 0</div>
      <div className="mt-10">
        <h2 className="text-xl">Increase Score: </h2>

        <div className="grid grid-cols-4 gap-4 mt-4">
            <EnsCard />
        </div>
      </div>
    </div>
  );
}
