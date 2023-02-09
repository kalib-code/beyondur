/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['loremflickr.com', 'hadgcouxbzsseqdpksjx.supabase.co', 'images.unsplash.com', 'placeimg.com']
    },
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        NEXT_PUBLIC_AWS_SECRET_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
        NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
        NEXT_PUBLIC_AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true
            },
        ]
    },
}

module.exports = nextConfig

