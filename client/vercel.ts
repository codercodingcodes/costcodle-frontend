import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
    buildCommand: 'npm run build',
    rewrites: [
        // routes.rewrite('/api/(.*)', 'https://costcodle.vercel.app/$1'),
        routes.rewrite('/api/(.*)', 'costcodle.vercel.app/$1'),
    ],
};