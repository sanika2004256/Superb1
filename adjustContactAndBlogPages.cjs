const fs = require('fs');
const acorn = require('acorn');

// Define inline SVGs
const sparkSvg = `(0,k.jsx)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"currentColor",viewBox:"0 0 24 24",children:(0,k.jsx)("path",{d:"M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"})})`;

const arrowRightSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),(0,k.jsx)("polyline",{points:"12 5 19 12 12 19"})]})`;

const phoneSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})]})`;

const clockSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("polyline",{points:"12 6 12 12 16 14"})]})`;

const mapPinSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),(0,k.jsx)("circle",{cx:"12",cy:"10",r:"3"})]})`;

const globeSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,k.jsx)("path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),(0,k.jsx)("path",{d:"M2 12h20"})]})`;

const cupSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-amber-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M17 8h1a4 4 0 1 1 0 8h-1"}),(0,k.jsx)("path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"}),(0,k.jsx)("line",{x1:"6",y1:"2",x2:"6",y2:"4"}),(0,k.jsx)("line",{x1:"10",y1:"2",x2:"10",y2:"4"}),(0,k.jsx)("line",{x1:"14",y1:"2",x2:"14",y2:"4"})]})`;

const boxSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),(0,k.jsx)("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),(0,k.jsx)("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})`;

const cogSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"12",r:"3"}),(0,k.jsx)("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"})]})`;

const leafSvg = `(0,k.jsx)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,k.jsx)("path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"})})`;

const mailSvg = `(0,k.jsxs)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),(0,k.jsx)("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]})`;

const bookSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-[#d92906]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"}),(0,k.jsx)("path",{d:"M6 6h10"}),(0,k.jsx)("path",{d:"M6 10h10"})]})`;

const flaskSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-blue-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("path",{d:"M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"}),(0,k.jsx)("path",{d:"M8.5 2h7"})]})`;

const awardSvg = `(0,k.jsxs)("svg",{className:"w-5 h-5 text-emerald-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,k.jsx)("circle",{cx:"12",cy:"8",r:"6"}),(0,k.jsx)("path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"})]})`;

// Upgraded Luxury Blog Page Component
const newLOCode = `function LO({onOpenEnquiry:e}){
  let[t,n]=(0,_.useState)("All Articles");
  let[r,i]=(0,_.useState)(null);
  let a=["All Articles","Beverage Insights","Wellness & Health","Chai Culture","Brewing Guide","Quality & Manufacturing"];
  let o=t==="All Articles"?EO:EO.filter(e=>e.category===t);
  let s=EO[0];

  return (0,k.jsxs)("div", {
    className: "pt-16 sm:pt-20 pb-10 sm:pb-14 min-h-screen text-slate-800",
    style: { background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)" },
    children: [
      /* HERO HEADER SECTION WITH AMBIENT GLOW AND 4 LUXURY KPI METRIC CARDS */
      (0,k.jsxs)("section", {
        className: "blog-hero-wrapper pt-8 sm:pt-12 pb-12 sm:pb-16 relative",
        children: [
          (0,k.jsx)("div", { className: "blog-hero-glow-1" }),
          (0,k.jsx)("div", { className: "blog-hero-glow-2" }),
          (0,k.jsxs)("div", {
            className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
            children: [
              (0,k.jsxs)("div", {
                className: "blog-badge-pill mx-auto mb-3 sm:mb-4",
                children: [
                  ${sparkSvg},
                  (0,k.jsx)("span", { children: "Knowledge & Industry Insights • Official Journal" })
                ]
              }),
              (0,k.jsxs)("h1", {
                className: "blog-hero-title mb-3 sm:mb-4",
                children: [
                  "Insights Into Beverage Culture, ",
                  (0,k.jsx)("span", { className: "text-[#d92906]", children: "Wellness & Quality" })
                ]
              }),
              (0,k.jsx)("div", {
                className: "w-24 h-1.5 bg-gradient-to-r from-[#d92906] via-amber-500 to-[#d92906] rounded-full mx-auto mb-4 sm:mb-5"
              }),
              (0,k.jsx)("p", {
                className: "blog-hero-subtitle max-w-3xl mx-auto mb-7 sm:mb-9",
                children: "Stay informed with expert brewing tips, health benefits of spiced teas, industry trends, and technological updates from our manufacturing facilities."
              }),
              /* 4 LUXURY KPI METRIC CARDS */
              (0,k.jsxs)("div", {
                className: "blog-kpi-grid",
                children: [
                  (0,k.jsxs)("div", {
                    className: "blog-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3 shadow-xs",
                        children: ${bookSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "6 Guides" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Curated Industry Insights" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Master Blender Research" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "blog-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${cupSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "100%" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Authentic Amruttulya" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Pure Botanical Spices" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "blog-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${flaskSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "FSSAI" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Food Science Standards" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Industrial Cleanroom Plant" })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "blog-kpi-card",
                    children: [
                      (0,k.jsx)("div", {
                        className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shadow-xs",
                        children: ${awardSvg}
                      }),
                      (0,k.jsx)("span", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 block", children: "93+ SKUs" }),
                      (0,k.jsx)("span", { className: "text-xs font-bold text-slate-700 block mt-1", children: "Commercial Range" }),
                      (0,k.jsx)("span", { className: "text-[11px] text-slate-500 block mt-0.5", children: "Premixes, Sachets & Machines" })
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
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8 sm:pb-12 space-y-12 sm:space-y-16",
        children: [
          /* CATEGORY FILTER TABS */
          (0,k.jsx)("div", {
            className: "flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none",
            children: a.map(e => (0,k.jsx)("button", {
              key: e,
              type: "button",
              onClick: () => n(e),
              className: "blog-category-pill " + (t === e ? "active" : ""),
              children: e
            }))
          }),

          /* FEATURED SPOTLIGHT ARTICLE (WHEN 'All Articles' SELECTED) */
          t === "All Articles" && s && (0,k.jsxs)("div", {
            className: "blog-featured-card grid grid-cols-1 lg:grid-cols-12 cursor-pointer group",
            onClick: () => i(s),
            children: [
              (0,k.jsxs)("div", {
                className: "lg:col-span-6 relative overflow-hidden bg-slate-100 h-64 sm:h-80 lg:h-full min-h-[280px]",
                children: [
                  (0,k.jsx)("img", {
                    src: s.image,
                    alt: s.title,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                  }),
                  (0,k.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" }),
                  (0,k.jsx)("span", {
                    className: "absolute top-4 left-4 bg-[#d92906] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider",
                    children: "Featured Article"
                  })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4",
                children: [
                  (0,k.jsxs)("div", {
                    className: "space-y-3",
                    children: [
                      (0,k.jsxs)("div", {
                        className: "flex items-center gap-3 text-xs text-slate-500",
                        children: [
                          (0,k.jsx)("span", { className: "px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-800 border border-amber-200/80", children: s.category }),
                          (0,k.jsx)("span", { children: "•" }),
                          (0,k.jsx)("span", { children: s.date }),
                          (0,k.jsx)("span", { children: "•" }),
                          (0,k.jsx)("span", { children: s.readTime })
                        ]
                      }),
                      (0,k.jsx)("h3", {
                        className: "text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif text-slate-900 group-hover:text-[#d92906] transition-colors leading-snug",
                        children: s.title
                      }),
                      (0,k.jsx)("p", {
                        className: "text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3",
                        children: s.excerpt
                      })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "pt-4 border-t border-slate-100 flex items-center justify-between",
                    children: [
                      (0,k.jsxs)("span", {
                        className: "text-xs sm:text-sm font-bold text-[#d92906] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform",
                        children: [
                          (0,k.jsx)("span", { children: "Read Full Article" }),
                          ${arrowRightSvg}
                        ]
                      }),
                      (0,k.jsx)("span", { className: "text-xs text-slate-500 font-medium", children: "By Superb MegaCorp Editorial Desk" })
                    ]
                  })
                ]
              })
            ]
          }),

          /* ARTICLES GRID */
          (0,k.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7",
            children: o.map((e) => (0,k.jsxs)("article", {
              key: e.id,
              onClick: () => i(e),
              className: "bg-white rounded-2xl overflow-hidden border border-slate-200/85 hover:border-red-200 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group cursor-pointer shadow-xs",
              children: [
                (0,k.jsxs)("div", {
                  children: [
                    (0,k.jsxs)("div", {
                      className: "relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100",
                      children: [
                        (0,k.jsx)("img", {
                          src: e.image,
                          alt: e.title,
                          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                        }),
                        (0,k.jsx)("span", {
                          className: "absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#d92906] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60",
                          children: e.category
                        })
                      ]
                    }),
                    (0,k.jsxs)("div", {
                      className: "p-5 sm:p-6 space-y-2.5",
                      children: [
                        (0,k.jsxs)("div", {
                          className: "flex items-center gap-2.5 text-[11px] sm:text-xs text-slate-400",
                          children: [
                            (0,k.jsx)("span", { children: e.date }),
                            (0,k.jsx)("span", { children: "•" }),
                            (0,k.jsx)("span", { children: e.readTime })
                          ]
                        }),
                        (0,k.jsx)("h3", {
                          className: "text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#d92906] transition-colors line-clamp-2 leading-snug font-serif",
                          children: e.title
                        }),
                        (0,k.jsx)("p", {
                          className: "text-xs sm:text-[13px] text-slate-600 line-clamp-3 leading-relaxed",
                          children: e.excerpt
                        })
                      ]
                    })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between",
                  children: [
                    (0,k.jsxs)("span", {
                      className: "text-xs font-bold text-[#d92906] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform",
                      children: [
                        (0,k.jsx)("span", { children: "Read Article" }),
                        ${arrowRightSvg}
                      ]
                    }),
                    (0,k.jsx)("span", { className: "text-[11px] text-slate-400 font-medium", children: "By Superb Team" })
                  ]
                })
              ]
            }))
          }),

          /* LUXURY CORPORATE SAMPLE TASTING CTA BANNER */
          (0,k.jsx)("section", {
            className: "pt-4",
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
                        (0,k.jsx)("span", { children: "Commercial Testing & Distribution" })
                      ]
                    }),
                    (0,k.jsx)("h3", {
                      className: "text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight",
                      children: "Request A Corporate Sample Tasting Pack"
                    }),
                    (0,k.jsx)("p", {
                      className: "text-slate-300 text-xs sm:text-sm leading-relaxed",
                      children: "Experience the authentic taste, aroma, and commercial consistency of Superb MegaCorp's FSSAI-certified premixes before placing wholesale bulk orders."
                    })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0",
                  children: [
                    (0,k.jsxs)("button", {
                      type: "button",
                      onClick: () => e && e({ name: "Blog Sample Tasting Request" }),
                      className: "w-full sm:w-auto bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2",
                      children: [
                        (0,k.jsx)("span", { children: "Request Trial Samples" }),
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
          })
        ]
      }),

      /* BLOG DETAIL MODAL (REUSING DO) */
      (0,k.jsx)(DO, { blog: r, onClose: () => i(null) })
    ]
  });
}`;

// Upgraded Luxury Contact Page Component
const newROCode = `function RO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-16 sm:pt-20 pb-10 sm:pb-14 min-h-screen text-slate-800",
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

      /* MAIN INTERACTIVE FORM AND CONTACT DETAILS CONTAINER */
      (0,k.jsxs)("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 space-y-14 sm:space-y-18",
        children: [
          /* EMBED WORKING kO FORM (WITH COMPACT TOP AND DEDICATED HEADING) */
          (0,k.jsx)(kO, {
            compactTop: true,
            badge: "Direct Communication",
            title: "Commercial Inquiries & Regional Desks",
            subtitle: "Submit your requirement below or connect directly with our Sangli plant or Pune regional corporate office."
          }),

          /* SECTION 2: 4 SPECIALIZED DEPARTMENT DIRECTORIES */
          (0,k.jsxs)("section", {
            className: "space-y-6 sm:space-y-8",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-xl mx-auto space-y-2",
                children: [
                  (0,k.jsx)("span", { className: "text-[#d92906] font-bold text-xs uppercase tracking-widest bg-red-50 px-3.5 py-1 rounded-full border border-red-200 inline-block shadow-2xs", children: "Direct Desk Directory" }),
                  (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Department Enquiries" }),
                  (0,k.jsx)("p", { className: "text-xs sm:text-sm text-slate-600", children: "Route your enquiry directly to the relevant corporate division for expedited turnaround." })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",
                children: [
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    children: [
                      (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3", children: ${cupSvg} }),
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1", children: "Cafe Franchising" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-3", children: "Tea Spot cafe territory expansion, kiosk economics & commercial training." }),
                      (0,k.jsx)("a", { href: "mailto:" + O.contact.email, className: "text-xs font-bold text-[#d92906] hover:underline block truncate", children: O.contact.email })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    children: [
                      (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-red-50 text-[#d92906] flex items-center justify-center mb-3", children: ${boxSvg} }),
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1", children: "Premix Wholesale" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-3", children: "Institutional vending machines, 1kg pouches & 14g single-serve sachets." }),
                      (0,k.jsx)("a", { href: "mailto:" + O.contact.email, className: "text-xs font-bold text-[#d92906] hover:underline block truncate", children: O.contact.email })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    children: [
                      (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3", children: ${cogSvg} }),
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1", children: "Agro Machinery" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-3", children: "Vizuki precision orchard sprayers, weeding systems & farm mechanization." }),
                      (0,k.jsx)("a", { href: "mailto:" + O.contact.email, className: "text-xs font-bold text-[#d92906] hover:underline block truncate", children: O.contact.email })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-dept-card",
                    children: [
                      (0,k.jsx)("div", { className: "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3", children: ${leafSvg} }),
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-1", children: "Fresh Fruit Exports" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed mb-3", children: "GlobalGAP certified fresh Bhagwa pomegranates and cold chain arils." }),
                      (0,k.jsx)("a", { href: "mailto:" + O.contact.email, className: "text-xs font-bold text-[#d92906] hover:underline block truncate", children: O.contact.email })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 3: FREQUENTLY ASKED QUESTIONS */
          (0,k.jsxs)("section", {
            className: "space-y-6 sm:space-y-8",
            children: [
              (0,k.jsxs)("div", {
                className: "text-center max-w-xl mx-auto space-y-2",
                children: [
                  (0,k.jsx)("span", { className: "text-amber-700 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200 inline-block shadow-2xs", children: "Instant Clarifications" }),
                  (0,k.jsx)("h3", { className: "text-2xl sm:text-3xl font-extrabold font-serif text-slate-900", children: "Frequently Asked Questions" })
                ]
              }),
              (0,k.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6",
                children: [
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    children: [
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-2", children: "How quickly will your team respond?" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Our commercial desk operates Mon–Sat and guarantees an initial email/call consultation within 2 to 4 business hours." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    children: [
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-2", children: "Can we visit the Sangli manufacturing plant?" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Yes! Corporate clients, franchise prospects, and bulk buyers are welcome to schedule guided visits to our Sangli MIDC facility." })
                    ]
                  }),
                  (0,k.jsxs)("div", {
                    className: "contact-faq-card",
                    children: [
                      (0,k.jsx)("h4", { className: "font-bold font-serif text-slate-900 text-base mb-2", children: "Do you supply sample tasting packs?" }),
                      (0,k.jsx)("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Yes, sample tasting packs of our Karak, Elaichi, Ginger, and Masala premixes are dispatched nationwide to verified businesses upon request." })
                    ]
                  })
                ]
              })
            ]
          }),

          /* SECTION 4: LUXURY CALL TO ACTION BANNER */
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
                        (0,k.jsx)("span", { children: "Direct Corporate Desk" })
                      ]
                    }),
                    (0,k.jsx)("h3", {
                      className: "text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight",
                      children: "Accelerate Your Business with Superb MegaCorp"
                    }),
                    (0,k.jsx)("p", {
                      className: "text-slate-300 text-xs sm:text-sm leading-relaxed",
                      children: "Whether you need immediate wholesale pricing, franchise territory booking, or agricultural contract farming consultation, our executive commercial team is on standby."
                    })
                  ]
                }),
                (0,k.jsxs)("div", {
                  className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0",
                  children: [
                    (0,k.jsxs)("a", {
                      href: "tel:" + O.contact.tollFreeRaw,
                      className: "w-full sm:w-auto bg-[#d92906] hover:bg-[#b91c1c] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all text-center flex items-center justify-center gap-2",
                      children: [
                        ${phoneSvg},
                        (0,k.jsxs)("span", { children: ["Call: ", O.contact.tollFree] })
                      ]
                    }),
                    (0,k.jsxs)("a", {
                      href: "mailto:" + O.contact.email,
                      className: "w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center gap-2",
                      children: [
                        ${mailSvg},
                        (0,k.jsx)("span", { children: "Send Email" })
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

// Validate newLOCode and newROCode syntax with Acorn
try {
  acorn.parse(newLOCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('newLOCode parsed successfully with Acorn!');
  acorn.parse(newROCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('newROCode parsed successfully with Acorn!');
} catch (e) {
  console.error('Acorn syntax error in new components:', e.message);
  process.exit(1);
}

// Read bundle and locate LO and RO
const file1 = './assets/index-v29-1790684309157.js';
const file2 = './public/assets/index-v29-1790684309157.js';

let bundle = fs.readFileSync(file1, 'utf8');

const startLO = bundle.indexOf('function LO({onOpenEnquiry:e}){');
const startRO = bundle.indexOf('function RO({onOpenEnquiry:e}){');

if (startLO === -1 || startRO === -1) {
  console.error('Could not locate function LO or RO in bundle!');
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

console.log('Replacing LO and RO from', startLO, 'to', endRO);
const combinedNew = newLOCode + newROCode;
const newBundle = bundle.substring(0, startLO) + combinedNew + bundle.substring(endRO);

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
console.log('Successfully updated both bundle files with luxury Contact and Blog pages!');
