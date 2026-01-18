import { sha256 as jsSha256 } from 'js-sha256';

/**
 * Generate a random nonce string for OAuth flows
 * @param length Length of the nonce (default 32)
 * @returns Random string
 */
export function generateNonce(length: number = 32): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * SHA256 hash function
 * @param input String to hash
 * @returns SHA256 hash as hex string
 */
export function sha256(input: string): string {
  return jsSha256(input);
}
