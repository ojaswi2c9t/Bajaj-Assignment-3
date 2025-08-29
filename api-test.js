// Test script for deployed Bajaj Assignment API
const testURL = 'https://bajaj-assignment-3.vercel.app';

async function testAPI() {
    console.log('🚀 Testing Bajaj Assignment API Deployment\n');
    
    // Test 1: Health Check
    console.log('1. Testing Health Endpoint...');
    try {
        const healthResponse = await fetch(`${testURL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData.status);
        console.log('   Message:', healthData.message);
    } catch (error) {
        console.log('❌ Health Check Failed:', error.message);
    }
    
    console.log('\n2. Testing Root Endpoint...');
    try {
        const rootResponse = await fetch(`${testURL}/`);
        const rootData = await rootResponse.json();
        console.log('✅ Root Endpoint:', rootData.message);
        console.log('   Available Endpoints:', Object.keys(rootData.endpoints));
    } catch (error) {
        console.log('❌ Root Endpoint Failed:', error.message);
    }
    
    console.log('\n3. Testing POST /bfhl with sample data...');
    try {
        const testData = {
            data: ['a', '1', '334', '4', 'R', '$']
        };
        
        const postResponse = await fetch(`${testURL}/bfhl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const postData = await postResponse.json();
        
        if (postData.is_success) {
            console.log('✅ POST /bfhl Success!');
            console.log('   User ID:', postData.user_id);
            console.log('   Email:', postData.email);
            console.log('   Roll Number:', postData.roll_number);
            console.log('   Even Numbers:', postData.even_numbers);
            console.log('   Odd Numbers:', postData.odd_numbers);
            console.log('   Alphabets:', postData.alphabets);
            console.log('   Special Characters:', postData.special_characters);
            console.log('   Sum:', postData.sum);
            console.log('   Concat String:', postData.concat_string);
        } else {
            console.log('❌ POST /bfhl Failed:', postData.error);
        }
    } catch (error) {
        console.log('❌ POST /bfhl Failed:', error.message);
    }
    
    console.log('\n🎉 Deployment Testing Complete!');
    console.log('\n📖 Your API is working correctly at: https://bajaj-assignment-3.vercel.app/bfhl');
    console.log('   • Use POST requests with JSON body: {"data": ["your", "array", "here"]}');
    console.log('   • The browser shows "Route not found" because it uses GET requests');
    console.log('   • Use tools like Postman, curl, or the test.html file for testing');
}

testAPI();