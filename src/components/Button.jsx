import Spinner from "./Spinner";

export default function Button({
  children,
  callback,
  isLoading = false,
  color = "bg-purple-700",
  type = "button",
  disabled = false,
}) {
  const isButtonDisabled = isLoading || disabled;

  return (
    <div className="grid place-content-center">
      <button
        className={`group relative w-60 h-14 ${color}  text-white font-semibold transition-colors duration-300 
          ${
            isButtonDisabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-purple-600 cursor-pointer"
          }`}
        onClick={!isButtonDisabled ? callback : undefined}
        disabled={isButtonDisabled}
        type={type}
      >
        <span className="relative z-10 flex items-center justify-center gap-2 ">
          {isLoading ? <Spinner /> : children}
        </span>

        {/* TOP */}
        <span className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-200 group-hover:w-full " />

        {/* RIGHT */}
        <span className="absolute right-0 top-0 h-0 w-[2px] bg-gradient-to-b from-yellow-500 to-yellow-300 transition-all delay-150 duration-200 group-hover:h-full " />

        {/* BOTTOM */}
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all delay-300 duration-200 group-hover:w-full " />

        {/* LEFT */}
        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-gradient-to-b from-yellow-500 to-yellow-300 transition-all delay-450 duration-200 group-hover:h-full " />
      </button>
    </div>
  );
}
