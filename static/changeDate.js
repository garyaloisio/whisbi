export function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}


export async function changeDate(dataPoints, chart, event) {
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
