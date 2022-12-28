/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['loremflickr.com', 'hadgcouxbzsseqdpksjx.supabase.co']
    }
}

module.exports = nextConfig

