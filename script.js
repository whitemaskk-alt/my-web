document.getElementById("submit").addEventListener("click", function() {
    // Mendapatkan nilai daripada input pengguna
    let teksAsal = document.getElementById("teks_asal").value;
    let shift = parseInt(document.getElementById("shift").value);
    let pilihan = document.getElementById("pilihan").value;
    let hasil = "";

    // Fungsi penyulitan Caesar cipher
    function caesarCipher(teks, shift, mode) {
        let hasilTeks = "";
        shift = mode === "1" ? shift : -shift; // Menentukan jika penyulitan (+) atau penyahsulitan (-)
        for (let i = 0; i < teks.length; i++) {
            let char = teks[i];
            
            if (char.match(/[a-z]/i)) {  // Hanya untuk huruf
                let code = teks.charCodeAt(i);
                let asciiOffset = code >= 65 && code <= 90 ? 65 : 97; // Untuk huruf besar dan kecil
                
                // Caesar Cipher untuk huruf
                let shiftedChar = String.fromCharCode(((code - asciiOffset + shift) % 26 + 26) % 26 + asciiOffset);
                hasilTeks += shiftedChar;
            } else {
                hasilTeks += char; // Simbol dan angka tidak berubah
            }
        }
        return hasilTeks;
    }

    // Menentukan sama ada pengguna ingin menyulitkan atau menyahsulitkan
    if (pilihan === "1") {
        hasil = caesarCipher(teksAsal, shift, "1"); // Penyulitan
    } else if (pilihan === "2") {
        hasil = caesarCipher(teksAsal, shift, "2"); // Penyahsulitan
    }

    // Memaparkan hasil pada skrin
    document.getElementById("hasil").textContent = hasil;
});
