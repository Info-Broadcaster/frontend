import { useEffect, useState } from "react";

export default function DisplayFlag({ flagCode }) {
  const [flag, setFlag] = useState("");
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (flagCode === "fr") {
      setFlag("/france.png");
      setLabel("Généré en Français");
    } else if (flagCode === "en") {
      setFlag("/uk.png");
      setLabel("Généré en Anglais");
    }
  }, [flagCode]);

  return (
    <div className="flex w-full  justify-end items-center gap-5">
      <img src={flag} alt="flag" className="h-12" />
      <span>{label}</span>
    </div>
  );
}
