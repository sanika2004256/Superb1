const fs = require('fs');
const acorn = require('acorn');

// Define inline SVGs
const sparkSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;
const phoneSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})]})`;
const clockSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("polyline",{points:"12 6 12 12 16 14"})]})`;
const mapPinSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),(0,k.jsx)("circle",{cx:"12",cy:"10",r:"3"})]})`;
const globeSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),(0,k.jsx)("path",{d:"M2 12h20"})]})`;
const cupSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M17 8h1a4 4 0 1 1 0 8h-1"}),(0,k.jsx)("path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"}),(0,k.jsx)("line",{x1:"6",y1:"2",x2:"6",y2:"4"}),(0,k.jsx)("line",{x1:"10",y1:"2",x2:"10",y2:"4"}),(0,k.jsx)("line",{x1:"14",y1:"2",x2:"14",y2:"4"})]})`;
const boxSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),(0,k.jsx)("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),(0,k.jsx)("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})`;
const cogSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,k.jsx)("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})`;
const leafSvg = `(0,k.jsx)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"})})`;
const miniMailSvg = `(0,k.jsxs)("svg",{className:"w-3.5 h-3.5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),(0,k.jsx)("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]})`;

// New RO component where Contact Form is placed just above the footer
const newROCode = `function RO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-16 sm:pt-20 min-h-screen text-slate-800",
    style: { background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)" },
    children: [
      /* HERO HEADER SECTION WITH AMBIENT GLOW AND 4 LUXURY KPI METRIC CARDS */
      (0,k.jsxs)("section", {
        className: "contact-hero-wrapper pt-8 sm:pt-12 pb-12 sm:pb-16 relative",
        children: [
          (0,k.jsx)("div", { className: "contact-hero-glow-1" }),
          (0,k.jsx)("div", { className: "contact-hero-glow-2" }),
          (0,k.jsxs)("div", {
            className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
            children: [
              (0,k.jsxs)("div", {
                className: "contact-badge-pill mx-auto mb-3 sm:mb-4",
                children: [
                  ${sparkSvg},
                  (0,k.jsx)("span", { children: "Commercial Desk & Global Offices • Direct Connect" })
                ]
              }),
              (0,k.jsxs)("h1", {
                className: "contact-hero-title mb-3 sm:mb-4",
                children: [
                  "We Are Ready To ",
                  (0,k.jsx)("span", { className: "text-[#d92906]", children: "Power Your Growth" })
                ]
              }),
              (0,k.jsx)("div", {
                className: "w-24 h-1.5 bg-gradient-to-r from-[#d92906] via-amber-500 to-[#d92906] rounded-full mx-auto mb-4 sm:mb-5"
              }),
              (0,k.jsx)("p", {
                className: "contact-hero-subtitle max-w-3xl mx-auto mb-7 sm:mb-9",
                children: "Have questions about Amruttulya tea premixes, commercial cafe franchises, international fruit shipments, or agricultural equipment? Connect with our dedicated executive desk."
              }),
              /* 4 LUXURY KPI METRIC CARDS */
              (0,k.jsxs)("div", {
                className: "contact-kpi-grid",
                children: [
                  (0,k.jsxs)("div", {
                    className: "contact-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3 shadow-xs",
                        children: ${clockSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "< 2 Hrs" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Fast Response Time" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Dedicated Commercial Desk" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${phoneSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "1800 209 5001" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "All-India Toll-Free" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Mon–Sat: 9:00 AM – 7:00 PM" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${mapPinSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "2 Plants" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Sangli HQ & Pune Desk" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "MIDC Processing Facilities" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${globeSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "4 Continents" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Global Export Desk" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "UAE, USA, Europe & Gulf" })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),

      /* MAIN CONTENT CONTAINER */
      (0,k.jsxs)("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
          paddingTop: "2.5rem",
          paddingBottom: "3rem"
        },
        children: [
          /* SECTION 1: 4 SPECIALIZED DEPARTMENT DIRECTORIES */
          (0,k.jsxs)("section", {
            style: {
              width: "100%",
              paddingTop: "1rem",
              paddingBottom: "1.5rem"
            },
            children: [
              (0,k.jsxs)("div", {
                style: {
                  textAlign: "center",
                  maxWidth: "42rem",
                  margin: "0 auto 3.25rem auto"
                },
                children: [
                  (0,k.jsx)("span", {
                    className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full border border-red-200 inline-block shadow-2xs",
                    style: { marginBottom: "0.85rem" },
                    children: "Direct Desk Directory"
                  }),
                  (0,k.jsx)("h3", {
                    className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-slate-900",
                    style: { marginBottom: "0.75rem", lineHeight: "1.2" },
                    children: "Department Enquiries"
                  }),
                  (0,k.jsx)("p", {
                    className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
                    style: { maxWidth: "34rem", margin: "0 auto" },
                    children: "Route your enquiry directly to the relevant corporate division for expedited turnaround."
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                style: { gap: "1.5rem" },
                children: [
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "1.85rem 1.45rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "230px",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3.5", children: ${cupSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Cafe Franchising" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-4", children: "Tea Spot cafe territory expansion, kiosk economics & commercial barista training." })
                        ]
                      }),
                      (0,k.jsxs)("a", {
                        href: "mailto:" + O.contact.email,
                        className: "text-xs font-bold text-[#d92906] hover:underline flex items-center gap-1.5 truncate pt-3 border-t border-slate-100",
                        children: [
                          ${miniMailSvg},
                          (0,k.jsx)("span", { children: O.contact.email })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "1.85rem 1.45rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "230px",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3.5", children: ${boxSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Premix Wholesale" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-4", children: "Institutional vending machines, 1kg pouches & 14g single-serve instant sachets." })
                        ]
                      }),
                      (0,k.jsxs)("a", {
                        href: "mailto:" + O.contact.email,
                        className: "text-xs font-bold text-[#d92906] hover:underline flex items-center gap-1.5 truncate pt-3 border-t border-slate-100",
                        children: [
                          ${miniMailSvg},
                          (0,k.jsx)("span", { children: O.contact.email })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "1.85rem 1.45rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "230px",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3.5", children: ${cogSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Agro Machinery" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-4", children: "Vizuki precision orchard sprayers, weeding systems & high-tech farm mechanization." })
                        ]
                      }),
                      (0,k.jsxs)("a", {
                        href: "mailto:" + O.contact.email,
                        className: "text-xs font-bold text-[#d92906] hover:underline flex items-center gap-1.5 truncate pt-3 border-t border-slate-100",
                        children: [
                          ${miniMailSvg},
                          (0,k.jsx)("span", { children: O.contact.email })
                        ]
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "1.85rem 1.45rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: "230px",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsxs)("div", {
                        children: [
                          (0,k.jsx)("div", { className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5", children: ${leafSvg} }),
                          (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1.5", children: "Fresh Fruit Exports" }),
                          (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-4", children: "GlobalGAP certified fresh Bhagwa pomegranates, cold chain sorting and arils export." })
                        ]
                      }),
                      (0,k.jsxs)("a", {
                        href: "mailto:" + O.contact.email,
                        className: "text-xs font-bold text-[#d92906] hover:underline flex items-center gap-1.5 truncate pt-3 border-t border-slate-100",
                        children: [
                          ${miniMailSvg},
                          (0,k.jsx)("span", { children: O.contact.email })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 2: FREQUENTLY ASKED QUESTIONS */
          (0,k.jsxs)("section", {
            style: {
              width: "100%",
              paddingTop: "1rem",
              paddingBottom: "1.5rem"
            },
            children: [
              (0,k.jsxs)("div", {
                style: {
                  textAlign: "center",
                  maxWidth: "42rem",
                  margin: "0 auto 3.25rem auto"
                },
                children: [
                  (0,k.jsx)("span", {
                    className: "text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 inline-block shadow-2xs",
                    style: { marginBottom: "0.85rem" },
                    children: "Instant Clarifications"
                  }),
                  (0,k.jsx)("h3", {
                    className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-slate-900",
                    style: { marginBottom: "0.75rem", lineHeight: "1.2" },
                    children: "Frequently Asked Questions"
                  }),
                  (0,k.jsx)("p", {
                    className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
                    style: { maxWidth: "34rem", margin: "0 auto" },
                    children: "Quick answers to help you understand our fulfillment process and trade procedures."
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-3",
                style: { gap: "1.75rem" },
                children: [
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "2.25rem 1.85rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsx)("h4", {
                        className: "font-bold font-serif text-slate-900 text-base sm:text-lg leading-snug",
                        style: { marginBottom: "0.85rem" },
                        children: "How quickly will your team respond?"
                      }),
                      (0,k.jsx)("p", {
                        className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
                        children: "Our commercial desk operates Mon–Sat and guarantees an initial email/call consultation within 2 to 4 business hours."
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "2.25rem 1.85rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsx)("h4", {
                        className: "font-bold font-serif text-slate-900 text-base sm:text-lg leading-snug",
                        style: { marginBottom: "0.85rem" },
                        children: "Can we visit the Sangli manufacturing plant?"
                      }),
                      (0,k.jsx)("p", {
                        className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
                        children: "Yes! Corporate clients, franchise prospects, and bulk buyers are welcome to schedule guided visits to our Sangli MIDC facility."
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    style: {
                      background: "#ffffff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(226, 232, 240, 0.85)",
                      padding: "2.25rem 1.85rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      boxShadow: "0 4px 16px -2px rgba(15, 23, 42, 0.04)"
                    },
                    children: [
                      (0,k.jsx)("h4", {
                        className: "font-bold font-serif text-slate-900 text-base sm:text-lg leading-snug",
                        style: { marginBottom: "0.85rem" },
                        children: "Do you supply sample tasting packs?"
                      }),
                      (0,k.jsx)("p", {
                        className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
                        children: "Yes, sample tasting packs of our Karak, Elaichi, Ginger, and Masala premixes are dispatched nationwide to verified businesses upon request."
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 3: CONTACT FORM PLACED JUST ABOVE THE FOOTER */
          (0,k.jsx)(kO, {
            compactTop: true,
            badge: "Direct Communication",
            title: "Commercial Inquiries & Regional Desks",
            subtitle: "Submit your requirement below or connect directly with our Sangli plant or Pune regional corporate office."
          })
        ]
      })
    ]
  });
}`;

// Validate newROCode syntax with Acorn
try {
  acorn.parse(newROCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Reordered newROCode parsed successfully with Acorn!');
} catch (e) {
  console.error('Acorn syntax error in newROCode:', e.message);
  process.exit(1);
}

// Read bundle and locate RO
const file1 = './assets/index-v29-1790684309157.js';
const file2 = './public/assets/index-v29-1790684309157.js';

let bundle = fs.readFileSync(file1, 'utf8');

const startRO = bundle.indexOf('function RO({onOpenEnquiry:e}){');
if (startRO === -1) {
  console.error('Could not locate function RO in bundle!');
  process.exit(1);
}

const bodyStart = bundle.indexOf('{', bundle.indexOf(')', startRO));
let depth = 0;
let endRO = -1;
for (let i = bodyStart; i < bundle.length; i++) {
  if (bundle[i] === '{') depth++;
  else if (bundle[i] === '}') {
    depth--;
    if (depth === 0) {
      endRO = i + 1;
      break;
    }
  }
}

const newBundle = bundle.substring(0, startRO) + newROCode + bundle.substring(endRO);

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
console.log('Successfully updated both bundle files with Contact Form placed just above the footer!');
