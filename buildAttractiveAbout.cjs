const fs = require('fs');
const acorn = require('acorn');

// Pure SVG helper functions for rock-solid React JSX output without minification collisions
const eyeSvg = `(0,k.jsxs)("svg",{className:"w-7 h-7 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})`;

const targetSvg = `(0,k.jsxs)("svg",{className:"w-7 h-7 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"6"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"2"})]})`;

const globeSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-slate-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),(0,k.jsx)("path",{d:"M2 12h20"})]})`;

const sparkSvg = `(0,k.jsx)("svg",{className:"w-3.5 h-3.5 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;

const leafSvg = `(0,k.jsx)("svg",{className:"w-3.5 h-3.5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"})})`;

const cogSvg = `(0,k.jsx)("svg",{className:"w-3.5 h-3.5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"})})`;

const flaskSvg = `(0,k.jsxs)("svg",{className:"w-3.5 h-3.5 text-purple-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}),(0,k.jsx)("path",{d:"M8.5 2h7"})]})`;

const newJOCode = `function jO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-24 sm:pt-28 pb-24 bg-gradient-to-b from-[#fbfbfa] via-white to-slate-50 min-h-screen text-slate-800",
    children: [
      /* Top Hero Header */
      (0,k.jsx)("section", {
        className: "relative border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-amber-50/20 py-12 sm:py-16 overflow-hidden",
        children: (0,k.jsxs)("div", {
          className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10",
          children: [
            (0,k.jsxs)("div", {
              className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#d92906] text-xs font-bold uppercase tracking-widest shadow-2xs",
              children: [
                ${sparkSvg},
                (0,k.jsx)("span", { children: "About Superb MegaCorp" })
              ]
            }),
            (0,k.jsx)("h1", {
              className: "text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-slate-900 leading-tight",
              children: "Building Excellence, Trust & Global Impact"
            }),
            (0,k.jsx)("p", {
              className: "text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed",
              children: "From a visionary foundation in Sangli to international markets across four continents — discover the journey, values, and leadership driving Superb Mega Corporation."
            }),
            /* Stats strip */
            (0,k.jsxs)("div", {
              className: "pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6",
              children: [
                (0,k.jsxs)("div", {
                  className: "px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5",
                  children: [
                    (0,k.jsx)("span", { className: "text-base sm:text-lg font-black font-serif text-[#d92906]", children: "2010" }),
                    (0,k.jsx)("span", { className: "text-xs font-medium text-slate-500", children: "Sangli Plant Inception" })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5",
                  children: [
                    (0,k.jsx)("span", { className: "text-base sm:text-lg font-black font-serif text-amber-600", children: "4,000+" }),
                    (0,k.jsx)("span", { className: "text-xs font-medium text-slate-500", children: "Acres Farmer Network" })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5",
                  children: [
                    (0,k.jsx)("span", { className: "text-base sm:text-lg font-black font-serif text-slate-800", children: "Global" }),
                    (0,k.jsx)("span", { className: "text-xs font-medium text-slate-500", children: "Trade in 4 Continents" })
                  ]
                })
              ]
            })
          ]
        })
      }),

      /* Main Content Container */
      (0,k.jsxs)("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12 sm:space-y-16",
        children: [
          /* Section 1: Our Journey */
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6 relative overflow-hidden",
            children: [
              (0,k.jsxs)("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5",
                children: [
                  (0,k.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-wider block", children: "Our Story & Growth" }),
                      (0,k.jsx)("h2", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Our Journey" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/70", children: "Est. 2010" }),
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#d92906] border border-red-200/70", children: "Sangli, Maharashtra" })
                    ]
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed",
                children: [
                  (0,k.jsx)("p", { children: "SUPERB Mega Corporation's journey began as a small owned company founded by the vision of directors. From this humble beginning, they expanded their business in many sectors like Manufacturing, Service, Food & beverages products. The first plant of instant premix manufacturing was set up in Sangli, Maharashtra. Over the period of time, the corporation successfully diversified in other sectors like agricultural equipment and pomegranate export. In 2016, the farmers network has grown to 4000-acre farmland under cultivation which can fulfill the demand of buyers worldwide with ease. SUPERB Mega Corporation became India's leading business conglomerate within just 2 years." }),
                  (0,k.jsx)("p", { children: "With leaps and bounds, the SUPERB Mega Corporation has already come a long way making a Global Impact with the establishment of business in Saudi Arabia, UAE, USA & Netherlands." })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-3 text-xs",
                children: [
                  (0,k.jsxs)("span", {
                    className: "inline-flex items-center gap-1.5 font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1",
                    children: [
                      ${globeSvg},
                      (0,k.jsx)("span", { children: "Global Presence:" })
                    ]
                  }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-xl bg-slate-100 font-semibold text-slate-700 border border-slate-200/70", children: "Saudi Arabia" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-xl bg-slate-100 font-semibold text-slate-700 border border-slate-200/70", children: "UAE" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-xl bg-slate-100 font-semibold text-slate-700 border border-slate-200/70", children: "USA" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-xl bg-slate-100 font-semibold text-slate-700 border border-slate-200/70", children: "Netherlands" })
                ]
              })
            ]
          }),

          /* Section 2: Vision & Mission */
          (0,k.jsxs)("section", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",
            children: [
              /* Vision Card */
              (0,k.jsx)("div", {
                className: "bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 p-7 sm:p-9 rounded-3xl border border-amber-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden",
                children: (0,k.jsxs)("div", {
                  className: "flex items-start gap-4 sm:gap-5",
                  children: [
                    (0,k.jsx)("div", {
                      className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform",
                      children: ${eyeSvg}
                    }),
                    (0,k.jsxs)("div", {
                      className: "space-y-2.5",
                      children: [
                        (0,k.jsx)("span", { className: "text-[11px] font-bold text-amber-700 uppercase tracking-widest block", children: "Core Purpose" }),
                        (0,k.jsx)("h3", { className: "text-2xl font-bold font-serif text-slate-900", children: "Vision" }),
                        (0,k.jsx)("p", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed", children: "To be an impeccable Corporation, upholding the values of management team. To thrive and understand the market trends to grow our business and upgrade accordingly to move swiftly in the future." })
                      ]
                    })
                  ]
                })
              }),
              /* Mission Card */
              (0,k.jsx)("div", {
                className: "bg-gradient-to-br from-red-50/50 via-white to-rose-50/20 p-7 sm:p-9 rounded-3xl border border-red-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden",
                children: (0,k.jsxs)("div", {
                  className: "flex items-start gap-4 sm:gap-5",
                  children: [
                    (0,k.jsx)("div", {
                      className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d92906] to-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/25 group-hover:scale-105 transition-transform",
                      children: ${targetSvg}
                    }),
                    (0,k.jsxs)("div", {
                      className: "space-y-2.5",
                      children: [
                        (0,k.jsx)("span", { className: "text-[11px] font-bold text-[#d92906] uppercase tracking-widest block", children: "Commitment" }),
                        (0,k.jsx)("h3", { className: "text-2xl font-bold font-serif text-slate-900", children: "Mission" }),
                        (0,k.jsx)("p", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed", children: "To develop & supply innovative products to enhance the quality of life of our society. To achieve absolute growth through continuous improvements & deliver a consistent experience to our network of clients" })
                      ]
                    })
                  ]
                })
              })
            ]
          }),

          /* Section 3: Our Pillars */
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-2xl mx-auto space-y-3",
                children: [
                  (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Leadership & Expertise" }),
                  (0,k.jsx)("h2", { className: "text-2xl sm:text-4xl font-extrabold font-serif text-slate-900", children: "Our Pillars" }),
                  (0,k.jsx)("p", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed", children: "Our team members are the pillars of our corporation. We have a fantastic team of experts from vivid domains of agriculture, engineering, and pharmaceutical. Their knowledge & skills" }),
                  (0,k.jsxs)("div", {
                    className: "flex flex-wrap items-center justify-center gap-2 pt-1 text-xs",
                    children: [
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/70",
                        children: [
                          ${leafSvg},
                          (0,k.jsx)("span", { children: "Agriculture" })
                        ]
                      }),
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200/70",
                        children: [
                          ${cogSvg},
                          (0,k.jsx)("span", { children: "Engineering" })
                        ]
                      }),
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200/70",
                        children: [
                          ${flaskSvg},
                          (0,k.jsx)("span", { children: "Pharmaceutical" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              /* Neatly sized & centered executive portrait */
              (0,k.jsx)("div", {
                className: "flex justify-center pt-2",
                children: (0,k.jsxs)("div", {
                  className: "relative p-2.5 sm:p-3 bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-300/80 max-w-lg w-full overflow-hidden group",
                  children: [
                    (0,k.jsx)("div", {
                      className: "rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-inner",
                      children: (0,k.jsx)("img", {
                        src: "/images/management/directors_leadership.png",
                        alt: "Our Pillars - Board of Directors",
                        className: "w-full h-auto object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                      })
                    }),
                    (0,k.jsxs)("div", {
                      className: "text-center pt-2.5 pb-1",
                      children: [
                        (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 tracking-wide block", children: "Board of Directors & Executive Leadership" }),
                        (0,k.jsx)("span", { className: "text-[11px] text-slate-500", children: "Superb Mega Corporation" })
                      ]
                    })
                  ]
                })
              })
            ]
          })
        ]
      })
    ]
  });
}`;

// Validate with acorn
try {
  acorn.parse(newJOCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Component is 100% syntactically valid!');
  fs.writeFileSync('newJO.txt', newJOCode, 'utf8');
  console.log('Saved newJO.txt');
} catch (e) {
  console.error('Acorn syntax error:', e);
  process.exit(1);
}

// Function to patch bundle file
function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const jOStart = content.indexOf('function jO({onOpenEnquiry:e}){');
  const jOEnd = content.indexOf('function MO({onOpenEnquiry:e}){', jOStart);
  if (jOStart === -1 || jOEnd === -1) {
    console.log('Could not find function jO in', filePath);
    return;
  }

  content = content.substring(0, jOStart) + newJOCode + content.substring(jOEnd);

  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax is VALID for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated:', filePath);
  } catch (err) {
    console.error('Syntax error parsing patched file:', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}
console.log('Done!');
