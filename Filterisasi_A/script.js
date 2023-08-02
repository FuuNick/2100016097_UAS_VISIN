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

    const causeCounts = {};
    const causes = [];

    // Menghitung jumlah masing-masing kategori "Cause"
    data.forEach(item => {
        const cause = item.Cause;
        if (!causeCounts[cause]) {
            causeCounts[cause] = 0;
            causes.push(cause);
        }
        causeCounts[cause]++;
    });

    // Menampilkan tabulasi silang dalam bentuk tabel
    const outputDiv = document.getElementById('output');
    const table = document.createElement('table');

    // Membuat baris header tabel
    const headerRow = table.insertRow();
    const headerCell1 = headerRow.insertCell();
    headerCell1.textContent = "Cause";
    const headerCell2 = headerRow.insertCell();
    headerCell2.textContent = "Jumlah";

    causes.forEach(cause => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        cell1.textContent = cause;
        const cell2 = row.insertCell();
        cell2.textContent = causeCounts[cause];
    });

    outputDiv.innerHTML = '';
    outputDiv.appendChild(table);
}

// Menghubungkan elemen input dengan fungsi untuk membaca file
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    parseFile(file);
});
