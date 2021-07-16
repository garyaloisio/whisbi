export async function currencyIndividualChooserTwo(dataPoints, chart, selectedValue) {
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
