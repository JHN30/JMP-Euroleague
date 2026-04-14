# JMP Euroleague

**JMP Euroleague** is a data-driven web application that predicts Euroleague basketball game outcomes using a custom-built rating system. It provides win probabilities, standings insights, and playoff simulations in an interactive interface.

**Live App:** https://www.jmpeuroleague.com/

---

## Motivation

My main goal was to create a simple way to represent a team’s strength with a single number.

In sports, even the most obvious metrics, like total wins, don’t always tell the full story. A team can have a strong record but benefit from easier matchups, while another team might be stronger overall despite fewer wins.

I wanted to build a system that cuts through that complexity.

Instead of analyzing hundreds of statistics, JMP Euroleague provides a clear, data-driven estimate of team strength in one place. The goal is to give both myself and other fans an intuitive understanding of how strong a team really is, without needing to dig through endless data.

---

## Quick Start

### Use the Live App
1. Open https://www.jmpeuroleague.com/
2. Explore the pages.

Navigate to Predictor to explore match predictions.

---

## Usage

### Core Features

- **Standings**  
  Track real-time rankings and team performance.

- **Predictor**  
  View win probabilities based on JMP Rating.

- **Playoffs**  
  Simulate playoff brackets and scenarios.

- **Team Stats**  
  Analyze trends and advanced metrics.

---

### Rating System (JMP Rating)

For full details:  
https://github.com/JHN30/JMP-Rating

Key concepts:
- Player efficiency index (JEI)
- Recency weighting (exponential decay)
- Team strength aggregation (depth vs star power)

---

### Tech Stack

**Frontend**
- React
- React Router
- Zustand
- TailwindCSS + DaisyUI
- Chart.js
- Motion

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- MSSQL
- JWT Authentication
- bcryptjs, cookie-parser

**Infrastructure**
- Cloudinary (images)
- Mailtrap (email testing)
- Render (deployment)

---

## Contributing

Contributions are welcome, but there are a few things to keep in mind.

This project relies on:
- A private database (team data, ratings, etc.)
- External services (Cloudinary, Mailtrap)
- A deployed domain (Cloudflare setup for email functionality)

Because of this, running the full application locally requires additional setup and access that is not included in the public repository.

### What you *can* do

You can still:
- Explore and improve the frontend (UI/UX, components, styling)
- Review and suggest improvements to the rating logic
- Refactor backend structure or suggest optimizations
- Open issues for bugs or feature ideas

### Running locally (limited mode)

You can run the project locally with your own configuration:
- Provide your own MongoDB instance
- Replace API keys in `.env`
- Mock or seed your own data for testing

### Contributing workflow

```bash
# Clone the repository
git clone https://github.com/your-username/jmp-euroleague.git
cd jmp-euroleague

# Build the project
npm run build

# Start backend (from root directory)
npm run dev

# Start frontend (from frontend directory and in separate terminal)
cd frontend
npm run dev

# Run production build (from root)
npm run start
```

If you'd like to contribute:
- Fork the repository
- Create a feature branch
- Open a pull request to `main`

---

If you're interested in deeper collaboration or need access to certain parts of the system, feel free to reach out.

### Environment Variables

Create a `.env` file:

```bash
MONGO_URI=your_mongo_uri
PORT=5000

ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAILTRAP_API_TOKEN=your_mailtrap_api_token

CLIENT_URL=your_client_url

NODE_ENV=development
```

---
