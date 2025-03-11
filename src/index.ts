#!/usr/bin/env node
import { startServer } from './server.js';
import { config } from 'dotenv';

// Load environment variables
config();

// Parse command line arguments
const args = process.argv.slice(2);
const argMap = new Map();

args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    if (value !== undefined) {
      argMap.set(key, value);
    } else {
      argMap.set(key, true);
    }
  }
});

// Set environment variables from command line arguments
if (argMap.has('network')) {
  process.env.DEFAULT_NETWORK = argMap.get('network');
}

if (argMap.has('help')) {
  console.log(`
MCP Ethers Wallet Server

Usage:
  npm start -- [options]

Options:
  --network=<network>  Specify the default network (e.g., mainnet, goerli)
  --help               Show this help message
  `);
  process.exit(0);
}

// Start the server
startServer().catch((error: Error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
}); 