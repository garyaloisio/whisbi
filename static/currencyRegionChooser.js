export async function currencyRegionChooser(dataPoints, chart, selectedValue) {
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
