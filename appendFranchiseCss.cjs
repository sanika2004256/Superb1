const fs = require('fs');

const cssToAdd = `
/* Franchise Page Dedicated Luxury Styles */
.franchise-hero-wrapper {
  position: relative;
  overflow: hidden;
}
.franchise-hero-glow-1 {
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
.franchise-hero-glow-2 {
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
.franchise-badge-pill {
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
.franchise-hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #0f172a;
}
.franchise-hero-subtitle {
  font-size: clamp(0.925rem, 2vw, 1.1rem);
  line-height: 1.65;
  color: #475569;
}
.franchise-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  max-width: 68rem;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .franchise-kpi-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
}
.franchise-kpi-card {
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
  .franchise-kpi-card {
    padding: 1.5rem 1.25rem;
  }
}
.franchise-kpi-card::before {
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
.franchise-kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(217, 41, 6, 0.15);
  border-color: rgba(217, 41, 6, 0.25);
}
.franchise-kpi-card:hover::before {
  opacity: 1;
}

/* Franchise Outlet Showcase Frame */
.franchise-showcase-frame {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 1.75rem;
  box-shadow: 0 12px 36px -6px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}
.franchise-showcase-frame img {
  display: block;
  width: 100%;
  height: auto;
}

/* Franchise Inclusions Card */
.franchise-inclusions-card {
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 1.75rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05);
  position: relative;
}

/* Franchise Feature / Advantage Card */
.franchise-advantage-card {
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
.franchise-advantage-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -6px rgba(15, 23, 42, 0.09);
  border-color: rgba(217, 41, 6, 0.25);
}

/* 4 Steps Stepper */
.franchise-step-card {
  position: relative;
  padding: 1.5rem 1.35rem;
  border-radius: 1.25rem;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.franchise-step-card:hover {
  border-color: rgba(217, 41, 6, 0.3);
  box-shadow: 0 12px 28px -6px rgba(217, 41, 6, 0.1);
  transform: translateY(-4px);
}
.franchise-step-num {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  color: #d92906;
  margin-bottom: 0.5rem;
}
`;

fs.appendFileSync('./assets/attractive-theme.css', cssToAdd);
fs.appendFileSync('./public/assets/attractive-theme.css', cssToAdd);
console.log('Appended franchise css to both files successfully!');
