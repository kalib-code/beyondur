/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['loremflickr.com', 'hadgcouxbzsseqdpksjx.supabase.co', 'images.unsplash.com']
    }
}

module.exports = nextConfig

