const fs = require('fs');
const acorn = require('acorn');

// We can write it cleanly with objects or template strings:
const code = `function jO({onOpenEnquiry:e}){
  return (0,k.jsxs)("div", {
    className: "pt-20 sm:pt-24 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen text-slate-800",
    children: [
      (0,k.jsx)("section", {
        className: "relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-14 sm:py-20 border-b border-slate-800",
        children: (0,k.jsxs)("div", {
          className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4",
          children: [
            (0,k.jsxs)("div", {
              className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest shadow-inner",
              children: [
                (0,k.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500" }),
                (0,k.jsx)("span", { children: "About Superb MegaCorp" })
              ]
            }),
            (0,k.jsx)("h1", {
              className: "text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white leading-tight",
              children: "Building Excellence, Trust & Global Impact"
            }),
            (0,k.jsx)("p", {
              className: "text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed",
              children: "From a visionary foundation in Sangli to international markets across four continents — discover the journey, values, and leadership driving Superb Mega Corporation."
            })
          ]
        })
      }),
      (0,k.jsxs)("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-12 sm:space-y-16",
        children: [
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6",
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
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60", children: "Est. 2010" }),
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#d92906] border border-red-200/60", children: "4,000+ Acres Network" })
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
                className: "pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs",
                children: [
                  (0,k.jsx)("span", { className: "font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1", children: "Global Presence:" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700", children: "Saudi Arabia" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700", children: "UAE" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700", children: "USA" }),
                  (0,k.jsx)("span", { className: "px-3 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700", children: "Netherlands" })
                ]
              })
            ]
          }),
          (0,k.jsxs)("section", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8",
            children: [
              (0,k.jsx)("div", {
                className: "bg-gradient-to-br from-amber-50/50 via-white to-red-50/30 p-7 sm:p-9 rounded-3xl border border-amber-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden",
                children: (0,k.jsxs)("div", {
                  className: "flex items-start gap-4 sm:gap-5",
                  children: [
                    (0,k.jsx)("div", {
                      className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform",
                      children: (0,k.jsx)(Kr, { className: "w-7 h-7" })
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
              (0,k.jsx)("div", {
                className: "bg-gradient-to-br from-red-50/50 via-white to-rose-50/30 p-7 sm:p-9 rounded-3xl border border-red-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden",
                children: (0,k.jsxs)("div", {
                  className: "flex items-start gap-4 sm:gap-5",
                  children: [
                    (0,k.jsx)("div", {
                      className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d92906] to-red-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform",
                      children: (0,k.jsx)(ya, { className: "w-7 h-7" })
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
          (0,k.jsxs)("section", {
            className: "bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-6",
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
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/70", children: "Agriculture" }),
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-bold border border-blue-200/70", children: "Engineering" }),
                      (0,k.jsx)("span", { className: "px-3 py-1 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200/70", children: "Pharmaceutical" })
                    ]
                  })
                ]
              }),
              (0,k.jsx)("div", {
                className: "flex justify-center pt-2",
                children: (0,k.jsxs)("div", {
                  className: "relative p-2.5 sm:p-3 bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-300/80 max-w-xl w-full overflow-hidden group",
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

try {
  acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('Code is 100% syntactically valid!');
  fs.writeFileSync('newJO.txt', code, 'utf8');
  console.log('Successfully written newJO.txt');
} catch (e) {
  console.error('Syntax error:', e);
}
