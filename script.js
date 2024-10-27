function caesarCipher(text, key, encrypt = true) {
    const shift = encrypt ? key : -key;
    return text.split('').map(char => {
        let code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            // Uppercase letters
            return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
            // Lowercase letters
            return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        } else {
            // Non-alphabetic characters
            return char;
        }
    }).join('');
}

function vigenereCipher(text, key, encrypt = true) {
    key = key.toLowerCase();
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            let shift = (key.charCodeAt(keyIndex % key.length) - 97) * (encrypt ? 1 : -1);
            result += String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
            keyIndex++;
        } else if (code >= 97 && code <= 122) {
            let shift = (key.charCodeAt(keyIndex % key.length) - 97) * (encrypt ? 1 : -1);
            result += String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
            keyIndex++;
        } else {
            result += text[i];
        }
    }
    
    return result;
}

function encrypt() {
    const cipherType = document.getElementById("cipher-select").value;
    const inputText = document.getElementById("input-text").value;
    const key = document.getElementById("key").value;
    
    let result = '';
    
    if (cipherType === "caesar") {
        const shift = parseInt(key);
        result = caesarCipher(inputText, shift, true);
    } else if (cipherType === "vigenere") {
        result = vigenereCipher(inputText, key, true);
    }
    
    document.getElementById("result").innerText = result;
}

function decrypt() {
    const cipherType = document.getElementById("cipher-select").value;
    const inputText = document.getElementById("input-text").value;
    const key = document.getElementById("key").value;
    
    let result = '';
    
    if (cipherType === "caesar") {
        const shift = parseInt(key);
        result = caesarCipher(inputText, shift, false);
    } else if (cipherType === "vigenere") {
        result = vigenereCipher(inputText, key, false);
    }
    
    document.getElementById("result").innerText = result;
}
