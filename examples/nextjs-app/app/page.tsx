export default function Home() {
    return (
        <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        🛡️ FreelanceShield Demo
                    </h1>
                    <p className="text-xl text-gray-600">
                        Professional watermark protection for your work
                    </p>
                </header>

                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How to Test</h2>

                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-semibold text-lg">Without Token (Current View)</h3>
                            <p className="text-gray-600">
                                You should see a watermark overlay saying "UNPAID DRAFT"
                            </p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-semibold text-lg">With Valid Token</h3>
                            <p className="text-gray-600 mb-2">
                                Add <code className="bg-gray-100 px-2 py-1 rounded">?token=demo-secret-token</code> to the URL
                            </p>
                            <a
                                href="?token=demo-secret-token"
                                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Try Valid Token
                            </a>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                            <h3 className="font-semibold text-lg">With Invalid Token</h3>
                            <p className="text-gray-600 mb-2">
                                Add <code className="bg-gray-100 px-2 py-1 rounded">?token=wrong-token</code> to the URL
                            </p>
                            <a
                                href="?token=wrong-token"
                                className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Try Invalid Token
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Amazing Project</h2>
                    <p className="text-gray-700 mb-4">
                        This is your freelance project that you've built for a client.
                        The watermark protects your work until payment is received.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Feature 1</h3>
                            <p className="text-gray-700">Amazing functionality that you built</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Feature 2</h3>
                            <p className="text-gray-700">Another great feature</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">Feature 3</h3>
                            <p className="text-gray-700">Even more awesome work</p>
                        </div>
                    </div>
                </div>

                <footer className="text-center mt-12 text-gray-600">
                    <p>
                        Open the browser console to see FreelanceShield debug messages
                    </p>
                </footer>
            </div>
        </main>
    );
}
