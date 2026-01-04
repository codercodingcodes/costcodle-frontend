import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
    buildCommand: 'npm run build',
    rewrites: [
        routes.rewrite('/api/(.*)', 'https://costcodle-321020937506.europe-west1.run.app'),
    ],
};