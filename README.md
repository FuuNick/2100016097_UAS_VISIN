# Proses Pembuatan Tabulasi Silang

1. Membagikan 2 direktori yang berbeda untuk filterisasi pada soal bagian 1a dan 1b. 1a untuk filtersisasi penyebab-penyebab kematian di Indoensai dan 1b untuk filerisasi data tentang jumlah kematian di Indonesia berdasarkan tahun dan tipe.`

2. Membuat file index.html dan script.js untuk masing-masing direktori.

3. Membuat file .csv (Dikarenakan aplikasi ini hanya menggunakan file berformat .csv) untuk data source nya.

4. File index untuk filterisasi 1a (data tentang penyebab-penyebab kematian di Indonesia)

    index.html
    ```
    <!DOCTYPE html>
    <html>
    <head>
        <title>Data Kematian di Indonesia - Tabulasi Silang</title>
     <style>
          table {
              border-collapse: collapse;
              width: 50%; /* Sesuaikan lebar tabel di sini */
               margin: 10px 0;
           }

            th, td {
                border: 1px solid black;
                padding: 8px;
              text-align: left;
            }

          th {
              background-color: #f2f2f2;
           }
       </style>
    </head>
    <body>
      <input type="file" id="fileInput" accept=".csv">
     <div id="output"></div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
      <script src="script.js"></script>
    </body>
    </html>
    ```
    script.js
    ```
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
    ```
    Kode diatas merupakan html yang terhubung langsung dengan javascript.

5. File index untuk filterisasi 1b (Data tentang jumlah kematian di Indonesia berdasarkan tahun dan tipe).

    index.html
    ```
    <!DOCTYPE html>
    <html>
    <head>
        <title>Data Kematian di Indonesia - Tabulasi Silang</title>
        <style>
            table {
                border-collapse: collapse;
                width: 70%; /* Sesuaikan lebar tabel di sini */
                margin: 10px 0;
            }

            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <input type="file" id="fileInput" accept=".csv">
        <div id="output"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
        <script src="script.js"></script>
    </body>
    </html>
    ```
    script.js
    ```
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
    ```

6. Dua program diatas bekerja dengan mengimpor file .csv sebagai data source: `Penyebab kematian di Indonesia yang dilaporkan.csv`