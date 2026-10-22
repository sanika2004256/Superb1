const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const translateCode = `
    <!-- Custom Language Toggle -->
    <style>
      #google_translate_element { display: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; }
      .lang-toggle {
        position: fixed;
        bottom: 24px;
        left: 24px;
        background: #ffffff;
        color: #d92906;
        padding: 10px 20px;
        border-radius: 30px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 10px 25px -5px rgba(217, 41, 6, 0.4);
        border: 2px solid #d92906;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        transition: all 0.2s;
        font-family: 'Inter', sans-serif;
      }
      .lang-toggle:hover {
        background: #d92906;
        color: #ffffff;
        transform: translateY(-2px);
      }
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

    <div class="lang-toggle notranslate" onclick="toggleLanguage()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
      <span id="lang-text">?????</span>
    </div>

    <script>
      function toggleLanguage() {
        var isMarathi = document.cookie.includes('googtrans=/en/mr');
        if(isMarathi) {
           document.cookie = "googtrans=/en/en; path=/";
           document.cookie = "googtrans=/en/en; domain=" + location.hostname + "; path=/";
        } else {
           document.cookie = "googtrans=/en/mr; path=/";
           document.cookie = "googtrans=/en/mr; domain=" + location.hostname + "; path=/";
        }
        location.reload();
      }
      window.addEventListener('load', () => {
          if(document.cookie.includes('googtrans=/en/mr')) {
              document.getElementById('lang-text').innerText = "English";
          } else {
              document.getElementById('lang-text').innerText = "?????";
          }
      });
    </script>
</body>
`;

html = html.replace('</body>', translateCode);
fs.writeFileSync('index.html', html);
console.log('Added language toggle button!');
