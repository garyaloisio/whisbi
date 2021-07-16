// import { sendHttpRequest } from './static/sendHttpRequest'
// import { currencyRegionChooser } from './static/currencyRegionChooser'
// import { currencyIndividualChooser } from './static/currencyIndividualChooser'
// import { currencyIndividualChooserTwo } from './static/currencyIndividualChooserTwo'
// import { fetchRatesCountryData } from './static/fetchRatesCountryData'
// import { fetchRatesCountryDataWithDate } from './static/fetchRatesCountryDataWithDate'
// import { changeDate } from './static/changeDate'


const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    console.log('url: ', url)
    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        alert("SORRY WE DONT HAVE WHAT YOU'RE LOOKING FOR");
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject('Something went wrong!');
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};


async function currencyRegionChooser(dataPoints, chart, selectedValue) {
  let string
  if (selectedValue === "Select A Region") {
    return
  }
  if (selectedValue === "Americas") {
    string = "USD,CAD,MXN,BRL"
  }
  if (selectedValue === "Europe") {
    string = "GBP,CHF,SEK,NOK,TRY,DKK,PLN"
  }
  if (selectedValue === "Asia") {
    string = "JPY,AUD,CNY,NZD,SGD,HKD,INR,TWD"
  }
  if (selectedValue === "Africa") {
    string = "ZAR,NGN,CVE"
  }
  if (selectedValue === "Bitcoin") {
    string = "BTC"
  }
  let query = await fetchRatesCountryData(string)
  dataPoints.splice(0, dataPoints.length)
  for (let key in query.rates) {
    dataPoints.push({
      label: key,
      y: 1 / query.rates[key]
    });
  }
  chart.options.subtitles[0].text = query.date
  chart.render();

}

async function currencyIndividualChooser(dataPoints, chart, selectedValue) {
  if (selectedValue === "Select A Currency") {
    return
  }
  let string = selectedValue.slice(1, 4)
  let query = await fetchRatesCountryData(string)
  let secondDataPoint = null

  if (dataPoints.length === 2) {
    secondDataPoint = dataPoints[1]
  }

  dataPoints.splice(0, dataPoints.length)

  if (secondDataPoint !== null) {

    for (let key in query.rates) {
      dataPoints.unshift({
        label: key,
        y: 1 / query.rates[key]
      });
    }

    dataPoints.push(secondDataPoint)
  }
  else {

    for (let key in query.rates) {
      dataPoints.push({
        label: key,
        y: 1 / query.rates[key]
      });
    }
  }






  chart.options.subtitles[0].text = query.date
  chart.render();
}


async function currencyIndividualChooserTwo(dataPoints, chart, selectedValue) {
  if (selectedValue === "Select A Currency") {
    return
  }
  let string = selectedValue.slice(1, 4)
  let query = await fetchRatesCountryData(string)


  for (let key in query.rates) {
    if (dataPoints.length === 2) {
      // dataPoints.splice(0, dataPoints.length)
      dataPoints.pop()
      dataPoints.push({
        label: key,
        y: 1 / query.rates[key]
      });
    }
    else if (dataPoints.length > 2) {
      dataPoints.splice(0, dataPoints.length)
      dataPoints.push({
        label: key,
        y: 1 / query.rates[key]
      });
    }
    else {
      dataPoints.push({
        label: key,
        y: 1 / query.rates[key]
      });
    }
  }
  chart.options.subtitles[0].text = query.date
  chart.render();
}


async function fetchRatesCountryData(symbols) {
  let result = await sendHttpRequest('GET', `http://api.exchangeratesapi.io/v1/latest?access_key=e2c5138489e8015341ed2a1a48941af2&base=EUR&symbols=${symbols}`)
  if (result) {
    return result
  }
}

async function fetchRatesCountryDataWithDate(symbols, date) {
  let result = await sendHttpRequest('GET', `http://api.exchangeratesapi.io/v1/${date}?access_key=e2c5138489e8015341ed2a1a48941af2&base=EUR&symbols=${symbols}`)
  if (result) {
    return result
  }
}


const currencies = {
  AED: "United Arab Emirates Dirham",
  AFN: "Afghan Afghani",
  ALL: "Albanian Lek",
  AMD: "Armenian Dram",
  ANG: "Netherlands Antillean Guilder",
  AOA: "Angolan Kwanza",
  ARS: "Argentine Peso",
  AUD: "Australian Dollar",
  AWG: "Aruban Florin",
  AZN: "Azerbaijani Manat",
  BAM: "Bosnia-Herzegovina Convertible Mark",
  BBD: "Barbadian Dollar",
  BDT: "Bangladeshi Taka",
  BGN: "Bulgarian Lev",
  BHD: "Bahraini Dinar",
  BIF: "Burundian Franc",
  BMD: "Bermudan Dollar",
  BND: "Brunei Dollar",
  BOB: "Bolivian Boliviano",
  BRL: "Brazilian Real",
  BSD: "Bahamian Dollar",
  BTC: "Bitcoin",
  BTN: "Bhutanese Ngultrum",
  BWP: "Botswanan Pula",
  BYN: "New Belarusian Ruble",
  BYR: "Belarusian Ruble",
  BZD: "Belize Dollar",
  CAD: "Canadian Dollar",
  CDF: "Congolese Franc",
  CHF: "Swiss Franc",
  CLF: "Chilean Unit of Account (UF)",
  CLP: "Chilean Peso",
  CNY: "Chinese Yuan",
  COP: "Colombian Peso",
  CRC: "Costa Rican Colón",
  CUC: "Cuban Convertible Peso",
  CUP: "Cuban Peso",
  CVE: "Cape Verdean Escudo",
  CZK: "Czech Republic Koruna",
  DJF: "Djiboutian Franc",
  DKK: "Danish Krone",
  DOP: "Dominican Peso",
  DZD: "Algerian Dinar",
  EGP: "Egyptian Pound",
  ERN: "Eritrean Nakfa",
  ETB: "Ethiopian Birr",
  EUR: "Euro",
  FJD: "Fijian Dollar",
  FKP: "Falkland Islands Pound",
  GBP: "British Pound Sterling",
  GEL: "Georgian Lari",
  GGP: "Guernsey Pound",
  GHS: "Ghanaian Cedi",
  GIP: "Gibraltar Pound",
  GMD: "Gambian Dalasi",
  GNF: "Guinean Franc",
  GTQ: "Guatemalan Quetzal",
  GYD: "Guyanaese Dollar",
  HKD: "Hong Kong Dollar",
  HNL: "Honduran Lempira",
  HRK: "Croatian Kuna",
  HTG: "Haitian Gourde",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  IMP: "Manx pound",
  INR: "Indian Rupee",
  IQD: "Iraqi Dinar",
  IRR: "Iranian Rial",
  ISK: "Icelandic Króna",
  JEP: "Jersey Pound",
  JMD: "Jamaican Dollar",
  JOD: "Jordanian Dinar",
  JPY: "Japanese Yen",
  KES: "Kenyan Shilling",
  KGS: "Kyrgystani Som",
  KHR: "Cambodian Riel",
  KMF: "Comorian Franc",
  KPW: "North Korean Won",
  KRW: "South Korean Won",
  KWD: "Kuwaiti Dinar",
  KYD: "Cayman Islands Dollar",
  KZT: "Kazakhstani Tenge",
  LAK: "Laotian Kip",
  LBP: "Lebanese Pound",
  LKR: "Sri Lankan Rupee",
  LRD: "Liberian Dollar",
  LSL: "Lesotho Loti",
  LTL: "Lithuanian Litas",
  LVL: "Latvian Lats",
  LYD: "Libyan Dinar",
  MAD: "Moroccan Dirham",
  MDL: "Moldovan Leu",
  MGA: "Malagasy Ariary",
  MKD: "Macedonian Denar",
  MMK: "Myanma Kyat",
  MNT: "Mongolian Tugrik",
  MOP: "Macanese Pataca",
  MRO: "Mauritanian Ouguiya",
  MUR: "Mauritian Rupee",
  MVR: "Maldivian Rufiyaa",
  MWK: "Malawian Kwacha",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  MZN: "Mozambican Metical",
  NAD: "Namibian Dollar",
  NGN: "Nigerian Naira",
  NIO: "Nicaraguan Córdoba",
  NOK: "Norwegian Krone",
  NPR: "Nepalese Rupee",
  NZD: "New Zealand Dollar",
  OMR: "Omani Rial",
  PAB: "Panamanian Balboa",
  PEN: "Peruvian Nuevo Sol",
  PGK: "Papua New Guinean Kina",
  PHP: "Philippine Peso",
  PKR: "Pakistani Rupee",
  PLN: "Polish Zloty",
  PYG: "Paraguayan Guarani",
  QAR: "Qatari Rial",
  RON: "Romanian Leu",
  RSD: "Serbian Dinar",
  RUB: "Russian Ruble",
  RWF: "Rwandan Franc",
  SAR: "Saudi Riyal",
  SBD: "Solomon Islands Dollar",
  SCR: "Seychellois Rupee",
  SDG: "Sudanese Pound",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  SHP: "Saint Helena Pound",
  SLL: "Sierra Leonean Leone",
  SOS: "Somali Shilling",
  SRD: "Surinamese Dollar",
  STD: "São Tomé and Príncipe Dobra",
  SVC: "Salvadoran Colón",
  SYP: "Syrian Pound",
  SZL: "Swazi Lilangeni",
  THB: "Thai Baht",
  TJS: "Tajikistani Somoni",
  TMT: "Turkmenistani Manat",
  TND: "Tunisian Dinar",
  TOP: "Tongan Paʻanga",
  TRY: "Turkish Lira",
  TTD: "Trinidad and Tobago Dollar",
  TWD: "New Taiwan Dollar",
  TZS: "Tanzanian Shilling",
  UAH: "Ukrainian Hryvnia",
  UGX: "Ugandan Shilling",
  USD: "United States Dollar",
  UYU: "Uruguayan Peso",
  UZS: "Uzbekistan Som",
  VEF: "Venezuelan Bolívar Fuerte",
  VND: "Vietnamese Dong",
  VUV: "Vanuatu Vatu",
  WST: "Samoan Tala",
  XAF: "CFA Franc BEAC",
  XAG: "Silver (troy ounce)",
  XAU: "Gold (troy ounce)",
  XCD: "East Caribbean Dollar",
  XDR: "Special Drawing Rights",
  XOF: "CFA Franc BCEAO",
  XPF: "CFP Franc",
  YER: "Yemeni Rial",
  ZAR: "South African Rand",
  ZMK: "Zambian Kwacha (pre-2013)",
  ZMW: "Zambian Kwacha",
  ZWL: "Zimbabwean Dollar"
};


const selectCurrency = document.getElementById("selectCurrency");
const selectCurrencyTwo = document.getElementById("selectCurrencyTwo")

for (let key in currencies) {
  let opt = "[" + key + "]" + " " + currencies[key];
  let el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectCurrency.appendChild(el);
}

for (let key in currencies) {
  let opt = "[" + key + "]" + " " + currencies[key];
  let el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectCurrencyTwo.appendChild(el);

}

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}


async function changeDate(dataPoints, chart, event) {
  event.preventDefault()
  let date = event.target.elements.searchTerm.value
  if (isValidDate(date)) {
    let string = ""
    if (dataPoints.length === 1) {
      string += dataPoints[0].label
      let query = await fetchRatesCountryDataWithDate(string, date)
      dataPoints.splice(0, dataPoints.length)
      for (let key in query.rates) {
        dataPoints.push({
          label: key,
          y: 1 / query.rates[key]
        });
      }
      chart.options.subtitles[0].text = query.date;
      chart.render();
      event.target.elements.searchTerm.value = ''
    }

    else {
      for (let i = 0; i < dataPoints.length - 1; i++) {
        string += dataPoints[i].label + ","
      }
      string += dataPoints[dataPoints.length - 1].label
      let query = await fetchRatesCountryDataWithDate(string, date)
      dataPoints.splice(0, dataPoints.length)
      for (let key in query.rates) {
        dataPoints.push({
          label: key,
          y: 1 / query.rates[key]
        });
      }
      chart.options.subtitles[0].text = query.date
      chart.render();

      event.target.elements.searchTerm.value = ''
    }
  }
  else {
    alert('Please Enter Valid Date in YYYY-MM-DD Format')
  }

}

function clickMe(dataPoints, chart) {
  console.log('hello')
  dataPoints.splice(0, dataPoints.length)
  chart.render()
}
