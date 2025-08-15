export default function Button({
    children,
    onClick,
    }: Readonly<{
    children: React.ReactNode;
    onClick?: () => void;
    }>) {
    return (
        <button
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-950 transition-colors cursor-pointer"
        onClick={onClick}
        >
        {children}
        </button>
    );
    }