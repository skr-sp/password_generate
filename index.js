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

    /**
     * 配列をシャッフルする関数
     * @param {Array} array - シャッフルする配列
     * @returns {Array} - シャッフルされた新しい配列
     */
    const shuffle = (array) => {
        const shuffled = [...array];
        for (let idx = shuffled.length - 1; idx > 0; idx--) {
            const randomIdx = Math.floor(Math.random() * (idx + 1));
            [shuffled[idx], shuffled[randomIdx]] = [shuffled[randomIdx], shuffled[idx]];
        }
        return shuffled;
    };

    /**
     * 文字セットを構築する関数
     * @param {boolean} includeNumbers - 数字を含めるかどうか
     * @param {boolean} includeSymbols - 記号を含めるかどうか
     * @returns {string} - 構築された文字セット
     */
    const buildCharacterSet = (includeNumbers, includeSymbols) => {
        let seed = CHARACTER_SETS.letters + CHARACTER_SETS.letters.toUpperCase();

        if (includeNumbers) {
            seed += CHARACTER_SETS.numbers;
        }

        if (includeSymbols) {
            seed += CHARACTER_SETS.symbols;
        }

        return seed;
    };

    /**
     * 必須文字を取得する関数
     * @param {boolean} includeNumbers - 数字を含めるかどうか
     * @param {boolean} includeSymbols - 記号を含めるかどうか
     * @returns {Array} - 必須文字の配列
     */
    const getMustIncludeCharacters = (includeNumbers, includeSymbols) => {
        const mustInclude = [];

        if (includeNumbers) {
            const randomNumber = CHARACTER_SETS.numbers[
                Math.floor(Math.random() * CHARACTER_SETS.numbers.length)
            ];
            mustInclude.push(randomNumber);
        }

        if (includeSymbols) {
            const randomSymbol = CHARACTER_SETS.symbols[
                Math.floor(Math.random() * CHARACTER_SETS.symbols.length)
            ];
            mustInclude.push(randomSymbol);
        }

        return mustInclude;
    }

    /**
     * 指定された文字セットからランダムな文字を生成する関数
     * @param {string} characterSet - 文字セット
     * @param {number} length - 生成する文字数
     * @returns {Array} - 生成された文字の配列
     */
    const generateRandomCharacters = (characterSet, length) => {
        const character = [];

        for (let i = 0; i < length; i++) {
            const randomChar = characterSet[
                Math.floor(Math.random() * characterSet.length)
            ];
            character.push(randomChar);
        }

        return character;
    }

    const generatePassword = (includeNumbers, includeSymbols) => {
        const characterSet = buildCharacterSet(includeNumbers, includeSymbols);
        const mustInclude = getMustIncludeCharacters(includeNumbers, includeSymbols);
        const remainingLength = slider.value - mustInclude.length;

        const length = generateRandomCharacters(characterSet, remainingLength);
        let allCharacters = length.concat(mustInclude);
        allCharacters = shuffle(allCharacters);

        return allCharacters.join('');
    }

    /**
     * パスワードを表示する関数
     */
    const showPassword = () => {
        // 画面要素の取得
        const result            = document.getElementById(DOM_IDS.passWindow);
        const slider            = document.getElementById(DOM_IDS.slider);
        const numbersCheckbox   = document.getElementById(DOM_IDS.numbersCheckbox);
        const symbolsCheckbox   = document.getElementById(DOM_IDS.symbolsCheckbox);

        const length = parseInt(slider.value);
        const isInccludeNumbers = numbersCheckbox.checked;
        const isInccludeSymbols = symbolsCheckbox.checked;

        const passwordChars = generatePassword(isInccludeNumbers, isInccludeSymbols);

        result.textContent = passwordChars;
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
