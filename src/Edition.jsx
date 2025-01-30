import { useEffect, useRef, useState } from "react";
import PageLayer from "./PageLayer";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import EditionContent from "./components/EditionContent";
import LoadingScreen from "./components/LoadingScreen";
import ErrorMessage from "./components/ErrorMessage";

const STATUS = {
  LOADING: 1,
  ERROR: 2,
  EDITOR: 3,
};

export default function Edition() {
  const isDebugMode = false;
  const { link, lang } = useParams();
  const hasFetched = useRef(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bubbles, setBubbles] = useState([]);
  const [suggestBubbleTheme, setSuggestBubbleTheme] = useState([]);
  const [isLoadingBubbles, setIsLoadingBubbles] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function getBubbles() {
    setIsLoadingBubbles(true);
    axiosInstance
      .get("/rainbowGetBubbles")
      .then((response) => {
        setBubbles(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingBubbles(false);
      });
  }

  function getContent() {
    if (hasFetched.current) return;

    hasFetched.current = true;

    if (!isDebugMode) {
      setIsLoading(true);
      setErrorMsg("");
      axiosInstance
        .post("/dialoguewithllama/summarize", {
          url: decodeURIComponent(link),
          lang: lang,
        })
        .then((response) => {
          console.log(response.data.data);
          setContent(response.data.data.summarized);
          setSubject(response.data.data.title);
          setTheme(response.data.data.themes);
          setSuggestBubbleTheme(
            response.data.data.suggestThemeFromTopicsInBubbles
          );
          if (response.data.status === "error") {
            console.error(response.data.message);
            setErrorMsg(response.data.message);
            return;
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMsg("");
      setSubject("Sujet test");
      setContent("Contenu test");
      setTheme(["theme1", "theme2"]);
      setSuggestBubbleTheme(["theme1", "theme2"]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      getBubbles();
      getContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, lang, isDebugMode]);

  const getStatus = () => {
    if (isLoading) return STATUS.LOADING;
    if (errorMsg?.trim()) return STATUS.ERROR;
    return STATUS.EDITOR;
  };

  const renderContent = () => {
    switch (getStatus()) {
      case STATUS.ERROR:
        return <ErrorMessage text={errorMsg} />;
      case STATUS.LOADING:
        return <LoadingScreen text={"Génération de l'article en cours..."} />;

      case STATUS.EDITOR:
        return (
          <div>
            <EditionContent
              link={link}
              lang={lang}
              subject={subject}
              setSubject={setSubject}
              content={content}
              setContent={setContent}
              theme={theme}
              bubbles={bubbles}
              isLoadingBubbles={isLoadingBubbles}
              suggestBubbleTheme={suggestBubbleTheme}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <PageLayer title="Edition">{renderContent()}</PageLayer>;
}
