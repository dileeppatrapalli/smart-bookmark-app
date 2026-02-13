
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                {/* Sidebar component could go here */}
                <div className="p-4 bg-gray-200 h-full">
                    <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                    {/* Add navigation links here later */}
                </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
