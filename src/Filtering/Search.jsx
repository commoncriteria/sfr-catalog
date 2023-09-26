/**
 * The Search class that allows for user search form input
 * @returns {JSX.Element}   the search bar content/form
 * @constructor             passes in props to the class
 */
function Search() {
    // Return Function
    return (
        <div className="flex-1 flex my-8">
            <form className="max-w-sm">
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
                        className="w-full py-3 pl-12 pr-4 input input-bordered input-accent rounded-full bg-neutral"
                    />
                </div>
            </form>
        </div>
    )
}

// Export Class
export default Search;