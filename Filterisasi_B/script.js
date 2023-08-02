// Fungsi untuk membaca file CSV
function parseFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const csvData = event.target.result;
        processData(csvData);
    };
    reader.readAsText(file);
}

// Fungsi untuk memproses data dan menampilkan tabulasi silang
function processData(csvData) {
    const data = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

    const crossTabulation = {};

    // Membuat tabulasi silang berdasarkan "Total Deaths", "Year", dan "Type"
    data.forEach(item => {
        const totalDeaths = item['Total Deaths'];
        const year = item.Year;
        const type = item.Type;
        const key = totalDeaths + '-' + year + '-' + type;

        if (!crossTabulation[key]) {
            crossTabulation[key] = { totalDeaths, year, type, count: 1 };
        } else {
            crossTabulation[key].count++;
        }
    });

    // Menampilkan tabulasi silang dalam bentuk tabel
    const outputDiv = document.getElementById('output');
    const table = document.createElement('table');

    // Membuat baris header tabel
    const headerRow = table.insertRow();
    const headerCell1 = headerRow.insertCell();
    headerCell1.textContent = "Total Deaths";
    const headerCell2 = headerRow.insertCell();
    headerCell2.textContent = "Year";
    const headerCell3 = headerRow.insertCell();
    headerCell3.textContent = "Type";

    // Menambahkan data ke dalam tabel
    for (const key in crossTabulation) {
        if (crossTabulation.hasOwnProperty(key)) {
            const row = table.insertRow();
            const { totalDeaths, year, type, count } = crossTabulation[key];
            const cell1 = row.insertCell();
            cell1.textContent = totalDeaths;
            const cell2 = row.insertCell();
            cell2.textContent = year;
            const cell3 = row.insertCell();
            cell3.textContent = type;
        }
    }

    outputDiv.innerHTML = '';
    outputDiv.appendChild(table);
}

// Menghubungkan elemen input dengan fungsi untuk membaca file
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    parseFile(file);
});
