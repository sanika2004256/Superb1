const fs = require('fs');
const acorn = require('acorn');

// Inline SVGs for self-contained, crisp icons
const sparkSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;

const flameSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-amber-300",fill:"currentColor",viewBox:"0 0 24 24",children:[(0,k.jsx)("path",{d:"M12 23c-4.97 0-9-4.03-9-9 0-4.02 2.82-7.85 5.5-10.5.58-.58 1.5-.18 1.5.64 0 2.21 1.79 4 4 4 .68 0 1.25-.57 1.25-1.25 0-1.87 1.23-3.56 2.94-4.14.73-.25 1.48.33 1.48 1.1 0 5.48 4.33 9.4 1.33 14.15C19.74 20.89 16.14 23 12 23z"})]})`;

const phoneSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})]})`;

const arrowRightSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),(0,k.jsx)("polyline",{points:"12 5 19 12 12 19"})]})`;

const percentSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("line",{x1:"19",y1:"5",x2:"5",y2:"19"}),(0,k.jsx)("circle",{cx:"6.5",cy:"6.5",r:"2.5"}),(0,k.jsx)("circle",{cx:"17.5",cy:"17.5",r:"2.5"})]})`;

const clockSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("polyline",{points:"12 6 12 12 16 14"})]})`;

const storeSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"}),(0,k.jsx)("path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}),(0,k.jsx)("path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"}),(0,k.jsx)("path",{d:"M2 7h20"})]})`;

const zapSvg = `(0,k.jsx)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})`;

const checkCircleSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-emerald-600 shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,k.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]})`;

const shieldSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})]})`;

const usersSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-purple-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),(0,k.jsx)("circle",{cx:"9",cy:"7",r:"4"}),(0,k.jsx)("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),(0,k.jsx)("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})`;

const trendingSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),(0,k.jsx)("polyline",{points:"17 6 23 6 23 12"})]})`;

const cupSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-amber-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M17 8h1a4 4 0 1 1 0 8h-1"}),(0,k.jsx)("path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"}),(0,k.jsx)("line",{x1:"6",y1:"2",x2:"6",y2:"4"}),(0,k.jsx)("line",{x1:"10",y1:"2",x2:"10",y2:"4"}),(0,k.jsx)("line",{x1:"14",y1:"2",x2:"14",y2:"4"})]})`;

// Bespoke Luxury Franchise Page Component
const newFOCode = `function FO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-16 sm:pt-20 pb-10 sm:pb-14 min-h-screen text-slate-800",
    style: { background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)" },
    children: [
      /* HERO HEADER SECTION WITH AMBIENT GLOW AND 4 LUXURY KPI METRIC CARDS */
      (0,k.jsxs)("section", {
        className: "franchise-hero-wrapper pt-8 sm:pt-12 pb-12 sm:pb-16 relative",
        children: [
          (0,k.jsx)("div", { className: "franchise-hero-glow-1" }),
          (0,k.jsx)("div", { className: "franchise-hero-glow-2" }),
          (0,k.jsxs)("div", {
            className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
            children: [
              (0,k.jsxs)("div", {
                className: "franchise-badge-pill mx-auto mb-3 sm:mb-4",
                children: [
                  ${sparkSvg},
                  (0,k.jsx)("span", { children: "Proven Cafe Business Model • Est. 2014" })
                ]
              }),
              (0,k.jsxs)("h1", {
                className: "franchise-hero-title mb-3 sm:mb-4",
                children: [
                  "Start Your Business With ",
                  (0,k.jsx)("span", { className: "text-[#d92906]", children: '\\"Tea Spot\\"' }),
                  " Cafe"
                ]
              }),
              (0,k.jsx)("div", {
                className: "w-24 h-1.5 bg-gradient-to-r from-[#d92906] via-amber-500 to-[#d92906] rounded-full mx-auto mb-4 sm:mb-5"
              }),
              (0,k.jsx)("p", {
                className: "franchise-hero-subtitle max-w-3xl mx-auto mb-7 sm:mb-9",
                children: "Partner with Superb MegaCorp's premier Amruttulya tea franchise. Serve authentic Pune Amruttulya chai, artisanal snacks, and commercial beverages with rapid break-even, low investment, and 100% turn-key setup."
              }),
              (0,k.jsxs)("div", {
                className: "flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-9 sm:mb-12",
                children: [
                  (0,k.jsxs)("button", {
                    type: "button",
                    onClick: e,
                    className: "bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-red-600/30 transition-all cursor-pointer inline-flex items-center gap-2",
                    children: [
                      ${flameSvg},
                      (0,k.jsx)("span", { children: "Enquire For Franchise" }),
                      ${arrowRightSvg}
                    ]
                  }),
                  (0,k.jsxs)("a", {
                    href: "tel:" + O.contact.tollFreeRaw,
                    className: "bg-white hover:bg-slate-50 text-slate-700 hover:text-[#d92906] px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm border border-slate-200/90 shadow-2xs transition-colors inline-flex items-center gap-2",
                    children: [
                      ${phoneSvg},
                      (0,k.jsxs)("span", { children: ["Franchise Desk: ", O.contact.tollFree] })
                    ]
                  })
                ]
              }),
              /* 4 LUXURY KPI METRIC CARDS */
              (0,k.jsxs)("div", {
                className: "franchise-kpi-grid",
                children: [
                  (0,k.jsxs)("div", {
                    className: "franchise-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${percentSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "60%–70%" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Gross Operating Margin" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "High Daily Cash Volume" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${clockSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "4–6 Mos" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Capital Break-Even" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Fast Return on Capital" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${storeSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "100–250" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Sq. Ft. Minimal Space" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Low Rent, Flexible Kiosk" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3 shadow-xs",
                        children: ${zapSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "15 Sec" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Per Cup Standard Time" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Zero Master Chef Dependency" })
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
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 sm:pb-12 space-y-14 sm:space-y-18",
        children: [
          /* SECTION 1: OUTLET SHOWCASE & TURNKEY INCLUSIONS (2 COLUMNS) */
          (0,k.jsxs)("section", {
            className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center",
            children: [
              /* Left Column: Outlet Photo Showcase */
              (0,k.jsxs)("div", {
                className: "lg:col-span-6",
                children: [
                  (0,k.jsxs)("div", {
                    className: "franchise-showcase-frame",
                    children: [
                      (0,k.jsxs)("div", {
                        className: "relative overflow-hidden bg-white",
                        children: [
                          (0,k.jsx)("img", {
                            src: "/images/spuerb-Tea-Spot-1-opt.jpg",
                            alt: "Tea Spot Cafe Franchise Outlet",
                            className: "w-full h-72 sm:h-88 lg:h-96 object-cover block mx-auto transition-transform duration-700 hover:scale-[1.02]"
                          }),
                          (0,k.jsxs)("div", {
                            className: "absolute top-3.5 left-4 text-white text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10",
                            style: { background: "#0f172a", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" },
                            children: [
                              ${cupSvg},
                              (0,k.jsx)("span", { style: { color: "#ffffff", fontWeight: "700" }, children: "Fastest Growing Cafe Chain" })
                            ]
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "text-center py-3.5 sm:py-4 px-4 bg-white border-t border-slate-100",
                        children: [
                          (0,k.jsx)("h4", { className: "text-base sm:text-lg font-bold font-serif text-slate-900 tracking-wide block", children: "A Sip of Heaven – Loved By Millions Daily" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-500 mt-0.5", children: "Authentic Pune Amruttulya Chai & Modern Instant Dispensing Setup" })
                        ]
                      })
                    ]
                  })
                ]
              }),

              /* Right Column: Inclusions & Commercial Highlights */
              (0,k.jsxs)("div", {
                className: "lg:col-span-6 space-y-5",
                children: [
                  (0,k.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Turnkey Commercial Package" }),
                      (0,k.jsx)("h2", { className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-slate-900 leading-tight", children: "Complete Cafe Setup, Zero Operational Hassles" }),
                      (0,k.jsx)("p", { className: "text-slate-600 text-sm sm:text-base leading-relaxed", children: "We equip you with everything needed to launch and operate a profitable, queue-generating tea cafe from Day 1." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "space-y-3 pt-1",
                    children: [
                      (0,k.jsxs)("div", {
                        className: "flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs",
                        children: [
                          ${checkCircleSvg},
                          (0,k.jsxs)("div", {
                            className: "space-y-0.5",
                            children: [
                              (0,k.jsx)("h4", { className: "text-xs sm:text-sm font-bold text-slate-900", children: "Turn-Key Kiosk & Stainless Steel Architecture" }),
                              (0,k.jsx)("p", { className: "text-[11px] sm:text-xs text-slate-600", children: "Ergonomic counters, 3D branded glow signage, electrical layout, and customer display." })
                            ]
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs",
                        children: [
                          ${checkCircleSvg},
                          (0,k.jsxs)("div", {
                            className: "space-y-0.5",
                            children: [
                              (0,k.jsx)("h4", { className: "text-xs sm:text-sm font-bold text-slate-900", children: "Automated Commercial Brewing Machines" }),
                              (0,k.jsx)("p", { className: "text-[11px] sm:text-xs text-slate-600", children: "Heavy-duty automatic tea brewing dispensers with precise temperature and dosing controls." })
                            ]
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs",
                        children: [
                          ${checkCircleSvg},
                          (0,k.jsxs)("div", {
                            className: "space-y-0.5",
                            children: [
                              (0,k.jsx)("h4", { className: "text-xs sm:text-sm font-bold text-slate-900", children: "Factory-Direct FSSAI Certified Premix Supply" }),
                              (0,k.jsx)("p", { className: "text-[11px] sm:text-xs text-slate-600", children: "Direct logistics from our Sangli plant ensuring unbeatable consistency and profit margins." })
                            ]
                          })
                        ]
                      }),
                      (0,k.jsxs)("div", {
                        className: "flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs",
                        children: [
                          ${checkCircleSvg},
                          (0,k.jsxs)("div", {
                            className: "space-y-0.5",
                            children: [
                              (0,k.jsx)("h4", { className: "text-xs sm:text-sm font-bold text-slate-900", children: "Full Staff SOP & Recipe Consistency Training" }),
                              (0,k.jsx)("p", { className: "text-[11px] sm:text-xs text-slate-600", children: "Complete operational manual, hygiene guidelines, and dedicated franchise partner support." })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "pt-2 flex flex-wrap items-center gap-3",
                    children: [
                      (0,k.jsxs)("button", {
                        type: "button",
                        onClick: e,
                        className: "bg-[#d92906] hover:bg-[#b91c1c] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5",
                        children: [
                          (0,k.jsx)("span", { children: "Book Discovery Call" }),
                          ${arrowRightSvg}
                        ]
                      }),
                      (0,k.jsx)("span", { className: "text-xs text-slate-500 font-medium", children: "• Exclusive Territory Protection" })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 2: 4 CORE FRANCHISE ADVANTAGES */
          (0,k.jsxs)("section", {
            className: "space-y-8",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-2xl mx-auto space-y-2",
                children: [
                  (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Competitive Edge" }),
                  (0,k.jsx)("h2", { className: "text-2xl sm:text-4xl font-extrabold font-serif text-slate-900", children: "Why Tea Spot Outperforms Traditional Cafes" }),
                  (0,k.jsx)("p", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed", children: "Engineered from the ground up to minimize overhead and maximize daily customer repeat volume." })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
                children: [
                  (0,k.jsxs)("div", {
                    className: "franchise-advantage-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs", children: ${trendingSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "High ROI & Rapid Break-Even" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "A proven, recession-resilient business model with predictable daily cash flow and 60%–70% gross margins on every cup." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700", children: "• Fast Capital Payback" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-advantage-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs", children: ${storeSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Turnkey Store Setup Support" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Complete assistance with location approval, branded signage, counter ergonomics, and heavy-duty automatic brewing equipment." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700", children: "• Ready in 15–20 Days" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-advantage-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs", children: ${shieldSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "FSSAI Certified Premix Supply" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Consistent, factory-blended authentic Amruttulya tea powder and coffee premixes shipped directly from our Sangli plant." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700", children: "• Uncompromised Quality" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-advantage-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 shadow-xs", children: ${usersSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Staff Training & SOPs" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Rigorous recipe consistency training, operational manuals, customer service standards, and dedicated franchise relationship desk." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-purple-700", children: "• Ongoing Support" })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 3: 4-STEP ONBOARDING ROADMAP */
          (0,k.jsxs)("section", {
            className: "space-y-8",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-xl mx-auto space-y-2",
                children: [
                  (0,k.jsx)("span", { className: "text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 inline-block shadow-2xs", children: "Fast-Track Onboarding" }),
                  (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-bold font-serif text-slate-900", children: "How To Get Started In 4 Simple Steps" }),
                  (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600", children: "Your streamlined path from franchise application to a profitable cafe launch." })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
                children: [
                  (0,k.jsxs)("div", {
                    className: "franchise-step-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("span", { className: "franchise-step-num", children: "01" }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Submit Inquiry" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Fill out the franchise inquiry form with your preferred city, retail location, and investment capacity." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "pt-3 border-t border-slate-100 text-[11px] font-bold text-[#d92906]", children: "Step 1 • Initial Contact" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-step-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("span", { className: "franchise-step-num", children: "02" }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Discovery Call" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Our franchise development team walks you through unit economics, store format options, and location evaluation." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "pt-3 border-t border-slate-100 text-[11px] font-bold text-[#d92906]", children: "Step 2 • Site Approval" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-step-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("span", { className: "franchise-step-num", children: "03" }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Agreement & Setup" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Sign the franchise agreement, receive 3D design schematics, equipment delivery, and comprehensive barista training." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "pt-3 border-t border-slate-100 text-[11px] font-bold text-[#d92906]", children: "Step 3 • Kiosk Fit-Out" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "franchise-step-card",
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("span", { className: "franchise-step-num", children: "04" }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Grand Opening" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Launch your Tea Spot outlet backed by Superb MegaCorp's local promotional push and direct ingredient supply chain." })
                        ]
                      }),
                      (0,k.jsx)("div", { className: "pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600", children: "Step 4 • Profitable Day 1" })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 4: CALL TO ACTION BANNER */
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
                        (0,k.jsx)("span", { children: "Turnkey Entrepreneurship" })
                      ]
                    }),
                    (0,k.jsx)("h3", {
                      className: "text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight",
                      children: "Ready To Launch Your Tea Spot Franchise?"
                    }),
                    (0,k.jsx)("p", {
                      className: "text-slate-300 text-xs sm:text-sm leading-relaxed",
                      children: "Take advantage of our complete turn-key support and start generating healthy daily returns in India's booming hot beverage market."
                    })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0",
                  children: [
                    (0,k.jsxs)("button", {
                      type: "button",
                      onClick: e,
                      className: "w-full sm:w-auto bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2",
                      children: [
                        (0,k.jsx)("span", { children: "Become a Franchise Partner" }),
                        ${arrowRightSvg}
                      ]
                    }),
                    (0,k.jsxs)("a", {
                      href: "tel:" + O.contact.tollFreeRaw,
                      className: "w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2",
                      children: [
                        ${phoneSvg},
                        (0,k.jsxs)("span", { children: ["Call: ", O.contact.tollFree] })
                      ]
                    })
                  ]
                })
              ]
            })
          }),

          /* SECTION 5: FRANCHISE APPLICATION FORM & COMMERCIAL DESK */
          (0,k.jsx)("section", {
            className: "pt-4",
            children: (0,k.jsx)(kO, {
              prefilledSubject: "Tea Spot Franchise Inquiry",
              showMapHub: false,
              badge: "Franchise Application",
              title: "Apply For A 'Tea Spot' Franchise",
              subtitle: "Submit your details below to receive the complete franchise prospectus, unit economics breakdown, and schedule a 1-on-1 session with our business expansion team."
            })
          })
        ]
      })
    ]
  });
}`;

// Validate newFOCode syntax with acorn
try {
  acorn.parse(newFOCode, { ecmaVersion: 2022 });
  console.log('newFOCode parsed successfully with Acorn!');
} catch (e) {
  console.error('Acorn syntax error in newFOCode:', e.message);
  process.exit(1);
}

// Read bundle and locate FO
const file1 = './assets/index-v29-1790684309157.js';
const file2 = './public/assets/index-v29-1790684309157.js';

let bundle = fs.readFileSync(file1, 'utf8');
const target = 'function FO(';
const start = bundle.indexOf(target);
if (start === -1) {
  console.error('Could not find function FO in bundle!');
  process.exit(1);
}

const bodyStart = bundle.indexOf('{', bundle.indexOf(')', start));
let depth = 0;
let end = -1;
for (let i = bodyStart; i < bundle.length; i++) {
  if (bundle[i] === '{') depth++;
  else if (bundle[i] === '}') {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}

console.log('Original FO range:', start, 'to', end, 'Length:', end - start);
const newBundle = bundle.substring(0, start) + newFOCode + bundle.substring(end);

// Validate entire new bundle with Acorn
try {
  console.log('Validating entire modified bundle with Acorn...');
  acorn.parse(newBundle, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Entire bundle is 100% syntactically valid!');
} catch (err) {
  console.error('Acorn validation failed on bundle:', err.message);
  process.exit(1);
}

// Write to both bundle locations
fs.writeFileSync(file1, newBundle, 'utf8');
fs.writeFileSync(file2, newBundle, 'utf8');
console.log('Successfully updated both bundle files with the luxury Franchise page!');
