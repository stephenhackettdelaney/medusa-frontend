
export default function Button({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="border-2 border-cyan-900 px-6 py-2 bg-cyan-400 hover:bg-cyan-100"
        >
            {children}
        </button>
    )
}
