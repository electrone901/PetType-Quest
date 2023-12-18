import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function Landing() {
  const router = useRouter();
  const { address } = useAccount();
  console.log("🚀 ~ file: Landing.tsx:11 ~ Landing ~ address:", address);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState(true);
  const [petName, setPetName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const imageName = "type1";

  const { writeAsync: createProfile, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "UserProfile",
    functionName: "createProfile",
    args: [address, imageName, petName],
    // For payable functions, expressed in ETH
    // value: "0.01",
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      router.push("/typinggame");
    },
  });

  return (
    <div className="px-20 py-20 bg-base-100 flex justify-center items-center text-white">
      <div className="text-center bg-gray-700  p-8">
        <div className="flex">
          <p className=" font-bold text-xl  mr-8">1. Connect wallet</p>
          <p className=" font-bold text-2xl text-green-500">
            <FaCheckCircle />
          </p>
        </div>

        <div className="flex  mt-2">
          <p className=" font-bold text-xl  mr-8">2. Select your pet</p>
          <p className=" font-bold text-2xl text-green-500">
            <FaCheckCircle />
          </p>
        </div>
        <div className="flex justify-center items-center  gap-4">
          {["/assets/1.png", "/assets/2.png", "/assets/3.png"].map((imageUrl, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(imageUrl)}
              className={`relative cursor-pointer transition-transform transform ${
                selectedImage === imageUrl ? "border-4 border-blue-500" : ""
              }`}
            >
              <Image src={imageUrl} width={200} height={400} alt="pet" className="object-cover rounded-md" />
            </div>
          ))}
        </div>

        <div className="flex mt-6">
          <p className=" font-bold text-xl  mr-8">3. Name your pet</p>
          <p className=" font-bold text-2xl text-green-500">
            <FaCheckCircle />
          </p>
        </div>

        <input
          type="text"
          id="petName"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          placeholder="Enter your pet's name"
          value={petName}
          onChange={e => setPetName(e.target.value)}
        />
        <button
          onClick={() => createProfile()}
          className="mt-8 bg-green-500 text-white px-6 py-5 w-[200px] rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Landing;
