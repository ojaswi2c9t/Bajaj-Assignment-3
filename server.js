require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecialCharacter(str) {
    return /^[^a-zA-Z0-9\s]+$/.test(str);
}

function generateUserId(fullName) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${fullName.toLowerCase().replace(/\s+/g, '_')}_${day}${month}${year}`;
}

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. 'data' must be an array."
            });
        }

        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        let allAlphabets = '';

        data.forEach(item => {
            const str = String(item);
            
            if (isNumber(str)) {
                const num = parseInt(str);
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
                sum += num;
            } else if (isAlphabet(str)) {
                alphabets.push(str.toUpperCase());
                allAlphabets += str;
            } else if (isSpecialCharacter(str)) {
                specialCharacters.push(str);
            }
        });

        let concatString = '';
        const reversedAlphabets = allAlphabets.split('').reverse();
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        const response = {
            is_success: true,
            user_id: generateUserId(process.env.USER_FULL_NAME || "Ojaswi Gahoi"),
            email: process.env.USER_EMAIL || "ojaswigahoi@gmail.com",
            roll_number: process.env.USER_ROLL_NUMBER || "22BCE10783",
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sum),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error occurred while processing the request."
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Bajaj Project API is running successfully',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Bajaj Project API',
        version: '1.0.0',
        endpoints: {
            'POST /bfhl': 'Process array and return categorized data',
            'GET /health': 'Health check endpoint'
        }
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/bfhl`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});
