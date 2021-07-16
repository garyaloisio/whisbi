export async function fetchRatesCountryData(symbols) {
  let result = await sendHttpRequest('GET', `http://api.exchangeratesapi.io/v1/latest?access_key=e2c5138489e8015341ed2a1a48941af2&base=EUR&symbols=${symbols}`)
  if (result) {
    return result
  }
}
