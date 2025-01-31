import MDEditor from "@uiw/react-md-editor";

export default function InputLabel({
  label,
  value,
  setValue,
  disabled = false,
  textarea = false,
  placeholder = "",
}) {
  return (
    <div className="flex items-center justify-center w-full gap-5 ">
      <span className="w-1/6 min-w-20">
        <label>{label}</label>
      </span>
      {textarea ? (
        <div data-color-mode="light" className={"w-5/6  "}>
          <MDEditor value={value} onChange={setValue} />
        </div>
      ) : (
        <input
          type="text"
          className={`border w-5/6 text-start p-4 focus:outline-purple-700  ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
