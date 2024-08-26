const cors = require("cors");
const express = require("express");
const app = express();

const path = require("path");
const https = require("https");
const data = require("./data.json");
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
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
*/

function getPlateByCity(city) {

    switch (city) {
        case 'Adana':           plate = "1";    break;
        case 'Adıyaman':        plate = "2";    break;
        case 'Afyonkarahisar':  plate = "3";    break;
        case 'Ağrı':            plate = "4";    break;
        case 'Aksaray':         plate = "68";   break;
        case 'Amasya':          plate = "5";    break;
        case 'Ankara':          plate = "6";    break;
        case 'Antalya':         plate = "7";    break;
        case 'Ardahan':         plate = "75";   break;
        case 'Artvin':          plate = "8";    break;
        case 'Aydın':           plate = "9";    break;
        case 'Balıkesir':       plate = "10";   break;
        case 'Bartın':          plate = "74";   break;
        case 'Batman':          plate = "72";   break;
        case 'Bayburt':         plate = "69";   break;
        case 'Bilecik':         plate = "11";   break;
        case 'Bingöl':          plate = "12";   break;
        case 'Bitlis':          plate = "13";   break;
        case 'Bolu':            plate = "14";   break;
        case 'Burdur':          plate = "15";   break;
        case 'Bursa':           plate = "16";   break;
        case 'Çanakkale':       plate = "17";   break;
        case 'Çankırı':         plate = "18";   break;
        case 'Çorum':           plate = "19";   break;
        case 'Denizli':         plate = "20";   break;
        case 'Diyarbakır':      plate = "21";   break;
        case 'Düzce':           plate = "81";   break;
        case 'Edirne':          plate = "22";   break;
        case 'Elazığ':          plate = "23";   break;
        case 'Erzincan':        plate = "24";   break;
        case 'Erzurum':         plate = "25";   break;
        case 'Eskişehir':       plate = "26";   break;
        case 'Gaziantep':       plate = "27";   break;
        case 'Giresun':         plate = "28";   break;
        case 'Gümüşhane':       plate = "29";   break;
        case 'Hakkari':         plate = "30";   break;
        case 'Hatay':           plate = "31";   break;
        case 'Iğdır':           plate = "32";   break;
        case 'Isparta':         plate = "33";   break;
        case 'İstanbul':        plate = "34";   break;
        case 'İzmir':           plate = "35";   break;
        case 'Kahramanmaraş':   plate = "46";   break;
        case 'Karabük':         plate = "78";   break;
        case 'Karaman':         plate = "70";   break;
        case 'Kars':            plate = "36";   break;
        case 'Kastamonu':       plate = "37";   break;
        case 'Kayseri':         plate = "38";   break;
        case 'Kırıkkale':       plate = "71";   break;
        case 'Kırklareli':      plate = "39";   break;
        case 'Kırşehir':        plate = "40";   break;
        case 'Kilis':           plate = "79";   break;
        case 'Kocaeli':         plate = "41";   break;
        case 'Konya':           plate = "42";   break;
        case 'Kütahya':         plate = "43";   break;
        case 'Malatya':         plate = "44";   break;
        case 'Manisa':          plate = "45";   break;
        case 'Mardin':          plate = "47";   break;
        case 'Mersin':          plate = "33";   break;
        case 'Muğla':           plate = "48";   break;
        case 'Muş':             plate = "49";   break;
        case 'Nevşehir':        plate = "50";   break;
        case 'Niğde':           plate = "51";   break;
        case 'Ordu':            plate = "52";   break;
        case 'Osmaniye':        plate = "80";   break;
        case 'Rize':            plate = "53";   break;
        case 'Sakarya':         plate = "54";   break;
        case 'Samsun':          plate = "55";   break;
        case 'Siirt':           plate = "56";   break;
        case 'Sinop':           plate = "57";   break;
        case 'Sivas':           plate = "58";   break;
        case 'Şanlıurfa':       plate = "63";   break;
        case 'Şırnak':          plate = "73";   break;
        case 'Tekirdağ':        plate = "59";   break;
        case 'Tokat':           plate = "60";   break;
        case 'Trabzon':         plate = "61";   break;
        case 'Tunceli':         plate = "62";   break;
        case 'Uşak':            plate = "64";   break;
        case 'Van':             plate = "65";   break;
        case 'Yalova':          plate = "77";   break;
        case 'Yozgat':          plate = "66";   break;
        case 'Zonguldak':       plate = "67";   break;
    }
    return plate;
}

function getAbbrByBrand(brand){
    switch (brand) {
        case "Petrol Ofisi":        brand = "po";       break;
        case "Opet":                brand = "opet";     break;
        case "Alpet":               brand = "alpet";    break;
        case "Sunpet":              brand = "sunpet";   break;
        case "Türkiye Petrolleri":  brand = "tp";       break;
    }
    return brand;
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
    const { city, /*district,*/ brand } = req.body;
    //const selectedCity = convertTurkishChars(city.toLowerCase());
    //const selectedDistrict = convertTurkishChars(district.toLowerCase());
    const selectedBrand = getAbbrByBrand(brand)
    const selectedPlate = getPlateByCity(city);
    res.status(200);

    const options = {
        method: 'GET',
        hostname: 'akaryakit-fiyatlari.vercel.app',
        port: null,
        path: `/api/${selectedBrand}/${selectedPlate}`,
        headers: {
            'content-type': 'application/json',   
        }
    };

    /*
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
    */

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
                console.log(jsonResponse);
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
