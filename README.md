# 🌐 InfoSec Lessons

This website is built using **[Docusaurus](https://docusaurus.io/)** and serves as a platform for cybersecurity tutorials, articles, and learning resources. The content covers areas such as **Blue Teaming**, **Red Teaming**, **GRC**, and foundational IT knowledge.

---

## 📦 Installation

First, make sure you have **Node.js v18 or above** and **npm** installed.

```bash
npm install
```

---

## 🚀 Local Development

Start the development server:

```bash
npm run start
```

This will launch the site at [http://localhost:3000](http://localhost:3000). Most changes will hot-reload instantly in the browser.

---

## 🏗️ Build Static Site

To generate the static files for production:

```bash
npm run build
```

The static site will be created in the `build/` directory and can be hosted anywhere.

---

## 🚀 Manual Deployment to GitHub Pages

### Using SSH:

```bash
USE_SSH=true GIT_USER="your username" npm run deploy
```

### Using HTTPS:

```bash
GIT_USER="your username" npm run deploy
```

This will push the latest `build/` folder to the `gh-pages` branch for GitHub Pages hosting.

---

## ⚙️ Auto-Deploy (CI/CD)

Auto-deploy is enabled via **GitHub Actions**. When you push changes to the `main` branch, the site is automatically built and deployed to:

🔗 [https://farzaliyevemil.github.io/infoseclessons](https://farzaliyevemil.github.io/infoseclessons)

---

## 🧠 Categories

The site covers the following categories:

- 🔴 **Red Teaming**
- 🔵 **Blue Teaming**
- 🛡️ **GRC (Governance, Risk, Compliance)**
- 🌐 **General Security**
- 🧰 **Foundations**: Networking, OS, Virtualization, Helpdesk

---

## 📚 Contribute

Feel free to contribute or use this as a base for your own InfoSec documentation site. Contributions are welcome!
