# Caesar Cipher Implementation
def caesar_cipher(text, key, decrypt=False):
    result = ""
    shift = -key if decrypt else key
    for char in text:
        if char.isalpha():
            shift_amount = 65 if char.isupper() else 97
            result += chr((ord(char) - shift_amount + shift) % 26 + shift_amount)
        else:
            result += char
    return result

# Vigenère Cipher Implementation
def vigenere_cipher(text, key, decrypt=False):
    result = []
    key = key.lower()
    key_index = 0
    key_length = len(key)

    for char in text:
        if char.isalpha():
            shift = ord(key[key_index]) - ord('a')
            shift = -shift if decrypt else shift
            shift_amount = 65 if char.isupper() else 97
            result.append(chr((ord(char) - shift_amount + shift) % 26 + shift_amount))
            key_index = (key_index + 1) % key_length
        else:
            result.append(char)
    return ''.join(result)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cipher', methods=['POST'])
def cipher():
    data = request.json
    text = data['text']
    key = int(data['key']) if data['cipher'] == 'caesar' else data['key']
    cipher_type = data['cipher']
    action = data['action']

    if cipher_type == 'caesar':
        result = caesar_cipher(text, key, decrypt=(action == 'decrypt'))
    elif cipher_type == 'vigenere':
        result = vigenere_cipher(text, key, decrypt=(action == 'decrypt'))
    else:
        result = "Invalid Cipher Choice"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
