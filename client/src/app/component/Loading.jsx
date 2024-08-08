const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-8 w-8 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm16-1.291A7.962 7.962 0 0120 12h4c0 4.418-3.582 8-8 8v-4zm-9-3a1 1 0 011-1h.001a1 1 0 01.707 1.707l-2.598 2.597a1 1 0 01-1.414-1.414L11 13z"></path>
      </svg>
    </div>
  )
}

export default Loading
