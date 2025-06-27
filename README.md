# Simple Subscription Manager

*A minimalist, fully client-side app for tracking recurring expenses.*

> Responsive • Drag-and-drop cards • Multi-currency • Multi-language

---

## ✨ Features
- **Responsive design** – works on desktop and mobile.
- **Drag-and-drop card sorting** for quick manual re-ordering.
- **Automatic renewal processing** – cycles are auto-extended when due (user notifications coming soon).
- **Monthly / yearly statistics** with pie charts & total cost, grouped by *category* or *subscription*.
- **Filter & sort** by status, price, date, category, etc.
- **Light / dark themes** & optional card background colours.
- **i18n:** English, 简体中文, 日本語.
- **Default currency selector** – pick from 21 ISO-4217 currencies.
- **Three billing cycles**: daily, monthly, yearly.
- **Import / export** JSON data for easy backup & migration.

## 🌐 Live Demo
> _Coming soon_: <https://YOUR-DEPLOYED-URL.com>

<!-- replace with real URL after deploy -->

## 🛠️ Tech Stack
| Purpose | Library |
|---------|---------|
| UI / Framework | React 18 + TypeScript |
| Build tool     | Vite |
| Styling        | Tailwind CSS ＋ shadcn/ui |
| Drag-and-drop  | dnd-kit |
| Charts         | Recharts |
| Forms & schema | React-Hook-Form + Zod |
| Components     | Radix UI primitives |
| Misc. utils    | currency-symbol-map, nanoid, lucide-react, etc. |

## 🚀 Quick Start
```bash
git clone https://github.com/aron5055/minimal-subscription-manager.git
cd minimal-subscription-manager
npm install          # or npm / yarn
npm dev              # http://localhost:5173
npm build            # production
npm preview          # optional preview
