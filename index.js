'use strict';

{
    // 配列のシャッフル
    const shuffle = (array) => {
        for (let idx = array.length - 1; idx > 0; idx--) {
            const passCharar = Math.floor(Math.random() * (idx + 1));
            [array[idx], array[passCharar]] = [array[passCharar], array[idx]];
        }
        return array;
    }

    // パスワード表示
    const showPassword = () => {
        // 画面要素の取得
        const result            = document.getElementById('pass-window');
        const slider            = document.getElementById('slider');
        const numbersCheckbox   = document.getElementById('numbers-checkbox');
        const symbolsCheckbox   = document.getElementById('symbols-checkbox');

        // 文字種の定義
        const letters       = 'abcdefghijklmnopqrstuvwxyz';
        const numbers       = '0123456789';
        const symbols       = '!@#$%^&*()_+[]{}|;:,.<>?';
        let seed            = letters + letters.toUpperCase();
        const mustInclude   = [];
        let passwordChars   = [];

        // 数字が必須のときに確実に一文字保持
        if(numbersCheckbox.checked){
            seed += numbers;
            mustInclude.push(numbers[Math.floor(Math.random() * numbers.length)]);
        }

        // 記号が必須のときに確実に一文字保持
        if(symbolsCheckbox.checked){
            seed += symbols;
            mustInclude.push(symbols[Math.floor(Math.random() * symbols.length)]);
        }

        // 残りの文字をランダムに選択
        const remainingLength = slider.value - mustInclude.length;
        for(let i = 0; i < remainingLength; i++){
            passwordChars.push(seed[Math.floor(Math.random() * seed.length)]);
        }

        // 必須文字を追加してシャッフル
        passwordChars = passwordChars.concat(mustInclude);
        passwordChars = shuffle(passwordChars);

        result.textContent = passwordChars.join('');
    }

    // move slider
    slider.addEventListener('input', () => {
        const passLength = document.getElementById('password-length');
        passLength.textContent = slider.value;
    });

    // button onclick
    const button = document.getElementById('getPass-button');
    button.addEventListener('click', showPassword);

    // 初回実行
    showPassword();
}
