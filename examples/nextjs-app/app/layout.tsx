import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FreelanceShield } from 'react-freelance-shield';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'FreelanceShield Demo',
    description: 'Example implementation of react-freelance-shield',
};

export default function RootLayout({
    children,
    searchParams,
}: {
    children: React.ReactNode;
    searchParams?: { token?: string };
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <FreelanceShield
                    validToken={process.env.NEXT_PUBLIC_SHIELD_TOKEN || 'demo-secret-token'}
                    token={searchParams?.token}
                    text="UNPAID DRAFT"
                    contact="pay-me@freelancer.com"
                    debug={process.env.NODE_ENV === 'development'}
                />
                {children}
            </body>
        </html>
    );
}
