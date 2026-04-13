# Green Web Audit — Frontend

React dashboard for auditing websites for **performance and carbon impact**.

**Live:** [greenwebaudit-frontend.vercel.app](https://greenwebaudit-frontend.vercel.app)

---

## What it does

Enter any URL and get an instant audit showing:

- Page size
- Image, script, and stylesheet counts
- Carbon score (grams CO2 per pageview)
- Performance score (0–100)
- Actionable recommendations
- Audit history (stored in Supabase)

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- Connects to [greenwebaudit-backend](https://greenwebaudit-backend-11644999869f.herokuapp.com) for audit logic
- Deployed on **Vercel** with auto-deploy from GitHub

---

## Project Structure

```
src/
├── components/
│   ├── URLInput.tsx         # URL input form
│   ├── ResultsDashboard.tsx # Audit results display
│   └── AuditHistory.tsx     # Historical audit panel
├── App.tsx
└── main.tsx
```

---

## Local Development

```bash
npm install
npm run dev
```

The frontend expects the backend running at `http://localhost:5000` by default. Set `VITE_API_URL` to point elsewhere.

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

## Deployment

Deployed on Vercel. Pushes to `main` trigger an automatic redeploy.

---

## Related Projects

| Project | Description | Link |
|---------|-------------|------|
| greenwebaudit-backend | Node.js/Express audit API | [Heroku](https://greenwebaudit-backend-11644999869f.herokuapp.com) |
| carbon_service | Rust microservice for CO2 calculation | [Heroku](https://greenwebaudit-carbon-8d141f0eb525.herokuapp.com) |
| green-audit-cli | CLI tool for terminal-based audits | [GitHub](https://github.com/MennovdLinde/green-audit-cli) |

---

## License

MIT
