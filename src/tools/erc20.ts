/**
 * @file ERC20 Token Tools
 * @version 1.0.0
 * @status UNDER DEVELOPMENT
 * 
 * Tools for interacting with ERC20 tokens using the new MCP pattern
 */

import { z } from 'zod';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Common schemas
const tokenAddressSchema = z.string().describe(
  "The address of the ERC20 token contract"
);

const providerSchema = z.string().optional().describe(
  "Optional. Either a network name or custom RPC URL. Use getSupportedNetworks to get a list of supported networks."
);

const chainIdSchema = z.number().optional().describe(
  "Optional. The chain ID to use. If provided with a named network and they don't match, the RPC's chain ID will be used."
);

const amountSchema = z.string().describe(
  "The amount of tokens to transfer (can be decimal, e.g. '1.5')"
);

// Gas options schema
const gasOptionsSchema = z.object({
  gasLimit: z.union([z.string(), z.number()]).optional().describe(
    "Optional. The gas limit for the transaction"
  ),
  gasPrice: z.union([z.string(), z.number()]).optional().describe(
    "Optional. The gas price for the transaction in gwei"
  ),
  maxFeePerGas: z.union([z.string(), z.number()]).optional().describe(
    "Optional. The maximum fee per gas for the transaction (EIP-1559)"
  ),
  maxPriorityFeePerGas: z.union([z.string(), z.number()]).optional().describe(
    "Optional. The maximum priority fee per gas for the transaction (EIP-1559)"
  ),
  nonce: z.number().optional().describe(
    "Optional. The nonce for the transaction"
  ),
  value: z.string().optional().describe(
    "Optional. The value to send with the transaction in ether"
  )
}).optional();

/**
 * Registers ERC20 token tools with the MCP server
 */
export function registerERC20Tools(server: McpServer, ethersService: any) {
  // Get ERC20 Token Info
  server.tool(
    "getERC20TokenInfo",
    {
      tokenAddress: tokenAddressSchema,
      provider: providerSchema,
      chainId: chainIdSchema
    },
    async ({ tokenAddress, provider, chainId }) => {
      try {
        const tokenInfo = await ethersService.getERC20TokenInfo(tokenAddress, provider, chainId);
        
        return {
          content: [{ 
            type: "text", 
            text: `Token Information:
Name: ${tokenInfo.name}
Symbol: ${tokenInfo.symbol}
Decimals: ${tokenInfo.decimals}
Total Supply: ${tokenInfo.totalSupply}`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ 
            type: "text", 
            text: `Error getting token information: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
  
  // Get ERC20 Balance
  server.tool(
    "getERC20Balance",
    {
      tokenAddress: tokenAddressSchema,
      ownerAddress: z.string().describe(
        "The Ethereum address whose balance to check"
      ),
      provider: providerSchema,
      chainId: chainIdSchema
    },
    async ({ tokenAddress, ownerAddress, provider, chainId }) => {
      try {
        const balance = await ethersService.getERC20Balance(ownerAddress, tokenAddress, provider, chainId);
        
        // Get token info to format the response
        const tokenInfo = await ethersService.getERC20TokenInfo(tokenAddress, provider, chainId);
        
        return {
          content: [{ 
            type: "text", 
            text: `${ownerAddress} has a balance of ${balance} ${tokenInfo.symbol}`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ 
            type: "text", 
            text: `Error getting token balance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
  
  // Get ERC20 Allowance
  server.tool(
    "getERC20Allowance",
    {
      tokenAddress: tokenAddressSchema,
      ownerAddress: z.string().describe(
        "The Ethereum address that owns the tokens"
      ),
      spenderAddress: z.string().describe(
        "The Ethereum address that is approved to spend tokens"
      ),
      provider: providerSchema,
      chainId: chainIdSchema
    },
    async ({ tokenAddress, ownerAddress, spenderAddress, provider, chainId }) => {
      try {
        const allowance = await ethersService.getERC20Allowance(
          tokenAddress, 
          ownerAddress, 
          spenderAddress, 
          provider, 
          chainId
        );
        
        // Get token info to format the response
        const tokenInfo = await ethersService.getERC20TokenInfo(tokenAddress, provider, chainId);
        
        return {
          content: [{ 
            type: "text", 
            text: `${spenderAddress} is approved to spend ${allowance} ${tokenInfo.symbol} from ${ownerAddress}`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ 
            type: "text", 
            text: `Error getting token allowance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
  
  // Transfer ERC20
  server.tool(
    "transferERC20",
    {
      tokenAddress: tokenAddressSchema,
      recipientAddress: z.string().describe(
        "The Ethereum address to receive the tokens"
      ),
      amount: amountSchema,
      provider: providerSchema,
      chainId: chainIdSchema,
      gasLimit: z.string().optional(),
      gasPrice: z.string().optional()
    },
    async ({ tokenAddress, recipientAddress, amount, provider, chainId, gasLimit, gasPrice }) => {
      try {
        // Get token info to format the response
        const tokenInfo = await ethersService.getERC20TokenInfo(tokenAddress, provider, chainId);
        
        // Prepare gas options
        const options = {
          gasLimit,
          gasPrice
        };
        
        const txResult = await ethersService.transferERC20(
          tokenAddress,
          recipientAddress,
          amount,
          provider,
          chainId,
          options
        );
        
        return {
          content: [{ 
            type: "text", 
            text: `
Successfully transferred ${amount} ${tokenInfo.symbol} to ${recipientAddress}
Transaction Hash: ${txResult.hash}
Waiting for confirmation...`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ 
            type: "text", 
            text: `Error transferring tokens: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
  
  // Approve ERC20
  server.tool(
    "approveERC20",
    {
      tokenAddress: tokenAddressSchema,
      spenderAddress: z.string().describe(
        "The Ethereum address to approve for spending tokens"
      ),
      amount: amountSchema,
      provider: providerSchema,
      chainId: chainIdSchema,
      gasLimit: z.string().optional(),
      gasPrice: z.string().optional()
    },
    async ({ tokenAddress, spenderAddress, amount, provider, chainId, gasLimit, gasPrice }) => {
      try {
        // Get token info to format the response
        const tokenInfo = await ethersService.getERC20TokenInfo(tokenAddress, provider, chainId);
        
        // Prepare gas options
        const options = {
          gasLimit,
          gasPrice
        };
        
        const txResult = await ethersService.approveERC20(
          tokenAddress,
          spenderAddress,
          amount,
          provider,
          chainId,
          options
        );
        
        return {
          content: [{ 
            type: "text", 
            text: `
Successfully approved ${spenderAddress} to spend ${amount} ${tokenInfo.symbol}
Transaction Hash: ${txResult.hash}
Waiting for confirmation...`
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ 
            type: "text", 
            text: `Error approving token allowance: ${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );
} 