const crypto = require('crypto');
const fs = require('fs');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

// Encrypt Text
function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt Text
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    let decrypted;
    try {
        decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    } catch (err) {
        console.error('Decryption failed:', err.message);
        return null; // Return null if decryption fails
    }

    return decrypted.toString();
}

// Encrypt File
function encryptFile(inputFile, outputFile) {
    let input = fs.createReadStream(inputFile);
    let output = fs.createWriteStream(outputFile);

    output.on('finish', () => {
        console.log('File Encrypted Successfully');
    });

    input.on('error', (err) => {
        console.error('Error reading input file:', err.message);
    });

    // Encrypting the file and preserving line breaks
    input.on('data', (chunk) => {
        const lines = chunk.toString().split('\n'); // Split chunk by lines
        lines.forEach((line) => {
            if (line.trim()) { // Avoid encrypting empty lines
                const encryptedChunk = encrypt(line);
                output.write(encryptedChunk + '\n'); // Write each encrypted line
            }
        });
    });

    input.on('end', () => {
        output.end(); // Close output stream when done
    });
}

// Decrypt File
function decryptFile(inputFile, outputFile) {
    let input;

    try {
        input = fs.readFileSync(inputFile, { encoding: 'utf8' });
    } catch (err) {
        console.error('Error reading encrypted file:', err.message);
        return;
    }

    const lines = input.split('\n').filter(line => line.trim() !== ''); // Split into lines and filter out empty lines

    let decryptedData = '';

    for (const line of lines) {
        const decrypted = decrypt(line);
        if (decrypted) {
            decryptedData += decrypted + '\n'; // Append decrypted data and maintain line breaks
        } else {
            console.error('Failed to decrypt line:', line);
        }
    }

    try {
        fs.writeFileSync(outputFile, decryptedData.trim()); // Write all decrypted data to output file
        console.log('File Decrypted Successfully');
    } catch (err) {
        console.error('Error writing decrypted file:', err.message);
    }
}

module.exports = { decrypt, encrypt, encryptFile, decryptFile };
