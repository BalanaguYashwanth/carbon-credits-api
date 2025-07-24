# Carbon Credits API

A simple Node.js + Express API that interacts with the Sui blockchain to create companies and manage their carbon credit data.

## Features

- Create a company
- Add or update carbon credits for a company

## API Endpoints

### `POST /create_company`

Create a new company on-chain.

**RequestBody:**
```json
{
  "companyName": "Tesla"
}
```

**ReponseBody:**
```json
{
    "companyId": "0xf03...873",
}
```

### `POST /add_or_update_credits`

Update the carbon credits of an existing company.

**Body:**

```json
{
  "companyId": "0xf03...873",
  "credits": "1500"
}