const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════╗
  ║   DUTY LEAVE MANAGEMENT SYSTEM - Backend Server       ║
  ║   Server Running on http://localhost:${PORT}        ║
  ║   Open: http://localhost:${PORT}                   ║
  ╚════════════════════════════════════════════════════════╝
  `);
});
