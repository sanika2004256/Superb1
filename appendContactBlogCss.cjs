const fs = require('fs');

const cssToAdd = `
/* ==========================================================================
   CONTACT PAGE LUXURY STYLES
   ========================================================================== */
.contact-hero-wrapper {
  position: relative;
  overflow: hidden;
}
.contact-hero-glow-1 {
  position: absolute;
  top: -10%;
  left: 20%;
  width: 28rem;
  height: 28rem;
  background: radial-gradient(circle, rgba(217, 41, 6, 0.08) 0%, rgba(217, 41, 6, 0) 70%);
  border-radius: 9999px;
  filter: blur(40px);
  pointer-events: none;
}
.contact-hero-glow-2 {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 32rem;
  height: 32rem;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, rgba(245, 158, 11, 0) 70%);
  border-radius: 9999px;
  filter: blur(50px);
  pointer-events: none;
}
.contact-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #d92906;
}
.contact-hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #0f172a;
}
.contact-hero-subtitle {
  font-size: clamp(0.925rem, 2vw, 1.1rem);
  line-height: 1.65;
  color: #475569;
}
.contact-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  max-width: 68rem;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .contact-kpi-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}
.contact-kpi-card {
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
  .contact-kpi-card {
    padding: 1.5rem 1.25rem;
  }
}
.contact-kpi-card::before {
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
.contact-kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(217, 41, 6, 0.15);
  border-color: rgba(217, 41, 6, 0.25);
}
.contact-kpi-card:hover::before {
  opacity: 1;
}

/* Contact Department Card */
.contact-dept-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid rgba(226, 232, 240, 0.85);
  padding: 1.35rem 1.2rem;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.03);
  transition: all 0.3s ease;
  position: relative;
}
.contact-dept-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.09);
  border-color: rgba(217, 41, 6, 0.3);
}

/* Contact FAQ Card */
.contact-faq-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid rgba(226, 232, 240, 0.85);
  padding: 1.5rem 1.35rem;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.03);
  transition: all 0.3s ease;
}
.contact-faq-card:hover {
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 10px 24px -4px rgba(245, 158, 11, 0.1);
  transform: translateY(-3px);
}

/* ==========================================================================
   BLOG PAGE LUXURY STYLES
   ========================================================================== */
.blog-hero-wrapper {
  position: relative;
  overflow: hidden;
}
.blog-hero-glow-1 {
  position: absolute;
  top: -10%;
  left: 20%;
  width: 28rem;
  height: 28rem;
  background: radial-gradient(circle, rgba(217, 41, 6, 0.08) 0%, rgba(217, 41, 6, 0) 70%);
  border-radius: 9999px;
  filter: blur(40px);
  pointer-events: none;
}
.blog-hero-glow-2 {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 32rem;
  height: 32rem;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, rgba(245, 158, 11, 0) 70%);
  border-radius: 9999px;
  filter: blur(50px);
  pointer-events: none;
}
.blog-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #d92906;
}
.blog-hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #0f172a;
}
.blog-hero-subtitle {
  font-size: clamp(0.925rem, 2vw, 1.1rem);
  line-height: 1.65;
  color: #475569;
}
.blog-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  max-width: 68rem;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .blog-kpi-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}
.blog-kpi-card {
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
  .blog-kpi-card {
    padding: 1.5rem 1.25rem;
  }
}
.blog-kpi-card::before {
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
.blog-kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(217, 41, 6, 0.15);
  border-color: rgba(217, 41, 6, 0.25);
}
.blog-kpi-card:hover::before {
  opacity: 1;
}

/* Category Filter Pills */
.blog-category-pill {
  padding: 0.5rem 1.15rem;
  border-radius: 9999px;
  font-size: 0.825rem;
  font-weight: 600;
  background: #ffffff;
  color: #475569;
  border: 1px solid rgba(226, 232, 240, 0.9);
  transition: all 0.25s ease;
  cursor: pointer;
  white-space: nowrap;
}
.blog-category-pill:hover {
  border-color: rgba(217, 41, 6, 0.3);
  color: #d92906;
  background: #fff5f5;
}
.blog-category-pill.active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
}

/* Featured Article Card */
.blog-featured-card {
  background: #ffffff;
  border-radius: 1.75rem;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  transition: all 0.35s ease;
}
.blog-featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -8px rgba(15, 23, 42, 0.12);
  border-color: rgba(217, 41, 6, 0.3);
}
`;

fs.appendFileSync('./assets/attractive-theme.css', cssToAdd);
fs.appendFileSync('./public/assets/attractive-theme.css', cssToAdd);
console.log('Appended Contact and Blog luxury styles to both CSS files successfully!');
