# Gomoku

## Installation

```bash
npm install
or
yarn
```

## Environment Variables

### Create .env

Generates /backend/.env and /frontend/.env with appropriate variables

```node
npm run generate:env
```

The `.env` file is used to store environment variables for the project. Here are the variables used in this project:

### Frontend Variables

- `VITE_NODE_APP_API_URL`: Your API key for accessing the Backend API.

### Backend Variables

- `SERVER_PORT`: Your port that you use for your Backend
- `SERVER_URL`: Your connect address for your MongoDB Database


## Usage

For development

```javascript
npm run dev
```

For deployment

```
npm run build
```

# License

[MIT](https://choosealicense.com/licenses/mit/)
