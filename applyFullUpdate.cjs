const fs = require('fs');
const acorn = require('acorn');

// 1. First, update CSS with 3D flip styles
const cssPath = 'assets/index-BvH2rQN2.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.product-card-perspective')) {
  const flipStyles = `
/* 3D Flip and Packaging Image Carousel Styles */
.product-card-perspective {
  perspective: 1000px;
  -webkit-perspective: 1000px;
}
.product-card-flip {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  will-change: transform, opacity;
}
.product-card-flip-active {
  transform: rotateY(80deg) scale(0.92);
  opacity: 0.15;
}
`;
  css += flipStyles;
  fs.writeFileSync(cssPath, css);
  console.log('Added 3D flip styles to assets/index-BvH2rQN2.css');
}

// 2. Define the new uO function
const newUOString = `function uO({product:e,onViewDetails:t,onEnquire:n,showDistributorPrice:r=!1}){
  let imgList=(0,_.useMemo)(()=>{
    let b=e.boxImage||e.imageUrl||e.image,f=e.sachetFrontImage,k=e.sachetBackImage;
    let text=((e.name||\`\`)+\` \`+(e.sku||\`\`)).toLowerCase();
    if(!f||!k){
      if(text.includes(\`cardamom\`)){b=b||\`/images/products/box_cardamom.png\`,f=f||\`/images/products/cardamom_chai_front.jpg\`,k=k||\`/images/products/cardamom_chai_back.jpg\`}
      else if(text.includes(\`masala\`)){b=b||\`/images/products/box_masala.png\`,f=f||\`/images/products/masala_chai_front.jpg\`,k=k||\`/images/products/masala_chai_back.jpg\`}
      else if(text.includes(\`ginger\`)){b=b||\`/images/products/box_ginger.png\`,f=f||\`/images/products/ginger_chai_front.jpg\`,k=k||\`/images/products/ginger_chai_back.jpg\`}
      else if(text.includes(\`plain\`)){b=b||\`/images/products/box_plain.png\`,f=f||\`/images/products/plain_chai_front.jpg\`,k=k||\`/images/products/plain_chai_back.jpg\`}
      else if(text.includes(\`coffee\`)){b=b||\`/images/products/box_coffee.png\`,f=f||\`/images/products/coffee_front.jpg\`,k=k||\`/images/products/coffee_back.jpg\`}
    }
    let list=[];
    if(b)list.push({key:\`box\`,label:\`Box\`,src:b});
    if(f)list.push({key:\`front\`,label:\`Sachet Front\`,src:f});
    if(k)list.push({key:\`back\`,label:\`Sachet Back\`,src:k});
    if(list.length===0&&e.image)list.push({key:\`box\`,label:\`Box\`,src:e.image});
    return list;
  },[e]);

  let[curIdx,setCurIdx]=(0,_.useState)(0);
  let[isFlipping,setIsFlipping]=(0,_.useState)(!1);
  let touchStartX=(0,_.useRef)(0);
  let touchStartY=(0,_.useRef)(0);
  let[o,s]=(0,_.useState)(!1);
  let{addToCart:c}=qa();
  let{toggleWishlist:l,isInWishlist:u}=Za();

  (0,_.useEffect)(()=>{setCurIdx(0)},[e.id]);

  let switchImg=(nextIdx,evt)=>{
    if(evt)evt.stopPropagation();
    if(nextIdx===curIdx||nextIdx<0||nextIdx>=imgList.length)return;
    setIsFlipping(!0);
    setTimeout(()=>{
      setCurIdx(nextIdx);
      setTimeout(()=>setIsFlipping(!1),180);
    },120);
  };

  let onTouchStart=evt=>{
    if(evt.touches&&evt.touches.length>0){
      touchStartX.current=evt.touches[0].clientX;
      touchStartY.current=evt.touches[0].clientY;
    }
  };

  let onTouchEnd=evt=>{
    if(evt.changedTouches&&evt.changedTouches.length>0){
      let diffX=evt.changedTouches[0].clientX-touchStartX.current;
      let diffY=evt.changedTouches[0].clientY-touchStartY.current;
      if(Math.abs(diffX)>35&&Math.abs(diffX)>Math.abs(diffY)){
        if(diffX<0){
          switchImg((curIdx+1)%imgList.length);
        }else{
          switchImg((curIdx-1+imgList.length)%imgList.length);
        }
      }
    }
  };

  let f=u(e.id);
  let p=e=>typeof e===\`number\`?e.toLocaleString(\`en-IN\`):e;
  let activeSrc=imgList[curIdx]?.src||e.image;

  return(0,k.jsxs)(\`div\`,{
    className:\`group bg-white rounded-xl sm:rounded-3xl overflow-hidden border border-slate-200/90 hover:border-red-200 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full relative\`,
    children:[
      (0,k.jsxs)(\`div\`,{
        children:[
          (0,k.jsxs)(\`div\`,{
            onClick:()=>t&&t(e),
            onTouchStart:onTouchStart,
            onTouchEnd:onTouchEnd,
            className:\`relative bg-gradient-to-b from-slate-100/90 to-slate-50 p-2 sm:p-4 flex items-center justify-center cursor-pointer overflow-hidden product-card-perspective select-none\`,
            style:{height:typeof window!==\`undefined\`&&window.innerWidth<640?\`150px\`:\`260px\`},
            children:[
              (0,k.jsx)(\`img\`,{
                src:activeSrc,
                alt:(e.name||\`\`)+\` - \`+(imgList[curIdx]?.label||\`\`),
                className:\`max-h-full max-w-full object-contain filter drop-shadow-md product-card-flip \${isFlipping?\`product-card-flip-active\`:\`\`}\`,
                loading:\`lazy\`,
                onError:ev=>{ev.target.onerror=null;ev.target.src=\`/images/products/cardamom_chai_front.jpg\`}
              }),
              (e.badge||e.categoryName?(0,k.jsx)(\`span\`,{className:\`mobile-hidden absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#d92906] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-red-100 z-10\`,children:e.badge||e.categoryName}):\`\`),
              (0,k.jsxs)(\`div\`,{
                className:\`absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5 z-10\`,
                children:[
                  (0,k.jsx)(\`button\`,{type:\`button\`,onClick:t=>{t.stopPropagation(),l(e)},className:\`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs \${f?\`bg-red-50 text-red-600 border border-red-200\`:\`bg-white/80 hover:bg-white text-slate-400 hover:text-red-500\`}\`,title:f?\`Remove from wishlist\`:\`Add to wishlist\`,children:(0,k.jsx)(fi,{className:\`w-3.5 h-3.5 \${f?\`fill-current text-red-600\`:\`\`}\`})}),
                  e.packSize&&(0,k.jsx)(\`span\`,{className:\`bg-slate-900/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-xs\`,children:e.packSize})
                ]
              }),
              imgList.length>1&&(0,k.jsxs)(k.Fragment,{children:[
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx-1+imgList.length)%imgList.length,ev),
                  className:\`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#d92906] items-center justify-center shadow-md transition-all cursor-pointer opacity-75 group-hover:opacity-100 hover:scale-110\`,
                  title:\`Previous image\`,
                  "aria-label":\`Previous image\`,
                  children:(0,k.jsx)(Mr,{className:\`w-4 h-4\`})
                }),
                (0,k.jsx)(\`button\`,{
                  type:\`button\`,
                  onClick:ev=>switchImg((curIdx+1)%imgList.length,ev),
                  className:\`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#d92906] items-center justify-center shadow-md transition-all cursor-pointer opacity-75 group-hover:opacity-100 hover:scale-110\`,
                  title:\`Next image\`,
                  "aria-label":\`Next image\`,
                  children:(0,k.jsx)(Pr,{className:\`w-4 h-4\`})
                })
              ]}),
              imgList.length>1&&(0,k.jsx)(\`div\`,{
                className:\`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-full shadow-sm border border-slate-200/90\`,
                onClick:ev=>ev.stopPropagation(),
                children:imgList.map((item,idx)=>(0,k.jsxs)(\`button\`,{
                  type:\`button\`,
                  key:item.key,
                  onClick:ev=>switchImg(idx,ev),
                  title:\`View \`+item.label,
                  className:\`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 \${curIdx===idx?\`bg-[#d92906] text-white shadow-2xs\`:\`text-slate-600 hover:text-slate-900 hover:bg-slate-100\`}\`,
                  children:[
                    (0,k.jsx)(\`span\`,{className:\`w-1.5 h-1.5 rounded-full \${curIdx===idx?\`bg-white\`:\`bg-slate-400\`}\`}),
                    (0,k.jsx)(\`span\`,{children:item.label})
                  ]
                }))
              })
            ]
          }),
          (0,k.jsxs)(\`div\`,{
            className:\`p-2 sm:p-5 space-y-1 sm:space-y-2.5 flex-1 flex flex-col\`,
            children:[
              (0,k.jsxs)(\`div\`,{
                className:\`hidden sm:flex items-center justify-between gap-2 text-xs\`,
                children:[
                  (0,k.jsxs)(\`span\`,{className:\`font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60\`,children:[\`SKU: \`,e.sku]}),
                  (0,k.jsx)(\`span\`,{className:\`text-[11px] font-bold text-[#5cba3c] uppercase tracking-wider truncate\`,children:e.brand})
                ]
              }),
              (0,k.jsx)(T,{to:\`/product/\${e.id}\`,className:\`block text-[11px] sm:text-base font-bold text-slate-900 group-hover:text-[#d92906] transition-colors leading-tight sm:leading-snug line-clamp-2 font-serif cursor-pointer\`,title:e.name,children:e.name}),
              (0,k.jsx)(\`p\`,{className:\`mobile-hidden text-xs text-slate-500 line-clamp-2 leading-relaxed\`,children:e.packing}),
              (0,k.jsxs)(\`div\`,{
                className:\`pt-1 sm:pt-2 sm:border-t sm:border-slate-100 flex items-baseline justify-between gap-1 sm:gap-2\`,
                children:[
                  (0,k.jsxs)(\`div\`,{children:[
                    (0,k.jsx)(\`span\`,{className:\`text-[10px] font-bold uppercase tracking-wider text-slate-400 block\`,children:r?\`Distributor Rate\`:\`MRP\`}),
                    (0,k.jsxs)(\`div\`,{className:\`flex items-baseline gap-1.5\`,children:[
                      (0,k.jsxs)(\`span\`,{className:\`text-sm sm:text-xl font-extrabold text-[#d92906]\`,children:[\`₹\`,p(r?e.distributorRate:e.mrp)]}),
                      r&&(0,k.jsxs)(\`span\`,{className:\`text-xs text-slate-400 line-through\`,children:[\`₹\`,p(e.mrp)]})
                    ]})
                  ]}),
                  e.transport?(0,k.jsx)(\`div\`,{className:\`text-right\`,children:(0,k.jsx)(\`span\`,{className:\`text-[10px] text-slate-400 block mt-0.5\`,children:e.transport})}):null
                ]
              })
            ]
          })
        ]
      }),
      (0,k.jsxs)(\`div\`,{
        className:\`p-2 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-1 sm:gap-2 sm:border-t sm:border-slate-100 mt-auto\`,
        children:[
          (0,k.jsx)(\`button\`,{
            type:\`button\`,
            onClick:t=>{t.stopPropagation(),c(e,1,r?\`distributor\`:\`retail\`,!0),s(!0),setTimeout(()=>s(!1),1500)},
            className:\`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer \${o?\`bg-[#16a34a] text-white\`:\`bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white\`}\`,
            children:o?(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(Or,{className:\`w-3.5 h-3.5\`}),(0,k.jsx)(\`span\`,{children:\`Added to Cart!\`})]}):(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(fa,{className:\`w-3.5 h-3.5\`}),(0,k.jsx)(\`span\`,{children:\`Add to Cart\`})]})
          }),
          (0,k.jsxs)(\`div\`,{
            className:\`hidden sm:flex items-center justify-between gap-2 pt-1 text-xs\`,
            children:[
              (0,k.jsxs)(T,{to:\`/product/\${e.id}\`,className:\`inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-[#d92906] transition-colors py-1 cursor-pointer\`,children:[(0,k.jsx)(ei,{className:\`w-3.5 h-3.5 text-slate-400 group-hover:text-[#d92906]\`}),(0,k.jsx)(\`span\`,{children:\`Details\`})]}),
              (0,k.jsxs)(\`button\`,{type:\`button\`,onClick:()=>n&&n(e),className:\`text-slate-500 hover:text-[#d92906] font-semibold py-1 px-1 inline-flex items-center gap-1 cursor-pointer transition-colors\`,children:[(0,k.jsx)(\`span\`,{children:\`Enquire\`}),(0,k.jsx)(ea,{className:\`w-3 h-3 text-slate-400\`})]})
            ]
          })
        ]
      })
    ]
  });
}`;

// Check acorn parse on newUOString
try {
  acorn.parse(newUOString, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Acorn validation passed for newUOString!');
} catch (e) {
  console.error('Acorn failed on newUOString:', e);
  process.exit(1);
}

const files = [
  'assets/index-v29-1790684309157.js',
  'public/assets/index-v29-1790684309157.js'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');

  // Backup
  fs.writeFileSync(`${f}.bak_full_update_${Date.now()}`, content);

  // 1. Remove Desktop Gallery nav link
  const desktopGalleryLink = '(0,k.jsx)(T,{to:`/gallery`,className:ye(pe),children:`Gallery`}),';
  if (content.includes(desktopGalleryLink)) {
    content = content.replace(desktopGalleryLink, '');
    console.log(`Removed desktop Gallery link from ${f}`);
  }

  // 2. Remove Mobile Gallery nav link
  const mobileGalleryLink = '(0,k.jsx)(T,{to:`/gallery`,onClick:()=>i(!1),className:`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${pe?`text-[#d92906] bg-red-50 font-bold`:`text-slate-800 hover:bg-slate-50`}`,children:(0,k.jsx)(`span`,{children:`Gallery`})}),';
  if (content.includes(mobileGalleryLink)) {
    content = content.replace(mobileGalleryLink, '');
    console.log(`Removed mobile Gallery link from ${f}`);
  }

  // 3. In Router: redirect /gallery to Products page component NO
  const galleryRoute = '(0,k.jsx)(Zt,{path:`/gallery`,element:(0,k.jsx)(IO,{})}),';
  const productsRouteRepl = '(0,k.jsx)(Zt,{path:`/gallery`,element:(0,k.jsx)(NO,{onOpenEnquiry:e})}),';
  if (content.includes(galleryRoute)) {
    content = content.replace(galleryRoute, productsRouteRepl);
    console.log(`Updated /gallery route to render NO in ${f}`);
  }

  // 4. Update Explore button in CO if exists
  content = content.replace('to:`/gallery`', 'to:`/products`');

  // 5. Replace uO component
  const uOStart = content.indexOf('function uO({');
  const dOStart = content.indexOf('function dO({', uOStart);
  if (uOStart !== -1 && dOStart !== -1) {
    content = content.substring(0, uOStart) + newUOString + content.substring(dOStart);
    console.log(`Replaced uO component in ${f}`);
  } else {
    console.error(`Could not locate uO/dO markers in ${f}`);
    process.exit(1);
  }

  // 6. Update dO detail modal to support all packaging views
  const oldDOImages = 'v=[];return e.image&&v.push({label:`Front Pack`,url:e.image}),e.imageBack&&v.push({label:`Back & Info`,url:e.imageBack}),';
  const newDOImages = 'v=[];(()=>{let b=e.boxImage||e.imageUrl||e.image,f=e.sachetFrontImage,k=e.sachetBackImage,t=((e.name||``)+` `+(e.sku||``)).toLowerCase();if(!f||!k){if(t.includes(`cardamom`)){b=b||`/images/products/box_cardamom.png`,f=f||`/images/products/cardamom_chai_front.jpg`,k=k||`/images/products/cardamom_chai_back.jpg`}else if(t.includes(`masala`)){b=b||`/images/products/box_masala.png`,f=f||`/images/products/masala_chai_front.jpg`,k=k||`/images/products/masala_chai_back.jpg`}else if(t.includes(`ginger`)){b=b||`/images/products/box_ginger.png`,f=f||`/images/products/ginger_chai_front.jpg`,k=k||`/images/products/ginger_chai_back.jpg`}else if(t.includes(`plain`)){b=b||`/images/products/box_plain.png`,f=f||`/images/products/plain_chai_front.jpg`,k=k||`/images/products/plain_chai_back.jpg`}else if(t.includes(`coffee`)){b=b||`/images/products/box_coffee.png`,f=f||`/images/products/coffee_front.jpg`,k=k||`/images/products/coffee_back.jpg`}}b&&v.push({label:`Product Box`,url:b}),f&&v.push({label:`Sachet Front`,url:f}),k&&v.push({label:`Sachet Back`,url:k}),v.length===0&&e.image&&v.push({label:`Product Image`,url:e.image})})();return ';
  if (content.includes(oldDOImages)) {
    content = content.replace(oldDOImages, newDOImages);
    console.log(`Updated dO detail modal images in ${f}`);
  }

  // 7. Update zO dedicated product page to support all packaging views
  const oldZOImages = 're=[{label:`Front Pack`,url:o.image},...o.imageBack?[{label:`Back & Nutritional Info`,url:o.imageBack}]:[]];';
  const newZOImages = 're=[];(()=>{let b=o.boxImage||o.imageUrl||o.image,f=o.sachetFrontImage,k=o.sachetBackImage,t=((o.name||``)+` `+(o.sku||``)).toLowerCase();if(!f||!k){if(t.includes(`cardamom`)){b=b||`/images/products/box_cardamom.png`,f=f||`/images/products/cardamom_chai_front.jpg`,k=k||`/images/products/cardamom_chai_back.jpg`}else if(t.includes(`masala`)){b=b||`/images/products/box_masala.png`,f=f||`/images/products/masala_chai_front.jpg`,k=k||`/images/products/masala_chai_back.jpg`}else if(t.includes(`ginger`)){b=b||`/images/products/box_ginger.png`,f=f||`/images/products/ginger_chai_front.jpg`,k=k||`/images/products/ginger_chai_back.jpg`}else if(t.includes(`plain`)){b=b||`/images/products/box_plain.png`,f=f||`/images/products/plain_chai_front.jpg`,k=k||`/images/products/plain_chai_back.jpg`}else if(t.includes(`coffee`)){b=b||`/images/products/box_coffee.png`,f=f||`/images/products/coffee_front.jpg`,k=k||`/images/products/coffee_back.jpg`}}b&&re.push({label:`Product Box`,url:b}),f&&re.push({label:`Sachet Front`,url:f}),k&&re.push({label:`Sachet Back & Nutrition`,url:k}),re.length===0&&o.image&&re.push({label:`Product Image`,url:o.image})})();';
  if (content.includes(oldZOImages)) {
    content = content.replace(oldZOImages, newZOImages);
    console.log(`Updated zO product page images in ${f}`);
  }

  // Verify acorn syntax of entire bundle
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log(`Acorn parse PASSED for ${f}!`);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Successfully written ${f}`);
  } catch (err) {
    console.error(`Syntax error in ${f}:`, err);
    process.exit(1);
  }
}

console.log('All updates applied successfully!');
