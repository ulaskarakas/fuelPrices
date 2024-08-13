const express = require("express");
const app = express();

const path = require("path");
const https = require("https");
const data = require("./data.json");
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const turkishToLatinMap = {
    'ı': 'i',
    'İ': 'I',
    'ç': 'c',
    'Ç': 'C',
    'ş': 's',
    'Ş': 'S',
    'ğ': 'g',
    'Ğ': 'G',
    'ü': 'u',
    'Ü': 'U',
    'ö': 'o',
    'Ö': 'O'
};

function convertTurkishChars(str) {
    return str.split('').map(char => turkishToLatinMap[char] || char).join('');
}

// routes
// mainpage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// dropdown data
app.get("/api/cities", (req, res) => {
  res.json(data);
});

// data
app.post('/api/gasPrice', (req, res) => {
    const { city, district } = req.body;
    const selectedCity = convertTurkishChars(city.toLowerCase());
    const selectedDistrict = convertTurkishChars(district.toLowerCase());
    res.status(200);

    const options = {
        method: 'GET',
        hostname: 'api.collectapi.com',
        port: null,
        path: `/gasPrice/turkeyGasoline?district=${selectedDistrict}&city=${selectedCity}`,
        headers: {
            'content-type': 'application/json',
            'authorization': 'apikey 5MQ0C7ulDG0kdFQ4RZ5h7K:3l2vVJISGiOE0gdbscGiR5'
        }
    };

    console.log(options.path);

    const apiRequest = https.request(options, apiResponse => {
        let data = '';

        apiResponse.on('data', chunk => {
            data += chunk;
        });

        apiResponse.on('end', () => {
            try {
                // Veriyi JSON formatında parse et
                const jsonResponse = JSON.parse(data);
                // İstemciye JSON veriyi gönder
                res.json(jsonResponse);
            } catch (error) {
                // JSON parse hatası
                res.status(500).send('Hata oluştu');
            }
        });
    });

    apiRequest.on('error', error => {
        console.error('API çağrı hatası:', error);
        res.status(500).send('Hata oluştu');
    });

    apiRequest.end();
});

// Server
app.listen(3000, () => {
  console.log("Server is running!");
});
