const fs = require('fs');
const acorn = require('acorn');

// Standalone SVG strings
const sparkSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;

const globeSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),(0,k.jsx)("path",{d:"M2 12h20"})]})`;

const eyeSvg = `(0,k.jsxs)("svg",{className:"w-7 h-7 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})`;

const targetSvg = `(0,k.jsxs)("svg",{className:"w-7 h-7 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"6"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"2"})]})`;

const leafSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"})})`;

const cogSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,k.jsx)("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})`;

const flaskSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-purple-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}),(0,k.jsx)("path",{d:"M8.5 2h7"})]})`;

const newJOCode = `function jO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-20 sm:pt-24 pb-28 bg-gradient-to-b from-stone-50/70 via-white to-slate-50/80 min-h-screen text-slate-800",
    children: [
      /* HERO SECTION */
      (0,k.jsx)("section", {
        className: "relative border-b border-slate-200/70 bg-gradient-to-b from-white via-stone-50/40 to-amber-50/20 py-16 sm:py-20 overflow-hidden",
        children: (0,k.jsxs)("div", {
          className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10",
          children: [
            (0,k.jsxs)("div", {
              className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-[#d92906] text-xs font-bold uppercase tracking-widest shadow-2xs",
              children: [
                ${sparkSvg},
                (0,k.jsx)("span", { children: "Corporate Profile" })
              ]
            }),
            (0,k.jsx)("h1", {
              className: "text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-slate-900 leading-tight",
              children: "About Superb MegaCorp"
            }),
            (0,k.jsx)("div", {
              className: "w-20 h-1.5 bg-gradient-to-r from-[#d92906] to-amber-500 rounded-full mx-auto"
            }),
            (0,k.jsx)("p", {
              className: "text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed",
              children: "Building Excellence, Trust & Global Impact — From our roots in Sangli to trusted partnerships worldwide."
            }),
            /* 3 Prestigious Highlights */
            (0,k.jsxs)("div", {
              className: "pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6",
              children: [
                (0,k.jsxs)("div", {
                  className: "px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3",
                  children: [
                    (0,k.jsx)("span", { className: "text-lg sm:text-xl font-black font-serif text-[#d92906]", children: "2010" }),
                    (0,k.jsx)("span", { className: "text-xs font-semibold text-slate-600 text-left", children: "Sangli Plant Foundation" })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3",
                  children: [
                    (0,k.jsx)("span", { className: "text-lg sm:text-xl font-black font-serif text-amber-600", children: "4,000+" }),
                    (0,k.jsx)("span", { className: "text-xs font-semibold text-slate-600 text-left", children: "Acres Farmland Network" })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3",
                  children: [
                    (0,k.jsx)("span", { className: "text-lg sm:text-xl font-black font-serif text-slate-800", children: "Global" }),
                    (0,k.jsx)("span", { className: "text-xs font-semibold text-slate-600 text-left", children: "Presence in 4 Continents" })
                  ]
                })
              ]
            })
          ]
        })
      }),

      /* MAIN CONTENT CONTAINER */
      (0,k.jsxs)("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20",
        style: { display: "flex", flexDirection: "column", gap: "4.5rem" },
        children: [
          /* SECTION 1: OUR STORY & GROWTH (OUR JOURNEY) */
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl border border-slate-200/90 shadow-md relative overflow-hidden",
            style: { padding: "clamp(1.75rem, 4vw, 3rem)" },
            children: [
              (0,k.jsxs)("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6",
                children: [
                  (0,k.jsxs)("div", {
                    className: "space-y-1.5",
                    children: [
                      (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-wider block", children: "Our Story & Growth" }),
                      (0,k.jsx)("h2", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Our Journey" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "flex items-center gap-2 flex-wrap",
                    children: [
                      (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/70", children: "Established 2010" }),
                      (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-50 text-[#d92906] border border-red-200/70", children: "Sangli, Maharashtra" })
                    ]
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed",
                children: [
                  (0,k.jsx)("p", { children: "SUPERB Mega Corporation's journey began as a small owned company founded by the vision of directors. From this humble beginning, they expanded their business in many sectors like Manufacturing, Service, Food & beverages products. The first plant of instant premix manufacturing was set up in Sangli, Maharashtra. Over the period of time, the corporation successfully diversified in other sectors like agricultural equipment and pomegranate export. In 2016, the farmers network has grown to 4000-acre farmland under cultivation which can fulfill the demand of buyers worldwide with ease. SUPERB Mega Corporation became India's leading business conglomerate within just 2 years." }),
                  (0,k.jsx)("p", { children: "With leaps and bounds, the SUPERB Mega Corporation has already come a long way making a Global Impact with the establishment of business in Saudi Arabia, UAE, USA & Netherlands." })
                ]
              }),
              /* Global Presence Banner */
              (0,k.jsxs)("div", {
                className: "mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-3 text-xs",
                children: [
                  (0,k.jsxs)("span", {
                    className: "inline-flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[11px] mr-1",
                    children: [
                      ${globeSvg},
                      (0,k.jsx)("span", { children: "Global Presence:" })
                    ]
                  }),
                  (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-xl bg-slate-100 font-semibold text-slate-800 border border-slate-200/80 shadow-2xs", children: "Saudi Arabia" }),
                  (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-xl bg-slate-100 font-semibold text-slate-800 border border-slate-200/80 shadow-2xs", children: "UAE" }),
                  (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-xl bg-slate-100 font-semibold text-slate-800 border border-slate-200/80 shadow-2xs", children: "USA" }),
                  (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-xl bg-slate-100 font-semibold text-slate-800 border border-slate-200/80 shadow-2xs", children: "Netherlands" })
                ]
              })
            ]
          }),

          /* SECTION 2: VISION (CORE PURPOSE) & MISSION (COMMITMENT) */
          (0,k.jsxs)("section", {
            className: "grid grid-cols-1 md:grid-cols-2",
            style: { display: "grid", gap: "2rem" },
            children: [
              /* Vision Card (Core Purpose) */
              (0,k.jsxs)("div", {
                className: "bg-gradient-to-br from-amber-50/70 via-white to-amber-50/20 rounded-3xl border border-amber-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between",
                style: { padding: "clamp(1.75rem, 4vw, 2.5rem)", minHeight: "260px" },
                children: [
                  (0,k.jsxs)("div", {
                    className: "flex items-start gap-4 sm:gap-5 mb-5",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform",
                        children: ${eyeSvg}
                      }),
                      (0,k.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                          (0,k.jsx)("span", { className: "text-[11px] font-bold text-amber-700 uppercase tracking-widest block", children: "Core Purpose" }),
                          (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-bold font-serif text-slate-900", children: "Vision" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsx)("p", {
                    className: "text-slate-600 text-sm leading-relaxed",
                    children: "To be an impeccable Corporation, upholding the values of management team. To thrive and understand the market trends to grow our business and upgrade accordingly to move swiftly in the future."
                  })
                ]
              }),

              /* Mission Card (Commitment) */
              (0,k.jsxs)("div", {
                className: "bg-gradient-to-br from-red-50/70 via-white to-rose-50/20 rounded-3xl border border-red-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between",
                style: { padding: "clamp(1.75rem, 4vw, 2.5rem)", minHeight: "260px" },
                children: [
                  (0,k.jsxs)("div", {
                    className: "flex items-start gap-4 sm:gap-5 mb-5",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d92906] to-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/25 group-hover:scale-105 transition-transform",
                        children: ${targetSvg}
                      }),
                      (0,k.jsxs)("div", {
                        className: "space-y-1.5",
                        children: [
                          (0,k.jsx)("span", { className: "text-[11px] font-bold text-[#d92906] uppercase tracking-widest block", children: "Commitment" }),
                          (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-bold font-serif text-slate-900", children: "Mission" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsx)("p", {
                    className: "text-slate-600 text-sm leading-relaxed",
                    children: "To develop & supply innovative products to enhance the quality of life of our society. To achieve absolute growth through continuous improvements & deliver a consistent experience to our network of clients"
                  })
                ]
              })
            ]
          }),

          /* SECTION 3: OUR PILLARS */
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl border border-slate-200/90 shadow-md",
            style: { padding: "clamp(1.75rem, 4vw, 3rem)" },
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-2xl mx-auto space-y-3 mb-8",
                children: [
                  (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Leadership & Expertise" }),
                  (0,k.jsx)("h2", { className: "text-2xl sm:text-4xl font-extrabold font-serif text-slate-900", children: "Our Pillars" }),
                  (0,k.jsx)("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed", children: "Our team members are the pillars of our corporation. We have a fantastic team of experts from vivid domains of agriculture, engineering, and pharmaceutical. Their knowledge & skills" }),
                  (0,k.jsxs)("div", {
                    className: "flex flex-wrap items-center justify-center gap-2.5 pt-3 text-xs",
                    children: [
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/70",
                        children: [
                          ${leafSvg},
                          (0,k.jsx)("span", { children: "Agriculture" })
                        ]
                      }),
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200/70",
                        children: [
                          ${cogSvg},
                          (0,k.jsx)("span", { children: "Engineering" })
                        ]
                      }),
                      (0,k.jsxs)("span", {
                        className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200/70",
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
                className: "flex justify-center mt-6",
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
                      className: "text-center pt-3 pb-1",
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

try {
  acorn.parse(newJOCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Acorn parse: 100% Valid!');
  fs.writeFileSync('newJO.txt', newJOCode, 'utf8');
} catch (e) {
  console.error('Acorn parse error:', e);
  process.exit(1);
}

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const jOStart = content.indexOf('function jO({onOpenEnquiry:e}){');
  const jOEnd = content.indexOf('function MO({onOpenEnquiry:e}){', jOStart);
  if (jOStart === -1 || jOEnd === -1) {
    console.log('Could not find jO in', filePath);
    return;
  }
  content = content.substring(0, jOStart) + newJOCode + content.substring(jOEnd);
  try {
    acorn.parse(content, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('Syntax valid for', filePath);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Written:', filePath);
  } catch (err) {
    console.error('Syntax error:', err);
  }
}

patchFile('assets/index-v29-1790684309157.js');
patchFile('public/assets/index-v29-1790684309157.js');
console.log('Finished updating About component with padding and alignment fixes!');
