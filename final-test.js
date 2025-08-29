// Final comprehensive test for Bajaj Assignment API
async function testBothVersions() {
    console.log('🚀 Testing Bajaj Assignment API - Both Local and Deployed\n');
    
    const localURL = 'http://localhost:3001';
    const deployedURL = 'https://bajaj-assignment-3.vercel.app';
    
    async function testEndpoint(url, label) {
        console.log(`\n=== Testing ${label} ===`);
        
        // Test Health
        try {
            const healthResponse = await fetch(`${url}/health`);
            const healthData = await healthResponse.json();
            console.log('✅ Health:', healthData.status);
        } catch (error) {
            console.log('❌ Health Failed:', error.message);
        }
        
        // Test GET /bfhl
        try {
            const getResponse = await fetch(`${url}/bfhl`);
            const getData = await getResponse.json();
            console.log('✅ GET /bfhl:', getData.message ? 'Working' : 'No message');
        } catch (error) {
            console.log('❌ GET /bfhl Failed:', error.message);
        }
        
        // Test POST /bfhl
        try {
            const testData = { data: ['a', '1', '334', '4', 'R', '$'] };
            const postResponse = await fetch(`${url}/bfhl`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testData)
            });
            
            const postData = await postResponse.json();
            
            if (postData.is_success) {
                console.log('✅ POST /bfhl Success!');
                console.log('   Even Numbers:', postData.even_numbers);
                console.log('   Odd Numbers:', postData.odd_numbers);
                console.log('   Alphabets:', postData.alphabets);
                console.log('   Sum:', postData.sum);
                console.log('   Concat String:', postData.concat_string);
            } else {
                console.log('❌ POST /bfhl Failed:', postData.error);
            }
        } catch (error) {
            console.log('❌ POST /bfhl Failed:', error.message);
        }
    }
    
    // Test deployed version first
    await testEndpoint(deployedURL, 'DEPLOYED VERSION');
    
    // Test local version
    await testEndpoint(localURL, 'LOCAL VERSION');
    
    console.log('\n🎉 Testing Complete!');
    console.log('\n📋 Summary:');
    console.log('   • Deployed API: https://bajaj-assignment-3.vercel.app/bfhl');
    console.log('   • Local API: http://localhost:3001/bfhl');
    console.log('   • Test HTML: Open test.html in browser');
    console.log('   • Both versions should be working correctly');
}

testBothVersions();