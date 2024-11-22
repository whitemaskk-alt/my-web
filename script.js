async function sendData(action) {
    const cipherSelect = document.getElementById('cipher-select').value;
    const inputText = document.getElementById('input-text').value;
    const key = document.getElementById('key').value;

    const response = await fetch('/cipher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cipher: cipherSelect,
            text: inputText,
            key: key,
            action: action
        })
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.result;
}

function encrypt() {
    sendData('encrypt');
}

function decrypt() {
    sendData('decrypt');
}
