document.addEventListener("DOMContentLoaded", () => {
    const fromText = document.querySelector('.from-text');
    const toText = document.querySelector('.to-text');
    const fromSelect = document.querySelector('.from select');
    const toSelect = document.querySelector('.to select');
    const translateButton = document.querySelector('button');
    const exchangeBtn = document.querySelector('.exchange');
    const languages = {
        'en': 'English',
        'fr': 'French',
        'es': 'Spanish',
        'de': 'German',
        'it': 'Italian',
        'pt': 'Portuguese',
        'nl': 'Dutch',
        'ru': 'Russian',
        'zh': 'Chinese',
        'ja': 'Japanese',
        'ko': 'Korean',
        'ar': 'Arabic'
    };
    
    const fillLanguageOptions = (selectElement) => {
        for (const [code, language] of Object.entries(languages)) {
            const option = document.createElement("option");
            option.value = code;
            option.innerHTML = language;
            selectElement.appendChild(option);
        }
    };

    fillLanguageOptions(fromSelect);
    fillLanguageOptions(toSelect);

    const translateText = async () => {
        const fromLanguage = fromSelect.value;
        const toLanguage = toSelect.value;
        const text = fromText.value;

        if (text.trim() === '') return;

        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLanguage}|${toLanguage}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.responseData) {
                toText.value = data.responseData.translatedText;
            } else {
                toText.value = 'Error: Could not translate!';
            }
        } catch (error) {
            toText.value = 'Error: Could not fetch translation!';
        }
    };

    translateButton.addEventListener('click', translateText);

    exchangeBtn.addEventListener('click', () => {
        const fromValue = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = fromValue;
        translateText(); 
    });

    document.querySelectorAll('.fa-volume-up').forEach((icon) => {
        icon.addEventListener('click', (event) => {
            const textElement = event.target.closest('li').classList.contains('from') ? fromText : toText;
            speakText(textElement.value, event.target.closest('li').classList.contains('from') ? 'from' : 'to');
        });
    });

    const speakText = (text, langType) => {
        const language = langType === 'from' ? fromSelect.value : toSelect.value;
        let langCode;

        switch (language) {
            case 'fr':
                langCode = langType === 'from' ? 'fr-FR' : 'fr-FR';
                break;
            case 'en':
                langCode = langType === 'from' ? 'en-US' : 'en-US';
                break;
            case 'es':
                langCode = langType === 'from' ? 'es-ES' : 'es-ES';
                break;
            case 'de':
                langCode = langType === 'from' ? 'de-DE' : 'de-DE';
                break;
            case 'it':
                langCode = langType === 'from' ? 'it-IT' : 'it-IT';
                break;
            case 'pt':
                langCode = langType === 'from' ? 'pt-PT' : 'pt-PT';
                break;
            case 'ru':
                langCode = langType === 'from' ? 'ru-RU' : 'ru-RU';
                break;
            case 'zh':
                langCode = langType === 'from' ? 'zh-CN' : 'zh-CN';
                break;
            case 'ja':
                langCode = langType === 'from' ? 'ja-JP' : 'ja-JP';
                break;
            case 'ko':
                langCode = langType === 'from' ? 'ko-KR' : 'ko-KR';
                break;
            case 'ar':
                langCode = langType === 'from' ? 'ar-SA' : 'ar-SA';
                break;
            default:
                langCode = langType === 'from' ? 'en-US' : 'en-US'; 
        }

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = langCode; 
        speechSynthesis.speak(speech);
    };

    document.querySelectorAll('.fa-copy').forEach((icon) => {
        icon.addEventListener('click', (event) => {
            const textElement = event.target.closest('li').classList.contains('from') ? fromText : toText;
            copyToClipboard(textElement.value);
        });
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
        }).catch((error) => {
            alert('Error copying text!');
        });
    };
});
