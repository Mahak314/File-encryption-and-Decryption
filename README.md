# File-encryption-and-Decryption
AES-Based Text and File Encryption System
Project Overview
This project implements an AES (Advanced Encryption Standard) based encryption and decryption system for both text and files. It showcases how sensitive data can be securely encrypted and decrypted using cryptographic algorithms, with a focus on AES-256-CBC encryption. The project is relevant for protecting personal and sensitive information in real-world applications such as cybersecurity, finance, and healthcare.

Features
AES-256-CBC encryption for text and files
Secure encryption using random IV (Initialization Vector)
Decrypts AES-encrypted text and files
Handles encryption and decryption errors gracefully
Prerequisites

Node.js installed
Basic understanding of encryption and cryptography
Project Structure
main.js: Demonstrates encryption and decryption of text and files.
encryption.js: Contains the core functions for encryption and decryption.
encrypt(text): Encrypts text using AES-256-CBC.
decrypt(text): Decrypts AES-encrypted text.
encryptFile(inputFile, outputFile): Encrypts the contents of a file.
decryptFile(inputFile, outputFile): Decrypts the contents of an encrypted file.

How to Run the Project

1. Clone the Repository
git clone https://github.com/your-username/text-encryption.git
cd text-encryption

2. Install Dependencies

Install the necessary Node.js modules:

npm install

4. Run the Encryption and Decryption

To run the project, execute the following command:
node main.js

This will:

Encrypt a sample text ("Hello, World!") and output the encrypted and decrypted results in the terminal.
Encrypt and decrypt a sample file (example.txt) in the project directory.

Usage

Encrypting Text:
const encryptedText = encrypt('Hello, World!');
console.log('Encrypted:', encryptedText);

Decrypting Text:
const decryptedText = decrypt(encryptedText);
console.log('Decrypted:', decryptedText);

Encrypting a File:
encryptFile('example.txt', 'encrypted.txt');

Decrypting a File:
decryptFile('encrypted.txt', 'decrypted.txt');

File Structure

├── README.md            # Project documentation

├── encryption.js        # Encryption and decryption functions

├── main.js              # Sample usage for text and file encryption

├── example.txt          # Sample file for encryption

├── encrypted.txt        # File generated after encryption

├── decrypted.txt        # File generated after decryption

Real-World Applications
Cybersecurity: Protecting sensitive information like passwords, account details, and personal data.
Data Transmission: Ensuring secure transmission of sensitive data over the internet.
Compliance: Meeting legal requirements for data protection and privacy (e.g., GDPR).

Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Any contributions are welcome!

License
This project is licensed under the MIT License.

