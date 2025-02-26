import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/sobre",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
