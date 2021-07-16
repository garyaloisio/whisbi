export async function currencyIndividualChooser(dataPoints, chart, selectedValue) {
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
