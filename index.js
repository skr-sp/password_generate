'use strict';

{
    // 変数定義
    const CHARACTER_SETS = {
        letters: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    const DOM_IDS = {
        passWindow: 'pass-window',
        slider: 'slider',
        numbersCheckbox: 'numbers-checkbox',
        symbolsCheckbox: 'symbols-checkbox',
        passwordLength: 'password-length',
        getPassButton: 'getPass-button'
    };

    // 配列のシャッフル関数
    const shuffle = (array) => {
        for (let idx = array.length - 1; idx > 0; idx--) {
            const passCharar = Math.floor(Math.random() * (idx + 1));
            [array[idx], array[passCharar]] = [array[passCharar], array[idx]];
        }
        return array;
    };

    // パスワード表示関数
    const showPassword = () => {
        // 画面要素の取得
        const result            = document.getElementById(DOM_IDS.passWindow);
        const slider            = document.getElementById(DOM_IDS.slider);
        const numbersCheckbox   = document.getElementById(DOM_IDS.numbersCheckbox);
        const symbolsCheckbox   = document.getElementById(DOM_IDS.symbolsCheckbox);

        // 文字種の定義
        const letters       = CHARACTER_SETS.letters;
        const numbers       = CHARACTER_SETS.numbers;
        const symbols       = CHARACTER_SETS.symbols;

        let seed            = CHARACTER_SETS.letters + CHARACTER_SETS.letters.toUpperCase();
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
        const passLength = document.getElementById(DOM_IDS.passwordLength);
        passLength.textContent = slider.value;
    });

    // button onclick
    const button = document.getElementById(DOM_IDS.getPassButton);
    button.addEventListener('click', showPassword);

    // 初回実行
    showPassword();
}
