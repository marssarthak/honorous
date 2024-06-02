"use client"
import { useAccount, useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi';
import { normalize } from 'viem/ens';
import { formatAddress } from '@ens-tools/format';


import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { addEnsContracts } from '@ensdomains/ensjs'
import { getNamesForAddress } from '@ensdomains/ensjs/subgraph'
import { useQuery } from '@tanstack/react-query';

const client = createPublicClient({
  chain: addEnsContracts(mainnet),
  transport: http(),
})

export const NameLookup = () => {
    const name = normalize("luc.eth");
    const { data: avatar } = useEnsAvatar({ name })
    const { data: ethereum } = useEnsAddress({ name, coinType: 60 })

    const { data: names} = useQuery({
        queryKey: ["names"],
        queryFn: () => getNamesForAddress(client, {
            address: '0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7',
        }),
    })

   
    return (
        <div>
			{ethereum && formatAddress(ethereum)}<br />
			{avatar && <img src={avatar} />}
            {names && names.map((name) => <div key={name.id}>{JSON.stringify(name)}</div>)}
		</div>
    );
};