# Deploying to Vercel

This guide will help you deploy the EchoLink application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [Supabase project](https://supabase.com/)
3. Your GitHub repository connected to Vercel

## Environment Variables

The application requires the following environment variables to be set in Vercel:

| Name | Description | Required |
|------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL | No |

### Finding your Supabase credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Project Settings > API
4. Copy the "Project URL" and "anon public" key

## Setting up environment variables in Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings > Environment Variables
4. Add each of the required variables with their corresponding values
5. Click "Save" to apply the changes

![Vercel Environment Variables Setup](https://vercel.com/docs/concepts/projects/environment-variables/images/project-dashboard-with-env.png)

## Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings (defaults should work fine)
3. Add the environment variables
4. Deploy your application

## Troubleshooting

If you encounter the error `supabaseUrl is required`, it means your environment variables are not properly set up. Check that:

1. The variable names are exactly `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. The values are correct and copied without any extra spaces
3. You've redeployed the application after setting the environment variables

## More Help

If you need more assistance, check out:

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs) 