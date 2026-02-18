import { routes, type VercelConfig } from '@vercel/config/v1';
import "utils/types"

export const config: VercelConfig = {
    buildCommand: 'npm run build',
    rewrites: [
        routes.rewrite('/api/(.*)', process.env.BACKEND_URL+'/$1'),
    ],
};