# Bajaj Project REST API

A Node.js REST API that processes arrays and returns categorized data including even/odd numbers, alphabets, special characters, sum, and concatenated strings.

## Features

- **POST /bfhl** - Main endpoint for array processing
- **GET /health** - Health check endpoint
- **GET /** - API information and documentation

## API Endpoint

**Method:** POST  
**Route:** `/bfhl`  
**Expected Status Code:** 200 (for successful requests)

## Request Format

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

## Response Format

```json
{
  "is_success": true,
  "user_id": "ojaswi_gahoi_29082025",
  "email": "ojaswigahoi@gmail.com",
  "roll_number": "22BCE10783",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Response Fields

1. **is_success**: Boolean indicating operation status
2. **user_id**: Generated in format `{full_name_ddmmyyyy}` (lowercase)
3. **email**: User's email address
4. **roll_number**: College roll number
5. **odd_numbers**: Array of odd numbers (as strings)
6. **even_numbers**: Array of even numbers (as strings)
7. **alphabets**: Array of alphabets (converted to uppercase)
8. **special_characters**: Array of special characters
9. **sum**: Sum of all numbers (as string)
10. **concat_string**: Concatenation of alphabets in reverse order with alternating caps

## Examples

### Example A
**Request:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "ojaswi_gahoi_29082025",
  "email": "ojaswigahoi@gmail.com",
  "roll_number": "22BCE10783",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example B
**Request:**
```json
{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "ojaswi_gahoi_29082025",
  "email": "ojaswigahoi@gmail.com",
  "roll_number": "22BCE10783",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### Example C
**Request:**
```json
{
  "data": ["A", "ABcD", "DOE"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "ojaswi_gahoi_29082025",
  "email": "ojaswigahoi@gmail.com",
  "roll_number": "22BCE10783",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A", "ABCD", "DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd bajaj-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Production
   npm start
   
   # Development (with auto-restart)
   npm run dev
   ```

4. **Access the API:**
   - Main endpoint: `http://localhost:3000/bfhl`
   - Health check: `http://localhost:3000/health`
   - API info: `http://localhost:3000/`

## Environment Variables

- `PORT` - Server port (default: 3000)

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Railway
1. Connect your GitHub repository
2. Railway will automatically deploy

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`

## Testing

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

### cURL Example
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Try-catch blocks
- Proper HTTP status codes
- Descriptive error messages

## Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation
- Error sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
