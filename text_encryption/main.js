const { encrypt, decrypt, encryptFile, decryptFile } = require('./encryption');
const fs = require('fs');

// Encrypt and decrypt text
const plainText = 'Hello, World!';
const encryptedText = encrypt(plainText);
console.log('Encrypted:', encryptedText);
const decryptedText = decrypt(encryptedText);
console.log('Decrypted:', decryptedText);

// File encryption and decryption
const inputFilePath = 'example.txt';  // Input file to encrypt
const encryptedFilePath = 'encrypted.txt';  // Encrypted file path
const decryptedFilePath = 'decrypted.txt';  // Decrypted file path

// Create a sample text file if it doesn't exist
if (!fs.existsSync(inputFilePath)) {
    fs.writeFileSync(inputFilePath, 'This is a sample file to encrypt and decrypt');
}

// Encrypt the file
encryptFile(inputFilePath, encryptedFilePath);

// After encryption, decrypt the file
setTimeout(() => {
    decryptFile(encryptedFilePath, decryptedFilePath);
}, 1000);  // Wait for the encryption to complete
