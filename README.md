## Project info

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```


## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How to connect blockchain and server 

Connect metamask wallet to Ganache by 

- importing private key
- Adding local test network as ganache with the help of RPC url(from ganache)

## How can I deploy this project?

In VSCode open terminal and give commands :
  - cd blockchain
  - npx hardhat compile
  - npx hardhat run scripts/deploy.js --network ganache

  - cd server
  - npm run dev

  - cd src
  - npm run dev
  
