const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const replacement = `<script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
            projectId: "dist-7b242",
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        async function initApp() {
            try {
                const snap = await getDocs(collection(db, 'products'));
                const products = [];
                snap.forEach(doc => {
                    const data = doc.data();
                    products.push({
                        id: doc.id,
                        name: data.name,
                        category: data.category,
                        mrp: parseInt((data.price || "0").toString().replace(/\\D/g, '') || data.mrp || 0),
                        packing: data.description,
                        image: data.imageUrl || data.image,
                        status: data.status || 'active'
                    });
                });
                window.LIVE_PRODUCTS = products;
            } catch(e) {
                console.error("Failed to load live products", e);
            }
            
            const script = document.createElement('script');
            script.type = 'module';
            script.crossOrigin = 'anonymous';
            script.src = '/assets/index-BM-yEkkk.js';
            document.head.appendChild(script);
        }
        initApp();
    </script>`;

html = html.replace('<script type="module" crossorigin src="/assets/index-BM-yEkkk.js"></script>', replacement);
fs.writeFileSync('index.html', html);
console.log('Success');
