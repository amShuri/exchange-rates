async function fetchJson(endpoint) {
  const res = await fetch(`https://api.frankfurter.app/${endpoint}`);
  return await res.json();
}

async function createOptions() {
  const currencies = await fetchJson("currencies");

  for (const currency in currencies) {
    document.querySelector("select").insertAdjacentHTML(
      "beforeend",
      `
        <option value="${currency}">${currency} - ${currencies[currency]}</option>
      `
    );
  }
}

async function createTable(date, countryCode) {
  const currencies = await fetchJson("currencies");
  const exchangeRates = await fetchJson(`${date}?from=${countryCode}`);
  const $tbody = document.querySelector("tbody");

  // Clear existing table rows
  $tbody.innerHTML = "";

  for (const countryCode in exchangeRates.rates) {
    $tbody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${countryCode}</td>
        <td>${currencies[countryCode]}</td>
        <td>${exchangeRates.rates[countryCode].toLocaleString()}</td>
      </tr>
      `
    );
  }
}

function updateDateInput() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const $dateInput = document.querySelector("input[type='date']");
  $dateInput.value = `${year}-${month}-${day}`;
}

async function initialize() {
  // Update the Date Input with the current date
  updateDateInput();

  // Populate options in the <select> element
  await createOptions();

  // Add event listener to the form
  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const date = document.querySelector("input[type='date']").value;
    const countryCode = document.querySelector("select").value;

    // Populate rows in the <table> element
    await createTable(date, countryCode);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();
});
