fetch('https://superbmegacorp-ten.vercel.app/').then(r => r.text()).then(t => {
  let m = t.match(/href="\/assets\/[^>]+\.css"/g);
  console.log(m);
});
