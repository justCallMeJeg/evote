# Pinas Elections

Pinas Elections is a real-time voting and tallying application built with [Next.js](https://nextjs.org), [Supabase](https://supabase.com), and [TailwindCSS](https://tailwindcss.com). It allows voters to register, cast their votes, and view real-time election results. The application also includes an admin dashboard for managing voters, candidates, and positions.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Database Schema](#database-schema)
6. [Environment Variables](#environment-variables)
7. [API and Utility Functions](#api-and-utility-functions)
8. [Styling](#styling)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)
11. [Future Enhancements](#future-enhancements)
12. [Contributing](#contributing)
13. [License](#license)

---

## Introduction

Pinas Elections is designed to streamline the voting process and provide real-time election results. It is ideal for small-scale elections, hackathons, or educational purposes. The application leverages Supabase for database and real-time updates, and TailwindCSS for responsive and modern UI design.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com) account and project.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pinas-elections.git
   cd pinas-elections
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```bash
pinas-elections/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── components/     # Reusable UI components
│   ├── home/           # Real-time tally and related pages
│   ├── lib/            # Utility functions and Supabase client
│   ├── register/       # Voter registration page
│   ├── vote/           # Voting page
│   └── globals.css     # Global styles
├── public/             # Static assets
├── .env                # Environment variables
├── README.md           # Documentation
└── package.json        # Project dependencies
```

---

## Features

### Voter Registration

- Allows users to register for the election.
- Key file: `app/register/page.tsx`.

### Voter Login

- Enables users to log in and access the voting page.
- Key file: `app/login/page.tsx`.

### Voting

- Users can cast their votes for candidates in various positions.
- Key file: `app/vote/page.tsx`.

### Real-Time Tally

- Displays real-time election results as votes are cast.
- Key file: `app/home/realtime-tally.tsx`.

### Admin Dashboard

- Admins can manage voters, candidates, and positions.
- Key files: `app/admin/page.tsx`, `app/admin/edit/page.tsx`, `app/admin/add/page.tsx`.

---

## Database Schema

### Tables

1. **voters**
   - `id`: Primary key.
   - `name`: Voter's name.
   - `email`: Voter's email.

2. **candidates**
   - `id`: Primary key.
   - `name`: Candidate's name.
   - `position_id`: Foreign key referencing `positions`.

3. **positions**
   - `id`: Primary key.
   - `name`: Name of the position (e.g., President).
   - `group`: Optional grouping field.

4. **votes**
   - `id`: Primary key.
   - `voter_id`: Foreign key referencing `voters`.
   - `ballot`: JSON object containing votes.

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## API and Utility Functions

### Key Functions

- **`getVoter`**: Fetches voter details.
- **`registerVote`**: Registers a vote in the database.
- **`getPositions`**: Retrieves available positions.

These functions are located in `app/lib/dbUtils.ts`.

---

## Styling

The application uses [TailwindCSS](https://tailwindcss.com) for styling and [DaisyUI](https://daisyui.com) for pre-designed components. Global styles are defined in `app/globals.css`.

---

## Deployment

The application can be deployed on [Vercel](https://vercel.com):

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set up environment variables in the Vercel dashboard.
4. Deploy the application.

---

## Troubleshooting

### Common Issues

- **Supabase Errors**: Ensure your API keys and database schema are correctly configured.
- **Environment Variables Missing**: Verify your `.env` file is set up properly.

---

## Future Enhancements

- Add analytics for voter turnout.
- Improve error handling and logging.
- Implement multi-language support.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
