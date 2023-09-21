/**
 * The NavBar class that displays the navigation bar and search capability
 * @returns {JSX.Element}   the navigation bar content
 * @constructor             passes in props to the class
 */
function NavBar() {
    // Return Function
    return (
        <nav className="navbar flex fixed w-screen bg-neutral text-neutral-content sticky top-0 z-30 py-4">
            <div className="font-title font-bold flex-auto flex justify-end text-lg md:text-4xl text-accent">Catalog</div>
            <div className="flex-1 flex justify-end pr-3">
                <form className="max-w-sm px-4">
                    <div className="relative">
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-3 pl-12 pr-4 input input-bordered input-accent rounded-full"
                        />
                    </div>
                </form>
            </div>
        </nav>
    )
}

// Export Class
export default NavBar;