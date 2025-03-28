import { afterAll, beforeAll, beforeEach } from '@jest/globals';
import { getTestEnvironment } from './src/tests/utils/globalTestSetup.js';
import { config } from 'dotenv';

// Load test environment variables
config({ path: '.env.test' });

// Set default environment variables if not set
process.env.PRIVATE_KEY = process.env.PRIVATE_KEY || '0x0123456789012345678901234567890123456789012345678901234567890123';
process.env.INFURA_API_KEY = process.env.INFURA_API_KEY || '1234567890abcdef1234567890abcdef';
process.env.PROVIDER_URL = process.env.PROVIDER_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo';

// In Bun, we set the timeout in bunfig.toml (timeout = 30000)

// Initialize test environment
beforeAll(async () => {
  try {
    await getTestEnvironment();
  } catch (error) {
    console.error('Error during test environment initialization:', error);
    throw error;
  }
});

// Mine blocks before each test
beforeEach(async () => {
  try {
    const testEnv = await getTestEnvironment();
    // Mine 5 blocks
    for (let i = 0; i < 5; i++) {
      await testEnv.provider.send('evm_mine', []);
    }
  } catch (error) {
    console.error('Error mining blocks:', error);
    throw error;
  }
});

// Add BigInt serialization support
if (typeof BigInt.prototype.toJSON !== 'function') {
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value: function() {
      return this.toString();
    }
  });
} 