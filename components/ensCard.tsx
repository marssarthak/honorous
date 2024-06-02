"use client";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { addEnsContracts } from "@ensdomains/ensjs";

const client = createPublicClient({
  chain: addEnsContracts(mainnet),
  transport: http(),
});
export default function EnsCard() {
  const { address } = useAccount();
  const { data: names, isLoading } = useQuery({
    queryKey: ["names"],
    queryFn: () =>
      getNamesForAddress(client, {
        address: "0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7",
      }),
    enabled: !!address,
  });

  async function handleFileUpload(userData) {
    const fileInput = event.target.files[0];
    if (!fileInput) return;

    try {
      const ipfsHash = await uploadJSONFile(fileInput);
      console.log(`File uploaded to IPFS with hash: ${ipfsHash}`);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  }
  console.log(!!names?.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ENS</CardTitle>
        <CardDescription>Available points: 10.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">ENS</p>
            <p className="text-sm text-muted-foreground">
              Verify your ENS name.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Verify</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify your ENS name</DialogTitle>
              <DialogDescription>
                {isLoading
                  ? "Loading..."
                  : names?.length
                  ? "You have a ENS. Claim by clicking claim button."
                  : "You should have a ENS name linked with this account address."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button disabled={!names?.length}>Claim</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
