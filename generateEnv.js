const fs = require('fs');

const frontendEnvContent = `
VITE_NODE_APP_API_URL=your_backend_url
`;

const backendEnvContent = `
SERVER_PORT=your_api_key_here
SERVER_URL=your_api_key_here
`;


fs.writeFileSync('frontend/.env', frontendEnvContent);
fs.writeFileSync('backend/.env', backendEnvContent);

console.log('The .env file has been generated with default values.');
