import AdvancedSpinner from "./AdvancedSpinner";

export default function LoadingScreen({ text }) {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <AdvancedSpinner />
      <span>{text}</span>
    </div>
  );
}
