# MCP Ethers Wallet
[![smithery badge](https://smithery.ai/badge/@crazyrabbitLTC/mcp-ethersjs-server)](https://smithery.ai/server/@crazyrabbitLTC/mcp-ethersjs-server)

A Model Context Protocol (MCP) server that provides Ethereum wallet functionality using ethers.js v6.

## Overview

The MCP Ethers Wallet exposes Ethereum functionality to LLM applications through the Model Context Protocol. It provides tools for:

- Network information and management
- Wallet creation and management
- Transaction creation and sending
- Contract interaction (ERC20, ERC721, ERC1155)
- ENS resolution
- Unit conversion
- Gas estimation
- Transaction history

This server follows the MCP specification, making it compatible with any MCP client, such as Claude Desktop.

## Using with MCP Tools

To use this as an MCP server with tools like Claude Desktop, use the following configuration:

```json
{
  "ethers": {
    "command": "node",
    "args": [
      "pathTo/ethers-server/build/src/mcpServer.js"
    ],
    "env": {
      "ALCHEMY_API_KEY": "key goes here",
      "INFURA_API_KEY": "key goes here"
    }
  }
}
```

Replace `pathTo/ethers-server` with the actual path to your installation directory, and add your API keys.

## Installation

### Installing via Smithery

To install Ethers Wallet for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@crazyrabbitLTC/mcp-ethersjs-server):

```bash
npx -y @smithery/cli install @crazyrabbitLTC/mcp-ethersjs-server --client claude
```

### Manual Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/ethers-server.git
cd ethers-server

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Quick Start

### Starting the Server

```bash
# Using Node.js
npm start

# Using Bun (recommended for faster performance)
bun start
```

### Using with Claude Desktop

1. Configure Claude Desktop to use this server:
   - Go to Settings > Model Context Protocol
   - Set Command to: `node path/to/ethers-server/build/src/mcpServer.js`

2. Use the Ethers tools in your Claude conversations.

### Testing with MCP Inspector

The MCP Inspector is a tool for testing and debugging MCP servers.

```bash
# Install MCP Inspector globally
npm install -g @modelcontextprotocol/inspector

# Run it with your server
mcp-inspector --command "node build/src/mcpServer.js"
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```
# Required
ALCHEMY_API_KEY=your_alchemy_api_key
INFURA_API_KEY=your_infura_api_key

# Optional
DEFAULT_NETWORK=mainnet  # Default: mainnet
LOG_LEVEL=info           # Default: info (options: error, warn, info, debug)
```

### Network Configuration

The server supports multiple Ethereum and EVM-compatible networks. The supported networks are defined in `src/config/networkList.ts`:

#### Mainnet Networks
- Ethereum (ETH)
- Polygon PoS (POL)
- Arbitrum (ETH)
- Arbitrum Nova (ETH)
- Optimism (ETH)
- Avalanche C-Chain (AVAX)
- Base (ETH)
- Polygon zkEVM (ETH)
- Linea (ETH)
- BNB Smart Chain (BNB)
- Scroll (ETH)
- Rari Chain Mainnet (ETH)
- Berachain (BERA)
- Sonic Mainnet (S)

#### Testnet Networks
- Monad Testnet (MON)
- MEGA Testnet (ETH)

You can specify a network when using tools with the `provider` parameter, e.g., `"provider": "polygon"` or `"provider": "bera"`.

### Custom RPC URLs

You can also use a custom RPC URL:

```
"provider": "https://my-custom-rpc.example.com"
```

## Available Tools

### Core Network Tools

- **getSupportedNetworks**: Get a list of all supported networks and their configurations
- **getBlockNumber**: Get the current block number
- **getBlockDetails**: Get details about a block
- **getTransactionDetails**: Get details about a transaction
- **getGasPrice**: Get the current gas price
- **getFeeData**: Get the current network fee data

### Wallet Tools

- **generateWallet**: Generate a new Ethereum wallet
- **loadWallet**: Load an existing wallet from a private key
- **checkWalletExists**: Check if a wallet is configured on the server
- **getWalletBalance**: Get the ETH balance of a wallet
- **getWalletTransactionCount**: Get the number of transactions sent by an address
- **signMessage**: Sign a message with the loaded wallet
- **ethSign**: Sign data using the Ethereum eth_sign method (legacy)

### Contract Tools

- **getContractCode**: Get a contract's bytecode
- **callContractMethod**: Call a read-only method on a contract
- **estimateGas**: Estimate gas for a transaction

### ENS Tools

- **lookupAddress**: Get the ENS name for an address
- **resolveName**: Get the address for an ENS name

### Unit Conversion Tools

- **formatEther**: Convert a wei value to a decimal string in ether
- **parseEther**: Convert an ether value to wei
- **formatUnits**: Convert a value to a decimal string with specified units

### ERC20 Tools

- **erc20GetTokenInfo**: Get basic token information (name, symbol, decimals)
- **erc20GetBalance**: Get token balance for an address
- **erc20Transfer**: Transfer tokens between accounts
- **erc20GetAllowance**: Get token approval allowance
- **erc20Approve**: Approve tokens for spending by another address

### ERC721 Tools

- **erc721GetTokenInfo**: Get basic NFT collection information
- **erc721GetBalance**: Get NFT balance for an address
- **erc721OwnerOf**: Get the owner of a specific NFT
- **erc721GetTokenURI**: Get token URI metadata for an NFT
- **erc721Transfer**: Transfer an NFT to another address
- **erc721SafeTransfer**: Safely transfer an NFT to another address

### ERC1155 Tools

- **erc1155GetTokenInfo**: Get basic multi-token information
- **erc1155GetBalance**: Get token balance for an address and token ID
- **erc1155GetBatchBalance**: Get multiple token balances in a single call
- **erc1155GetURI**: Get metadata URI for a token
- **erc1155SafeTransfer**: Safely transfer tokens to another address
- **erc1155SafeBatchTransfer**: Safely transfer multiple tokens in a single call

## Tool Usage Examples

### Getting Network Information

```json
{
  "name": "getSupportedNetworks",
  "arguments": {}
}
```

### Getting Wallet Balance

```json
{
  "name": "getWalletBalance",
  "arguments": {
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "provider": "mainnet"
  }
}
```

### Getting ERC20 Token Information

```json
{
  "name": "erc20GetTokenInfo",
  "arguments": {
    "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "provider": "mainnet"
  }
}
```

### Calling a Contract Method

```json
{
  "name": "callContractMethod",
  "arguments": {
    "contractAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "methodName": "symbol",
    "params": [],
    "abi": ["function symbol() view returns (string)"],
    "provider": "mainnet"
  }
}
```

## Caching

The server implements caching for certain operations to improve performance and reduce API calls:

- Token information (name, symbol, decimals)
- Token balances
- Contract method calls

The cache uses a time-to-live (TTL) mechanism that automatically expires entries after a configurable period.

## Rate Limiting

The server implements rate limiting for certain operations:

- Write operations (transfers, approvals)
- Wallet generation
- Contract interactions

This prevents abuse and ensures the server remains responsive.

## Error Handling

The server includes comprehensive error handling:

- Custom error classes for specific error types
- Detailed error messages
- Appropriate HTTP status codes
- Safe error serialization to prevent sensitive data leaks

## Development

### Building

```bash
npm run build
```

### Testing

The server includes comprehensive test suites:

#### Running All Tests with Bun (Recommended)

```bash
# Start a Hardhat node in a separate terminal
npx hardhat node

# Run all tests
bun test
```

#### Running MCP Client Tests

These tests validate the MCP protocol implementation by spawning the server and sending real MCP requests:

```bash
bun run test:client:mcp
```

#### Individual Test Categories

```bash
# Run ERC20 tests
bun test src/services/erc/erc20.test.ts

# Run ERC721 tests
bun test src/services/erc/erc721.test.ts

# Run ERC1155 tests
bun test src/services/erc/erc1155.test.ts

# Run core tool tests
bun test src/tests/write-methods.test.ts
```

#### Test Environment

Tests use the `bun.setup.ts` file to configure the test environment, including setting up Hardhat as the default provider.

## Security Considerations

- **Private Keys**: The server can store private keys in memory. Exercise caution with the `saveToEnv` option in wallet operations.
- **API Keys**: Your Alchemy and Infura API keys are used to connect to Ethereum networks. Never expose your `.env` file.
- **Eth Sign**: The `ethSign` method can sign transaction-like data, which is less secure than `signMessage`. Use with caution.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Dennison Bertram (dennison@tally.xyz) 