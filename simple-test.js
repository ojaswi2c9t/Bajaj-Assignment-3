// Simple test script to validate VIT requirements
const https = require('http');

function testAPI() {
    const testCases = [
        {
            name: "Example A",
            data: ["a", "1", "334", "4", "R", "$"],
            expectedConcatString: "Ra" // R + a in reverse order with alternating caps
        },
        {
            name: "Example B", 
            data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
            expectedConcatString: "ByA" // b + y + a in reverse order with alternating caps
        },
        {
            name: "Example C",
            data: ["A", "ABcD", "DOE"],
            expectedConcatString: "EoDdCbAa" // A + ABcD + DOE = AaBcDDOE -> reverse = EODdCbAa -> alternating caps = EoDdCbAa
        }
    ];

    testCases.forEach((testCase, index) => {
        setTimeout(() => {
            const postData = JSON.stringify({ data: testCase.data });
            
            const options = {
                hostname: 'localhost',
                port: 3001,
                path: '/bfhl',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        console.log(`\n=== ${testCase.name} ===`);
                        console.log(`Input: ${JSON.stringify(testCase.data)}`);
                        console.log(`Status: ${res.statusCode}`);
                        console.log(`Response:`, JSON.stringify(response, null, 2));
                        
                        // Validate required fields
                        const requiredFields = ['is_success', 'user_id', 'email', 'roll_number', 'odd_numbers', 'even_numbers', 'alphabets', 'special_characters', 'sum', 'concat_string'];
                        const missing = requiredFields.filter(field => !(field in response));
                        if (missing.length === 0) {
                            console.log('✅ All required fields present');
                        } else {
                            console.log('❌ Missing fields:', missing);
                        }
                        
                        // Check concat_string if expected
                        if (testCase.expectedConcatString) {
                            if (response.concat_string === testCase.expectedConcatString) {
                                console.log('✅ Concatenation string correct');
                            } else {
                                console.log(`❌ Concatenation string incorrect. Expected: "${testCase.expectedConcatString}", Got: "${response.concat_string}"`);
                            }
                        }
                    } catch (e) {
                        console.log('❌ Invalid JSON response:', data);
                    }
                });
            });

            req.on('error', (e) => {
                console.log(`❌ ${testCase.name} failed:`, e.message);
            });

            req.write(postData);
            req.end();
        }, index * 1000); // Delay between tests
    });
}

// Wait for server to start then run tests
setTimeout(() => {
    console.log('🧪 Testing Bajaj API against VIT requirements...');
    testAPI();
}, 2000);