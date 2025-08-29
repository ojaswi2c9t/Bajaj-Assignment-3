const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test data from the examples
const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334", "4"],
            alphabets: ["A", "R"],
            special_characters: ["$"],
            sum: "339"
        }
    },
    {
        name: "Example B",
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2", "4", "92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A", "ABCD", "DOE"],
            special_characters: [],
            sum: "0"
        }
    }
];

async function testAPI() {
    console.log('🧪 Testing Bajaj Project API...\n');
    
    for (const testCase of testCases) {
        try {
            console.log(`📋 Testing: ${testCase.name}`);
            console.log(`📤 Input: ${JSON.stringify(testCase.data)}`);
            
            const response = await axios.post(`${BASE_URL}/bfhl`, {
                data: testCase.data
            });
            
            console.log(`✅ Status: ${response.status}`);
            console.log(`📥 Response: ${JSON.stringify(response.data, null, 2)}`);
            
            // Validate response structure
            const requiredFields = [
                'is_success', 'user_id', 'email', 'roll_number',
                'odd_numbers', 'even_numbers', 'alphabets',
                'special_characters', 'sum', 'concat_string'
            ];
            
            const missingFields = requiredFields.filter(field => !(field in response.data));
            if (missingFields.length > 0) {
                console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
            } else {
                console.log(`✅ All required fields present`);
            }
            
            // Validate specific values
            let validationPassed = true;
            for (const [field, expectedValue] of Object.entries(testCase.expected)) {
                if (JSON.stringify(response.data[field]) !== JSON.stringify(expectedValue)) {
                    console.log(`❌ ${field} mismatch. Expected: ${JSON.stringify(expectedValue)}, Got: ${JSON.stringify(response.data[field])}`);
                    validationPassed = false;
                }
            }
            
            if (validationPassed) {
                console.log(`✅ ${testCase.name} validation passed\n`);
            } else {
                console.log(`❌ ${testCase.name} validation failed\n`);
            }
            
        } catch (error) {
            console.log(`❌ Error testing ${testCase.name}: ${error.message}`);
            if (error.response) {
                console.log(`Status: ${error.response.status}`);
                console.log(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
            }
            console.log('');
        }
    }
    
    // Test health endpoint
    try {
        console.log('🏥 Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log(`✅ Health check passed: ${healthResponse.status}`);
        console.log(`📥 Response: ${JSON.stringify(healthResponse.data, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Health check failed: ${error.message}\n`);
    }
    
    // Test root endpoint
    try {
        console.log('🏠 Testing root endpoint...');
        const rootResponse = await axios.get(`${BASE_URL}/`);
        console.log(`✅ Root endpoint passed: ${rootResponse.status}`);
        console.log(`📥 Response: ${JSON.stringify(rootResponse.data, null, 2)}\n`);
    } catch (error) {
        console.log(`❌ Root endpoint failed: ${error.message}\n`);
    }
}

// Check if server is running
async function checkServer() {
    try {
        await axios.get(`${BASE_URL}/health`);
        console.log('🚀 Server is running! Starting tests...\n');
        await testAPI();
    } catch (error) {
        console.log('❌ Server is not running. Please start the server first:');
        console.log('   npm install');
        console.log('   npm start');
        console.log('\nThen run this test file again.');
    }
}

// Run tests
checkServer();
