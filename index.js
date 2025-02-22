const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');

function getChangePercentage() {
    // Get command line arguments
    const args = process.argv.slice(2);
    const duration = args[0]; // 'month' or 'year'
    const sortOrder = args[1] === 'desc' ? 'desc' : 'asc';
    const filePath = path.resolve(__dirname, 'securities.json');

    if (!duration || !['month', 'year'].includes(duration)) {
        console.error('Usage: node script.js <month|year> [asc|desc]');
        process.exit(1);
    }

    try {
        // Read JSON file
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!jsonData.data || !Array.isArray(jsonData.data)) {
            throw new Error('Invalid JSON format: Expected an array under "data" key.');
        }

        const data = jsonData.data;
        const changeField = duration === 'month' ? 'perChange30d' : 'perChange365d';

        // Extract relevant fields and filter invalid entries
        const extractedData = data.map(item => ({
            symbol: item.symbol,
            changePercentage: item[changeField]
        })).filter(item => item.symbol && typeof item.changePercentage === 'number');

        // Sort data
        extractedData.sort((a, b) => sortOrder === 'asc' ?
            a.changePercentage - b.changePercentage :
            b.changePercentage - a.changePercentage);

        // Determine max symbol length for table width
        const maxSymbolLength = Math.max(...extractedData.map(item => item.symbol.length), 10);

        // Print table
        const table = new Table({
            head: ['Symbol', 'Change Percentage'],
            colWidths: [maxSymbolLength + 2, 20]
        });

        extractedData.forEach(item => {
            table.push([item.symbol, item.changePercentage.toFixed(2) + '%']);
        });

        console.log(table.toString());
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

function getNearYearHighLow() {
    // Get command line arguments
    const args = process.argv.slice(2);
    const sortOrder = args[1] === 'desc' ? 'desc' : 'asc';
    const filePath = path.resolve(__dirname, 'securities.json');

    if (args[1] && !['asc', 'desc'].includes(args[1])) {
        console.error('Usage: node script.js <month|year> [asc|desc]');
        process.exit(1);
    }

    try {
        // Read JSON file
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!jsonData.data || !Array.isArray(jsonData.data)) {
            throw new Error('Invalid JSON format: Expected an array under "data" key.');
        }

        const data = jsonData.data;

        // Create a Map to store industries and their corresponding companies
        let industries = new Map();

        data.forEach(item => {
            const industry = item.meta.industry;
            const company = item.meta.companyName;

            if (!industries.has(industry)) {
                industries.set(industry, []);
            }
            industries.get(industry).push(company);
        });

        // Print the industries and their companies
        industries.forEach((companies, industry) => {
            console.log(`Industry: ${industry}`);
            console.log('Companies:', companies.join(', '));
            console.log('-----------------------------');
        });
        // Extract and validate data
        const extractedData = data.map(item => ({
            symbol: item.symbol,
            upDownFromYearHigh: parseInt(item.yearHigh) > 0 && parseInt(item.lastPrice) != null ?
                ((parseInt(item.yearHigh) - parseInt(item.lastPrice)) / parseInt(item.yearHigh)) * 100 : NaN,
        })).filter(item => item.symbol && !isNaN(item.upDownFromYearHigh));

        // Sort data
        extractedData.sort((a, b) => sortOrder === 'asc' ?
            a.upDownFromYearHigh - b.upDownFromYearHigh :
            b.upDownFromYearHigh - a.upDownFromYearHigh);

        // Determine max symbol length for table width
        const maxSymbolLength = Math.max(...extractedData.map(item => item.symbol.length), 10);

        // Print table
        const table = new Table({
            head: ['Symbol', 'Low High From Year'],
            colWidths: [maxSymbolLength + 2, 20]
        });

        extractedData.forEach(item => {
            table.push([item.symbol, item.upDownFromYearHigh.toFixed(2) + '%']);
        });

        console.log(table.toString());
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Call function
getNearYearHighLow();