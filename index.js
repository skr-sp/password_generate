// 変数定義
const CHARACTER_SETS = {
    letters: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
};

const DOM_IDS = {
    passWindow:      'pass-window',
    slider:          'slider',
    numbersCheckbox: 'numbers-checkbox',
    symbolsCheckbox: 'symbols-checkbox',
    passwordLength:  'password-length',
    getPassButton:   'getPass-button'
};

/**
 * DOM要素を取得する関数
 * @returns {Object} - DOM要素のオブジェクト
 */
export const getDomElements = () => {
    return {
        passWindow: document.getElementById(DOM_IDS.passWindow),
        slider: document.getElementById(DOM_IDS.slider),
        numbersCheckbox: document.getElementById(DOM_IDS.numbersCheckbox),
        symbolsCheckbox: document.getElementById(DOM_IDS.symbolsCheckbox),
        passwordLength: document.getElementById(DOM_IDS.passwordLength),
        getPassButton: document.getElementById(DOM_IDS.getPassButton)
    };
}

/**
 * パスワードを生成する関数
 * @param {int} length
 * @param {boolean} includeNumbers 
 * @param {boolean} includeSymbols 
 * @returns 
 */
export const generatePassword = (length, includeNumbers, includeSymbols) => {
    const characterSet = buildCharacterSet(includeNumbers, includeSymbols);
    const mustInclude = getMustIncludeCharacters(includeNumbers, includeSymbols);
    const remainingLength = length - mustInclude.length;
    const randomChar = generateRandomCharacters(characterSet, remainingLength);

    let allCharacters = randomChar.concat(mustInclude);
    allCharacters = shuffle(allCharacters);

    return allCharacters.join('');
}

/**
 * 文字セットを構築する関数
 * @param {boolean} includeNumbers - 数字を含めるかどうか
 * @param {boolean} includeSymbols - 記号を含めるかどうか
 * @returns {string} - 構築された文字セット
 */
export const buildCharacterSet = (includeNumbers, includeSymbols) => {
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
export const getMustIncludeCharacters = (includeNumbers, includeSymbols) => {
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
export const generateRandomCharacters = (characterSet, length) => {
    const character = [];

    for (let i = 0; i < length; i++) {
        const randomChar = characterSet[
            Math.floor(Math.random() * characterSet.length)
        ];

        character.push(randomChar);
    }

    return character;
}

/**
 * 配列をシャッフルする関数
 * @param {Array} array - シャッフルする配列
 * @returns {Array} - シャッフルされた新しい配列
 */
export const shuffle = (array) => {
    const shuffled = [...array];

    for (let idx = shuffled.length - 1; idx > 0; idx--) {
        const randomIdx = Math.floor(Math.random() * (idx + 1));
        [shuffled[idx], shuffled[randomIdx]] = [shuffled[randomIdx], shuffled[idx]];
    }

    return shuffled;
};

/** 
 * パスワード表示の更新
 * @param {Object} elements - DOM要素のオブジェクト
 */
export const updatePasswordDisplay = (elements) => {
    const length = parseInt(elements.slider.value);
    const isIncludeNumbers = elements.numbersCheckbox.checked;
    const isIncludeSymbols = elements.symbolsCheckbox.checked;

    const password = generatePassword(length, isIncludeNumbers, isIncludeSymbols);
    elements.passWindow.textContent = password;
}

/** 
 * スライダー表示の更新
 * @param {Object} elements - DOM要素のオブジェクト
 */
export const updateSliderDisplay = (elements) => {
    elements.slider.addEventListener('input', () => {
        updateSliderDisplay(elements);
    });

    elements.getPassButton.addEventListener('click', () => {
        updatePasswordDisplay(elements);
    });
};

/** 
 * イベントリスナーの設定
 * @param {Object} elements - DOM要素のオブジェクト
 */
export const setupEventListeners = (elements) => {
    elements.slider.addEventListener('input', () => {
        updateSliderDisplay(elements);
    });

    elements.getPassButton.addEventListener('click', () => {
        updatePasswordDisplay(elements);
    });
};

// アプリケーションの初期化
export const initializeApp = () => {
    const elements = getDomElements();
    setupEventListeners(elements);
    updatePasswordDisplay(elements);
};

//DOMの読み込み完了を待ってアプリケーションを初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
