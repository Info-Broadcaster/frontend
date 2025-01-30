export default function ErrorMessage({ text }) {
  return (
    <div className="flex justify-center items-center flex-col gap-4 py-20 ">
      <img src={"/error.png"} alt="Image d'erreur" className="w-1/6" />
      <span className="text-red-600 text-xl">{text}</span>
    </div>
  );
}
