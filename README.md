# EchoLink - AI Voice Enhancement Platform

An AI-powered voice enhancement platform with crystal clear audio, real-time translations, and smart analytics powered by Meta's LLAMA 3.0.

## Features

- Voice enhancement for crystal clear audio
- Real-time translations
- AI-powered smart analytics
- Beautiful UI with sparkle effects
- Complete authentication flow

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/echolink.git
cd echolink
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file based on `.env.example` and fill in your Supabase credentials

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploying to Vercel

To deploy this application to Vercel, follow these steps:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the required environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the application

For detailed deployment instructions, see [our deployment guide](docs/deployment.md).

## Environment Variables

This project requires the following environment variables:

| Name | Description | Required |
|------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Troubleshooting

### "supabaseUrl is required" Error

If you encounter this error when deploying to Vercel, make sure that:

1. You've correctly set up the environment variables in Vercel
2. The variable names match exactly what's expected (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. You've redeployed after setting the variables

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Shadcn UI](https://ui.shadcn.com/) - UI components

## License

This project is licensed under the MIT License. 