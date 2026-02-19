import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
    buildCommand: 'npm run build',
    rewrites: [
        routes.rewrite('/api/(.*)', process.env.VITE_BACKEND_URL+'/$1'),
    ],
};