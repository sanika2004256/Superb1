const fs = require('fs');
const acorn = require('acorn');

// Define inline SVGs
const sparkSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;

const calendarSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2"}),(0,k.jsx)("line",{x1:"16",x2:"16",y1:"2",y2:"6"}),(0,k.jsx)("line",{x1:"8",x2:"8",y1:"2",y2:"6"}),(0,k.jsx)("line",{x1:"3",x2:"21",y1:"10",y2:"10"})]})`;

const farmSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"}),(0,k.jsx)("path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"})]})`;

const globeSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),(0,k.jsx)("path",{d:"M2 12h20"})]})`;

const awardSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"8",r:"6"}),(0,k.jsx)("path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"})]})`;

const eyeSvg = `(0,k.jsxs)("svg",{className:"w-6 h-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"}),(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})`;

const targetSvg = `(0,k.jsxs)("svg",{className:"w-6 h-6 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("circle",{cx:"12",cy:"6",r:"2"}),(0,k.jsx)("path",{d:"M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"})]})`;

const checkCircleSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-emerald-600 shrink-0",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,k.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})`;

const shieldSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})]})`;

const leafSvg = `(0,k.jsx)("svg",{className:"w-6 h-6 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"})})`;

const cogSvg = `(0,k.jsxs)("svg",{className:"w-6 h-6 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,k.jsx)("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})`;

const flaskSvg = `(0,k.jsxs)("svg",{className:"w-6 h-6 text-purple-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}),(0,k.jsx)("path",{d:"M8.5 2h7"})]})`;

const usersSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-[#5cba3c]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,k.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,k.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,k.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})`;

// Cleanly spaced About Page Component
const newJOCode = `function jO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-16 sm:pt-20 pb-10 sm:pb-14 min-h-screen text-slate-800",
    style: { background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)" },
    children: [
      /* HERO HEADER SECTION WITH BALANCED PADDING */
      (0,k.jsxs)("section", {
        className: "about-hero-wrapper pt-8 sm:pt-12 pb-12 sm:pb-16 relative",
        children: [
          (0,k.jsx)("div", { className: "about-hero-glow-1" }),
          (0,k.jsx)("div", { className: "about-hero-glow-2" }),
          (0,k.jsxs)("div", {
            className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
            children: [
              (0,k.jsxs)("div", {
                className: "about-badge-pill mx-auto mb-3 sm:mb-4",
                children: [
                  ${sparkSvg},
                  (0,k.jsx)("span", { children: "Corporate Profile & Legacy" })
                ]
              }),
              (0,k.jsx)("h1", {
                className: "about-hero-title mb-3 sm:mb-4",
                children: "About Superb MegaCorp"
              }),
              (0,k.jsx)("div", {
                className: "w-24 h-1.5 bg-gradient-to-r from-[#d92906] via-amber-500 to-[#d92906] rounded-full mx-auto mb-4 sm:mb-5"
              }),
              (0,k.jsx)("p", {
                className: "about-hero-subtitle max-w-3xl mx-auto mb-7 sm:mb-9",
                children: "Building Excellence, Trust & Global Impact — From our foundational roots in Sangli, Maharashtra to premier international business partnerships across four continents."
              }),
              /* 4 LUXURY KPI METRIC CARDS */
              (0,k.jsxs)("div", {
                className: "about-kpi-grid",
                children: [
                  (0,k.jsxs)("div", {
                    className: "about-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3 shadow-xs",
                        children: ${calendarSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "2010" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Sangli Plant Inception" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "15+ Years Commercial Trust" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "about-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${farmSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "4,000+" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Acres Farmland Network" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Direct Contract Farming" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "about-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${globeSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "4 Continents" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Global Distribution" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "UAE, USA, Europe & Gulf" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "about-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${awardSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "93+ SKUs" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "FSSAI-Certified Range" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Premixes, Machines & Agro" })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),

      /* MAIN CONTENT CONTAINER WITH HARMONIOUS VERTICAL GAPS */
      (0,k.jsxs)("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-12 space-y-14 sm:space-y-18",
        children: [
          /* SECTION 1: CORPORATE JOURNEY & MILESTONES */
          (0,k.jsxs)("section", {
            className: "about-journey-card",
            children: [
              (0,k.jsxs)("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6 sm:mb-7",
                children: [
                  (0,k.jsxs)("div", {
                    className: "space-y-1.5",
                    children: [
                      (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest block", children: "Corporate Evolution" }),
                      (0,k.jsx)("h2", { className: "text-2xl sm:text-4xl font-extrabold font-serif text-slate-900", children: "Our Journey: From Sangli to Global Reach" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "flex items-center gap-2 flex-wrap",
                    children: [
                      (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs", children: "Founded 2010" }),
                      (0,k.jsx)("span", { className: "px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-50 text-[#d92906] border border-red-200/80 shadow-2xs", children: "Sangli, Maharashtra" })
                    ]
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 mb-7 sm:mb-8 max-w-4xl",
                children: [
                  (0,k.jsx)("p", {
                    children: "SUPERB Mega Corporation began its path as an ambitious vision founded by its board of directors. From this humble inception in Sangli, Maharashtra, the leadership established a modern instant tea premix manufacturing facility. Driven by uncompromising food safety, precision engineering, and consumer taste preferences, the group quickly broadened its commercial horizons into commercial beverage dispensing, contract farming, and fruit export logistics."
                  }),
                  (0,k.jsx)("p", {
                    children: "Within just two years, Superb Mega Corporation expanded its reach exponentially. By 2016, our collaborative farming network had grown to over 4,000 acres of prime pomegranate orchards, establishing direct cold-chain supply to international markets. Today, Superb Mega Corporation stands as a premier business conglomerate serving thousands of commercial clients across India and globally."
                  })
                ]
              }),
              /* VISUAL 4-PHASE MILESTONE CARDS */
              (0,k.jsxs)("div", {
                className: "timeline-stepper",
                children: [
                  (0,k.jsxs)("div", {
                    className: "timeline-step-item",
                    children: [
                      (0,k.jsx)("span", { className: "timeline-year-tag", children: "2010" }),
                      (0,k.jsx)("h4", { className: "timeline-title", children: "The Inception" }),
                      (0,k.jsx)("p", { className: "timeline-desc", children: "First state-of-the-art premix manufacturing plant commissioned in Sangli MIDC, introducing high-grade instant tea formulations." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "timeline-step-item",
                    children: [
                      (0,k.jsx)("span", { className: "timeline-year-tag", children: "2014" }),
                      (0,k.jsx)("h4", { className: "timeline-title", children: "Cafe Franchising" }),
                      (0,k.jsx)("p", { className: "timeline-desc", children: "Launch of Tea Spot Amruttulya Cafe Franchise model, enabling hundreds of entrepreneurs to establish profitable outlets." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "timeline-step-item",
                    children: [
                      (0,k.jsx)("span", { className: "timeline-year-tag", children: "2016" }),
                      (0,k.jsx)("h4", { className: "timeline-title", children: "Agro Diversification" }),
                      (0,k.jsx)("p", { className: "timeline-desc", children: "Expanded to 4,000-acre contract farming network for export-grade Bhagwa pomegranates and Vizuki precision farm machinery." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "timeline-step-item",
                    children: [
                      (0,k.jsx)("span", { className: "timeline-year-tag", children: "Today" }),
                      (0,k.jsx)("h4", { className: "timeline-title", children: "Global Conglomerate" }),
                      (0,k.jsx)("p", { className: "timeline-desc", children: "Exporting premium products to UAE, Saudi Arabia, USA & Netherlands, with 93+ FSSAI-certified products and full distribution." })
                    ]
                  })
                ]
              }),
              /* GLOBAL FOOTPRINT ACCENT */
              (0,k.jsxs)("div", {
                className: "mt-8 sm:mt-9 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2.5 sm:gap-3",
                children: [
                  (0,k.jsxs)("div", {
                    className: "inline-flex items-center gap-2 font-bold text-slate-800 text-xs uppercase tracking-wider mr-2",
                    children: [
                      ${globeSvg},
                      (0,k.jsx)("span", { children: "Active Export Hubs:" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "global-country-chip",
                    children: [
                      (0,k.jsx)("span", { className: "text-base", children: "🇮🇳" }),
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("strong", { className: "text-slate-900 block leading-tight", children: "India" }),
                          (0,k.jsx)("span", { className: "text-[10px] text-slate-500", children: "HQ & Sangli MIDC Units" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "global-country-chip",
                    children: [
                      (0,k.jsx)("span", { className: "text-base", children: "🇦🇪" }),
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("strong", { className: "text-slate-900 block leading-tight", children: "UAE" }),
                          (0,k.jsx)("span", { className: "text-[10px] text-slate-500", children: "Gulf Regional Export Hub" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "global-country-chip",
                    children: [
                      (0,k.jsx)("span", { className: "text-base", children: "🇸🇦" }),
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("strong", { className: "text-slate-900 block leading-tight", children: "Saudi Arabia" }),
                          (0,k.jsx)("span", { className: "text-[10px] text-slate-500", children: "Direct Wholesale Supply" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "global-country-chip",
                    children: [
                      (0,k.jsx)("span", { className: "text-base", children: "🇺🇸" }),
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("strong", { className: "text-slate-900 block leading-tight", children: "USA" }),
                          (0,k.jsx)("span", { className: "text-[10px] text-slate-500", children: "North American Trade" })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "global-country-chip",
                    children: [
                      (0,k.jsx)("span", { className: "text-base", children: "🇳🇱" }),
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("strong", { className: "text-slate-900 block leading-tight", children: "Netherlands" }),
                          (0,k.jsx)("span", { className: "text-[10px] text-slate-500", children: "European Logistics Gate" })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 2: VISION, MISSION & GUIDING PRINCIPLES */
          (0,k.jsxs)("section", {
            className: "space-y-8 sm:space-y-10",
            children: [
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",
                children: [
                  /* Vision Card */
                  (0,k.jsxs)("div", {
                    className: "vision-card flex flex-col justify-between",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsxs)("div", {
                            className: "flex items-start gap-4 mb-4 sm:mb-5",
                            children: [
                              (0,k.jsx)("div", {
                                className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25",
                                children: ${eyeSvg}
                              }),
                              (0,k.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                  (0,k.jsx)("span", { className: "text-xs font-bold text-amber-700 uppercase tracking-widest block", children: "Core Purpose" }),
                                  (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Our Vision" })
                                ]
                              })
                            ]
                          }),
                          (0,k.jsx)("p", {
                            className: "text-slate-700 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6",
                            children: "To be an impeccable Corporation, upholding the core ethical values of our leadership team. To thrive on deep market understanding, anticipate evolving consumer trends, and swiftly modernize our operational capabilities to lead future industry standards."
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "pt-4 border-t border-amber-200/60 space-y-2.5 text-xs text-slate-700",
                        children: [
                          (0,k.jsxs)("div", { className: "flex items-center gap-2", children: [${checkCircleSvg}, (0,k.jsx)("span", { children: "World-Class Manufacturing & Standardization" })] }),
                          (0,k.jsxs)("div", { className: "flex items-center gap-2", children: [${checkCircleSvg}, (0,k.jsx)("span", { children: "Empowering Next-Gen Food & Agro Tech Solutions" })] })
                        ]
                      })
                    ]
                  }),

                  /* Mission Card */
                  (0,k.jsxs)("div", {
                    className: "mission-card flex flex-col justify-between",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsxs)("div", {
                            className: "flex items-start gap-4 mb-4 sm:mb-5",
                            children: [
                              (0,k.jsx)("div", {
                                className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d92906] to-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/25",
                                children: ${targetSvg}
                              }),
                              (0,k.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                  (0,k.jsx)("span", { className: "text-xs font-bold text-[#d92906] uppercase tracking-widest block", children: "Uncompromising Commitment" }),
                                  (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Our Mission" })
                                ]
                              })
                            ]
                          }),
                          (0,k.jsx)("p", {
                            className: "text-slate-700 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6",
                            children: "To develop & supply innovative, hygienic, and authentic products that enhance the quality of life of our society. To achieve sustainable commercial growth through continuous improvement, precision manufacturing, and delivering an exceptional experience to our clients worldwide."
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "pt-4 border-t border-red-200/60 space-y-2.5 text-xs text-slate-700",
                        children: [
                          (0,k.jsxs)("div", { className: "flex items-center gap-2", children: [${checkCircleSvg}, (0,k.jsx)("span", { children: "100% FSSAI-Compliant Quality Assurance" })] }),
                          (0,k.jsxs)("div", { className: "flex items-center gap-2", children: [${checkCircleSvg}, (0,k.jsx)("span", { children: "Reliable End-to-End Nationwide Supply Chain" })] })
                        ]
                      })
                    ]
                  })
                ]
              }),

              /* 4 CORE VALUES CARDS WITH SUBTLE SECTION LABEL */
              (0,k.jsxs)("div", {
                className: "pt-4 sm:pt-6",
                children: [
                  (0,k.jsxs)("div", {
                    className: "text-center max-w-xl mx-auto space-y-1.5 mb-6 sm:mb-7",
                    children: [
                      (0,k.jsx)("span", { className: "text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/80 inline-block shadow-2xs", children: "Foundational Values" }),
                      (0,k.jsx)("h3", { className: "text-xl sm:text-2xl font-bold font-serif text-slate-900", children: "Principles That Guide Us" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
                    children: [
                      (0,k.jsxs)("div", {
                        className: "core-value-card",
                        children: [
                          (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center mb-3 text-[#d92906]", children: ${shieldSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Integrity & Trust" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Operating transparently with farmers, franchise owners, distributors, and corporate partners across all business endeavors." })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "core-value-card",
                        children: [
                          (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-3 text-amber-600", children: ${awardSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Uncompromising Quality" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "State-of-the-art laboratory testing, premium raw ingredients, and strict FSSAI compliance for all beverage premixes." })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "core-value-card",
                        children: [
                          (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 text-emerald-600", children: ${farmSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Farmer Empowerment" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Connecting rural agricultural communities to global markets through guaranteed fair pricing and mechanized support." })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "core-value-card",
                        children: [
                          (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3 text-blue-600", children: ${globeSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Global Innovation" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Continuously pioneering high-efficiency beverage automation, instant formulations, and international fruit cold chain." })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 3: THREE PILLARS & EXECUTIVE LEADERSHIP */
          (0,k.jsxs)("section", {
            className: "space-y-10 sm:space-y-12",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-2xl mx-auto space-y-2.5 mb-8 sm:mb-10",
                children: [
                  (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Multidisciplinary Strengths" }),
                  (0,k.jsx)("h2", { className: "text-2xl sm:text-4xl font-extrabold font-serif text-slate-900", children: "Our Three Core Pillars" }),
                  (0,k.jsx)("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed", children: "Our team members and specialists represent the foundational pillars of our corporation, bringing deep expertise from vivid domains:" })
                ]
              }),

              /* 3 DOMAIN PILLAR CARDS */
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6",
                children: [
                  (0,k.jsxs)("div", {
                    className: "pillar-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs", children: ${leafSvg} }),
                          (0,k.jsx)("h3", { className: "text-xl font-bold font-serif text-slate-900 mb-2", children: "Agriculture" }),
                          (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600 leading-relaxed", children: "Spearheading 4,000+ acres of scientific cultivation, GlobalGAP certified orchard management, and export of fresh Bhagwa pomegranates and ready arils worldwide." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3.5 border-t border-slate-100 text-[11px] font-bold text-emerald-700", children: "• Superb Pomo & Export Cold-Chain" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "pillar-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs", children: ${cogSvg} }),
                          (0,k.jsx)("h3", { className: "text-xl font-bold font-serif text-slate-900 mb-2", children: "Engineering" }),
                          (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600 leading-relaxed", children: "Designing rugged farming equipment through Vizuki Agro Machinery, alongside precision digital vending machines with automated dosing and RFID cashless card controllers." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3.5 border-t border-slate-100 text-[11px] font-bold text-blue-700", children: "• Vizuki Hi-Tech Farm Machinery" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "pillar-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 shadow-xs", children: ${flaskSvg} }),
                          (0,k.jsx)("h3", { className: "text-xl font-bold font-serif text-slate-900 mb-2", children: "Food Science & Pharma" }),
                          (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600 leading-relaxed", children: "Formulating instant beverage premixes adhering to strict pharmaceutical-grade cleanroom protocols, hygienic vacuum packaging, and authentic taste reproducibility." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3.5 border-t border-slate-100 text-[11px] font-bold text-purple-700", children: "• FSSAI-Certified Premix Formulations" })
                    ]
                  })
                ]
              }),

              /* EXECUTIVE LEADERSHIP SHOWCASE FRAME WITH DEDICATED HEADER */
              (0,k.jsxs)("div", {
                className: "pt-8 sm:pt-12",
                children: [
                  (0,k.jsxs)("div", {
                    className: "text-center max-w-xl mx-auto space-y-2 mb-6 sm:mb-8",
                    children: [
                      (0,k.jsx)("span", { className: "text-xs font-bold text-[#d92906] uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Executive Governance" }),
                      (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Board of Directors & Leadership" }),
                      (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600", children: "Steering our corporate vision, operational integrity, and strategic expansion across domestic and international markets." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "directors-gold-frame",
                    children: [
                      (0,k.jsxs)("div", {
                        className: "relative overflow-hidden bg-white",
                        children: [
                          (0,k.jsx)("img", {
                            src: "/images/management/directors_leadership.png",
                            alt: "Board of Directors - Superb Mega Corporation",
                            className: "w-full h-auto object-cover block mx-auto transition-transform duration-700 hover:scale-[1.01]"
                          }),
                          /* Floating Tag on photo - shifted upwards from head, high contrast, 100% visible */
                          (0,k.jsxs)("div", {
                            className: "absolute top-2 sm:top-3 left-3 sm:left-4 text-white text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 z-10",
                            style: { background: "#0f172a", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 4px 14px rgba(0,0,0,0.35)" },
                            children: [
                              ${usersSvg},
                              (0,k.jsx)("span", { style: { color: "#ffffff", fontWeight: "700" }, children: "Board of Directors" })
                            ]
                          })
                        ]
                      }),
                      /* Clean white caption bar below photo - NO black bar */
                      (0,k.jsxs)("div", {
                        className: "text-center py-3.5 sm:py-4 px-4 bg-white border-t border-slate-100",
                        children: [
                          (0,k.jsx)("h4", { className: "text-base sm:text-lg font-bold font-serif text-slate-900 tracking-wide block", children: "Board of Directors & Executive Leadership" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-500 mt-0.5", children: "Superb Mega Corporation • Driving Innovation Across Agro, Beverages & Manufacturing" })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 4: CORPORATE CALL TO ACTION BANNER */
          (0,k.jsx)("section", {
            className: "pt-2",
            children: (0,k.jsxs)("div", {
              className: "about-cta-banner flex flex-col lg:flex-row items-center justify-between gap-8",
              children: [
                (0,k.jsxs)("div", {
                  className: "space-y-3 text-center lg:text-left max-w-2xl",
                  children: [
                    (0,k.jsxs)("div", {
                      className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider",
                      children: [
                        ${sparkSvg},
                        (0,k.jsx)("span", { children: "Partner With Industry Leaders" })
                      ]
                    }),
                    (0,k.jsx)("h3", {
                      className: "text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight",
                      children: "Accelerate Your Business with Superb MegaCorp"
                    }),
                    (0,k.jsx)("p", {
                      className: "text-slate-300 text-xs sm:text-sm leading-relaxed",
                      children: "Whether you seek profitable cafe franchise rights, wholesale instant premix supply, commercial beverage vending, or agricultural export partnerships — our commercial desk is ready to support you."
                    })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0",
                  children: [
                    (0,k.jsxs)("button", {
                      type: "button",
                      onClick: () => e && e({ name: "About Page Corporate Partnership Enquiry" }),
                      className: "w-full sm:w-auto bg-gradient-to-r from-[#d92906] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95",
                      children: [
                        (0,k.jsx)("span", { children: "Send Corporate Enquiry" }),
                        (0,k.jsxs)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),(0,k.jsx)("polyline",{points:"12 5 19 12 12 19"})]})
                      ]
                    }),
                    (0,k.jsxs)("a", {
                      href: "tel:18002095001",
                      className: "w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                      children: [
                        (0,k.jsx)("svg",{className:"w-4 h-4 text-amber-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),
                        (0,k.jsx)("span", { children: "1800 209 5001" })
                      ]
                    })
                  ]
                })
              ]
            })
          })
        ]
      })
    ]
  });
}`;

// CSS styles to update
const refinedAboutCss = `
/* ==========================================================================
   ABOUT US PAGE ULTRA-ATTRACTIVE STYLES (BALANCED SPACING & ELEVATED PROPORTIONS)
   ========================================================================== */
.about-hero-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfc 40%, #f1f5f9 100%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}
.about-hero-glow-1 {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  height: 300px;
  background: radial-gradient(circle, rgba(217, 41, 6, 0.08) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}
.about-hero-glow-2 {
  position: absolute;
  bottom: -40px;
  right: 10%;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}
.about-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  border-radius: 9999px;
  background: rgba(254, 242, 242, 0.9);
  border: 1px solid rgba(252, 165, 165, 0.6);
  color: #d92906;
  font-size: 0.725rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 0 2px 8px rgba(217, 41, 6, 0.06);
}
.about-hero-title {
  font-family: 'Outfit', 'Playfair Display', sans-serif !important;
  font-size: clamp(2.25rem, 5vw, 3.5rem) !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  line-height: 1.18 !important;
  letter-spacing: -0.025em !important;
}
.about-hero-subtitle {
  font-size: clamp(0.95rem, 1.8vw, 1.125rem);
  color: #475569;
  line-height: 1.65;
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;
}

/* KPI Stat Cards Grid */
.about-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
  width: 100%;
  max-width: 68rem;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .about-kpi-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}
.about-kpi-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 1.25rem;
  padding: 1.25rem 1.15rem;
  text-align: left;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
@media (min-width: 640px) {
  .about-kpi-card {
    padding: 1.5rem 1.25rem;
  }
}
.about-kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #d92906, #f59e0b);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.about-kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(217, 41, 6, 0.15);
  border-color: rgba(217, 41, 6, 0.25);
}
.about-kpi-card:hover::before {
  opacity: 1;
}

/* Timeline & Journey */
.about-journey-card {
  background: #ffffff;
  border-radius: 1.75rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.04);
  padding: clamp(1.75rem, 4vw, 3rem);
  position: relative;
  overflow: hidden;
}
.timeline-stepper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
  position: relative;
  margin-top: 0;
  padding-top: 0;
}
.timeline-step-item {
  position: relative;
  padding: 1.35rem 1.2rem;
  border-radius: 1.25rem;
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s ease;
}
.timeline-step-item:hover {
  background: #ffffff;
  border-color: rgba(217, 41, 6, 0.3);
  box-shadow: 0 10px 24px -4px rgba(217, 41, 6, 0.08);
  transform: translateY(-3px);
}
.timeline-year-tag {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  color: #d92906;
  margin-bottom: 0.35rem;
}
.timeline-title {
  font-family: 'Outfit', sans-serif;
  font-size: 0.975rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}
.timeline-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.55;
}

/* Global Presence Badges */
.global-country-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1rem;
  border-radius: 0.875rem;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
  transition: all 0.25s ease;
  font-size: 0.825rem;
}
.global-country-chip:hover {
  border-color: rgba(217, 41, 6, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px -2px rgba(15, 23, 42, 0.08);
}

/* Vision & Mission Cards */
.vision-card {
  background: linear-gradient(145deg, rgba(255, 251, 235, 0.7) 0%, #ffffff 60%, rgba(254, 243, 199, 0.25) 100%);
  border: 1px solid rgba(251, 191, 36, 0.5);
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  box-shadow: 0 8px 24px -4px rgba(245, 158, 11, 0.08);
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}
.vision-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 36px -8px rgba(245, 158, 11, 0.16);
  border-color: rgba(245, 158, 11, 0.8);
}
.mission-card {
  background: linear-gradient(145deg, rgba(254, 242, 242, 0.7) 0%, #ffffff 60%, rgba(255, 228, 230, 0.25) 100%);
  border: 1px solid rgba(248, 113, 113, 0.5);
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  box-shadow: 0 8px 24px -4px rgba(217, 41, 6, 0.08);
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}
.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 36px -8px rgba(217, 41, 6, 0.16);
  border-color: rgba(217, 41, 6, 0.8);
}

/* Core Values 4-Grid */
.core-value-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1.35rem 1.2rem;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.03);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.core-value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.08);
  border-color: rgba(217, 41, 6, 0.25);
}

/* Pillars Cards */
.pillar-card {
  background: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.85);
  padding: 1.65rem 1.45rem;
  box-shadow: 0 6px 20px -3px rgba(15, 23, 42, 0.04);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pillar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.09);
  border-color: rgba(217, 41, 6, 0.25);
}

/* Directors Leadership Frame - Clean White Card, No Black Border */
.directors-gold-frame {
  position: relative;
  padding: 0;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 1.75rem;
  box-shadow: 0 10px 30px -4px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  max-width: 42rem;
  margin: 0 auto;
}
.directors-gold-frame img {
  border-radius: 0;
  display: block;
  width: 100%;
  height: auto;
}

/* Corporate Call To Action */
.about-cta-banner {
  background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 50%, #0b0f19 100%);
  border-radius: 2rem;
  border: 1px solid rgba(217, 41, 6, 0.3);
  padding: clamp(2rem, 5vw, 3.25rem);
  color: #ffffff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35);
}
`;

// 1. Update CSS in assets and public/assets
function updateCss(cssPath) {
  if (!fs.existsSync(cssPath)) return;
  let content = fs.readFileSync(cssPath, 'utf8');
  const startIdx = content.indexOf('/* ==========================================================================\n   ABOUT US PAGE ULTRA-ATTRACTIVE STYLES');
  if (startIdx !== -1) {
    content = content.substring(0, startIdx) + refinedAboutCss.trim() + '\n';
  } else {
    content = content + '\n' + refinedAboutCss.trim() + '\n';
  }
  fs.writeFileSync(cssPath, content, 'utf8');
  console.log('Updated CSS:', cssPath);
}

for (const p of ['assets/attractive-theme.css', 'public/assets/attractive-theme.css']) {
  updateCss(p);
}

// 2. Patch JS bundles
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
    console.log('Successfully written:', filePath);
  } catch (err) {
    console.error('Syntax error parsing patched file:', filePath, err);
  }
}

for (const p of ['assets/index-v29-1790684309157.js', 'public/assets/index-v29-1790684309157.js']) {
  patchFile(p);
}

// Also write newJO.txt for record
fs.writeFileSync('newJO.txt', newJOCode, 'utf8');
console.log('Updated newJO.txt');
