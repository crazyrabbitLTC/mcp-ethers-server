# MCP Ethers Wallet ![NPM Version](https://img.shields.io/npm/v/mcp-ethers-wallet)

A Model Context Protocol server for interacting with Ethereum wallets and networks using Ethers.js v6. This server provides LLMs with a standardized interface to interact with Ethereum networks, smart contracts, and wallets.

<a href="https://glama.ai/mcp/servers/j75jbdup5m">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/j75jbdup5m/badge" alt="Ethers Wallet MCP server" />
</a>

## Overview

The MCP Ethers Wallet server implements the [Model Context Protocol](https://modelcontextprotocol.io) specification, providing LLMs with tools to:

- Query blockchain data across multiple networks
- Interact with smart contracts
- Manage wallet operations
- Resolve ENS names
- Handle transactions
- Estimate gas costs

## Installation

```bash
npm install mcp-ethers-wallet
```

## Quick Start

### Starting the Server

```typescript
import { startServer } from 'mcp-ethers-wallet';

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
```

### Using with Claude Desktop

1. Install Claude Desktop
2. Add a new MCP server with the following configuration:
   ```json
    "ethers": {
      "command": "node",
      "args": [
        "/path-to-mcp-ethers-wallet/build/src/index.js"
      ],
      "env": {
        "ALCHEMY_API_KEY": "<<your alchemy api key>>"
      }
    }
   ```
3. The tools will now be available in your Claude conversations

### Testing with MCP Inspector

1. Install the MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. In another terminal, run the inspector:
   ```bash
   mcp-inspector
   ```

4. Open http://localhost:5173 in your browser to interact with the tools

## Available Tools

### Network Information
- `getSupportedNetworks`: Get a list of all supported networks and their configurations
- `getBlockNumber`: Get the current block number for a network
- `getBlockDetails`: Get detailed information about a specific block
- `getGasPrice`: Get the current gas price
- `getFeeData`: Get detailed fee data including base fee and priority fee

### Wallet Operations
- `checkWalletExists`: Check if a wallet is configured (without exposing private keys)
- `getWalletBalance`: Get the native token balance of a wallet
- `getWalletTransactionCount`: Get the number of transactions sent from a wallet
- `getERC20Balance`: Get the balance of an ERC20 token for a wallet

### Transaction Management
- `getTransactionDetails`: Get detailed information about a transaction
- `sendTransaction`: Send a native token transaction
- `sendTransactionWithOptions`: Send a transaction with custom options (gas, nonce, etc)
- `getTransactionsByBlock`: Get all transactions in a specific block

### Smart Contract Interaction
- `contractCall`: Execute a contract write method
- `contractCallView`: Execute a contract read method
- `getContractCode`: Get the bytecode of a deployed contract

### ENS Operations
- `lookupAddress`: Resolve an ENS name to an address
- `resolveName`: Resolve an address to an ENS name

## Network Support

The server supports multiple networks including:
- Ethereum Mainnet
- Polygon PoS
- Arbitrum
- Optimism
- Base
- And more...

Use the `getSupportedNetworks` tool to get a complete list of supported networks.

## Configuration

The server can be configured using environment variables:

- `ALCHEMY_API_KEY`: Your Alchemy API key for network access
- `PRIVATE_KEY`: Private key for transaction signing (optional)
- `DEFAULT_NETWORK`: Default network to use (defaults to "mainnet")

## Error Handling

The server provides detailed error messages for common issues:
- Invalid network names or RPC URLs
- Chain ID mismatches
- Contract interaction failures
- Transaction errors
- Network connectivity issues

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start in development mode
npm run dev

# Build
npm run build
```

## Contributing

Issues and pull requests are welcome on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Dennison Bertram (dennison@tally.xyz)