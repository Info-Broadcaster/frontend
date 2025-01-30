/* eslint-disable react/no-unescaped-entities */
import "./App.css";
import { useNavigate } from "react-router-dom";
import PageLayer from "./PageLayer";
import { useState } from "react";
import Button from "./components/Button";
import { RiAiGenerate } from "react-icons/ri";

function App() {
  const [link, setLink] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const navigate = useNavigate();
  const availableLanguages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "Anglais" },
  ];

  function generateArticle() {
    if (link === "") {
      alert("Veuillez entrer un lien");
      return;
    }
    navigate(`/edition/${encodeURIComponent(link)}/${selectedLanguage}`);
  }

  function onLinkChange(event) {
    setLink(event.target.value);
  }

  function onLanguageChange(event) {
    console.log(event.target.value);
    setSelectedLanguage(event.target.value);
  }

  return (
    <PageLayer>
      <div className="flex flex-col w-full items-center gap-10 pt-10">
        <img
          src="/logo1.png"
          className="rounded-full h-28 w-28 transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-6 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.8)]"
        />
        <h1 className="text-4xl">InfoBroadcaster</h1>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto leading-relaxed">
          InfoBroadcaster est une application de diffusion d'informations,
          permettant de résumer des liens web et de les partager à un public
          ciblé.
        </p>
        <div className="flex w-full justify-center">
          <input
            type="text"
            placeholder="Votre lien ..."
            className="border-b-2 w-5/12 h-14 bg-none focus:border-purple-700 focus:shadow-md focus:border-b-2 focus:outline-none px-3"
            value={link}
            onChange={onLinkChange}
          />
          <select
            name="langue"
            id="langue"
            onChange={onLanguageChange}
            className="focus:outline-none bg-purple-700 text-white h-14 px-3"
          >
            {availableLanguages.map((language) => (
              <option
                key={language.code}
                value={language.code}
                className="bg-white text-black rounded-none"
              >
                {language.name}
              </option>
            ))}
          </select>
        </div>
        <Button callback={() => generateArticle()}>
          Générer <RiAiGenerate className="text-xl" />
        </Button>
      </div>
    </PageLayer>
  );
}

export default App;
