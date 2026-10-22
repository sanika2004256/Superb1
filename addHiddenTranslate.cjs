const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const translateCode = `
    <!-- Hidden Google Translate -->
    <style>
      #google_translate_element { display: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; }
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    </style>
    <div id="google_translate_element"></div>
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,mr',
          autoDisplay: false
        }, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script>
      window.doTranslate = function(lang) {
          var teCombo = document.querySelector('select.goog-te-combo');
          if (teCombo) {
              teCombo.value = lang;
              teCombo.dispatchEvent(new Event('change'));
          }
      };
    </script>
</body>
`;

html = html.replace('</body>', translateCode);
fs.writeFileSync('index.html', html);
console.log('Added hidden translate logic');
