import React, { useState } from "react";
import Web3 from 'web3';

function UploadFileToPinata() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [error, setError] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const uploadToPinata = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const apiKey = "1f3411803ccbb31c3c2f";
    const secretKey = "ba361feefb448c2f17cfa8776110ec5e0cbac9dcaed3a71b435d0a6989a6dbd5";
    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
        },
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const data = await response.json();
      setIpfsHash(data.IpfsHash);
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      setError(error.message);
    }
  };

  return (
    <div style={{marginTop:"10%", marginLeft:"40%"}}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToPinata}>Upload</button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
      {/* {error && <p>Error: {error}</p>} */}
    </div>
  );
}

export default UploadFileToPinata;
