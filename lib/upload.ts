// utils/uploadToIPFS.js
import axios from 'axios';
const pinataSDK = require('@pinata/sdk');

async function uploadJSONFile(file) {
  const pinataApiKey = 'YOUR_PINATA_API_KEY';
  const pinataSecretApi = 'YOUR_PINATA_SECRET_API';

  // Initialize Pinata SDK
  const pinata = pinataSDK(pinataApiKey, pinataSecretApi);

  try {
    // Convert file to base64
    const base64String = await convertFileToBase64(file);
    
    // Prepare metadata for the file
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      content: base64String,
    };

    // Upload to IPFS
    const result = await pinata.pinJSONToIPFS(metadata);
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
