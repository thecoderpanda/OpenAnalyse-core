"use client";

import { useEffect, useState } from "react";
import { CreateSchema } from "./_components/schema/CreateSchema";
import { SchemaDetails } from "./_components/schema/SchemaDetails";
import { Abi } from "abitype";
import type { NextPage } from "next";
import { createPublicClient, createWalletClient, custom, getContract, http } from "viem";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

const Home: NextPage = () => {
  useAccount();

  const [schemas, setSchemas] = useState<any>();
  const [odl, setOdl] = useState<any>();

  useEffect(() => {
    const walletClient = createWalletClient({
      chain: {
        id: 22068238331863,
        name: "odlSubnet",
        nativeCurrency: {
          name: "ODL Token",
          symbol: "ODL",
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ["https://testnet-rpc.adafel.com"],
          },
        },
      },
      transport: custom(window.ethereum as any),
    });

    const publicClient = createPublicClient({
      chain: {
        id: 22068238331863,
        name: "odlSubnet",
        nativeCurrency: {
          name: "Analyze Token",
          symbol: "ALY",
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ["https://testnet-rpc.adafel.com"],
          },
        },
      },
      transport: http(),
    });

    const getSchemas = async () => {
      try {
        const userAnalyticsContractData = getContract({
          abi: deployedContracts[22068238331863].UserAnalytics.abi as Abi,
          address: deployedContracts[22068238331863].UserAnalytics.address,
          client: { public: publicClient, wallet: walletClient },
        });
        setOdl(userAnalyticsContractData);

        const schemas_ = await userAnalyticsContractData.read.getAllSchemas();

        console.log(schemas_);
        setSchemas(schemas_);
      } catch (e) {
        console.log(e);
      }
    };

    getSchemas();
  }, []);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Open Data Library (ODL)</span>
            <span className="block text-2xl mb-2">Dashboard</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-10 w-full max-w-7xl">
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
              <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                <div className="flex items-center justify-center space-x-2">
                  <p className="my-0 text-sm">Schemas</p>
                </div>
              </div>
              <div className="p-5 divide-y divide-base-300 h-screen overflow-scroll">
                <SchemaDetails schemaList={schemas} odl={odl} />
              </div>
            </div>
          </div>
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
              <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                <div className="flex items-center justify-center space-x-2">
                  <p className="my-0 text-sm">Create</p>
                </div>
              </div>
              <div className="p-5 divide-y divide-base-300">
                <CreateSchema odl={odl} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
