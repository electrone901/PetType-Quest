# Typing Game with Pet Feeding Concept

In this typing game with a pet feeding concept, users create an account and set up a virtual pet by choosing a pet and naming it. They start with a default amount of calories for their pet. The typing game is the core activity, where users play to earn calories for their pet by correctly typing words. Different difficulty levels or game modes offer varying caloric rewards. Users can monitor their pet's status on a virtual dashboard and must feed their pet 120 calories every 24 hours to keep it alive. The pet has a lifecycle, and if it doesn't receive the required calories within the timeframe, it "dies." Users can earn rewards or achievements for keeping their pet alive for extended periods, adding a challenge and incentive to the game.

## Quickstart

To get started with this project, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/electrone901/PetType-Quest.git
cd PetType-Quest
yarn install
```

2. Copy the .env.example file and change name to .env.local. Set the MONGO_URI to the database you are using.

3. In the terminal, start your the project:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

## Technologies

For this project, our technology stack encompasses several key components:

We utilize IPFS-NFTStorage to securely store all user information. This ensures data integrity and reliability.

Our smart contract development relies on Solidity and Hardhat, providing a robust and well-tested foundation for our blockchain operations.

For local blockchain development and testing, we turn to Hardhat, which facilitates efficient and reliable development workflows.

On the frontend, we harness the power of Tailwind, Next.js, and React.js to create an engaging and user-friendly interface. Ethers.js serves as the bridge to connect with the blockchain.
