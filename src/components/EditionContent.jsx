import { IoIosSend } from "react-icons/io";
import Button from "./Button";
import TagList from "./TagList";
import InputLabel from "./InputLabel";
import DisplayFlag from "./DisplayFlag";
import DialogDefault from "./DialogDefaut";
import { useEffect, useState } from "react";

export default function EditionContent({
  link,
  lang,
  subject,
  setSubject,
  content,
  setContent,
  theme,
  isLoadingBubbles,
  bubbles,
  suggestBubbleTheme,
}) {
  const [isSent, setIsSent] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (jid, isChecked) => {
    setIsSent(false);
    setCheckedItems((prev) =>
      isChecked ? [...prev, jid] : prev.filter((item) => item !== jid)
    );
  };

  useEffect(() => {
    var newList = [];
    bubbles?.forEach((bubble) => {
      if (suggestBubbleTheme?.includes(bubble.topic)) {
        bubble.isSuggest = true;
        checkedItems.push(bubble.jid);
      } else {
        bubble.isSuggest = false;
      }
      newList.push(bubble);
    });
    console.log(newList);
  }, [suggestBubbleTheme, bubbles]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex w-full flex-col gap-5">
        <DisplayFlag flagCode={lang} />
        <InputLabel label="Lien" value={link} disabled={true} />
        <InputLabel
          label="Titre de l'article"
          setValue={setSubject}
          value={subject}
        />
        <InputLabel
          label="Contenu"
          setValue={setContent}
          value={content}
          textarea={true}
        />
        <div className="flex items-center justify-center w-full gap-5">
          <span className="w-1/5 min-w-20">
            <label>Catégories</label>
          </span>
          <TagList tags={theme} />
        </div>
        <div className="flex justify-end">
          <Button callback={() => setShowModal(true)} isLoading={false}>
            Envoyer sur Rainbow
            <IoIosSend className="text-2xl" />
          </Button>
        </div>
      </div>
      <DialogDefault
        showModal={showModal}
        setShowModal={setShowModal}
        bubbles={bubbles}
        onCheckBubble={handleCheck}
        checkedBubbles={checkedItems}
        isLoadingBubbles={isLoadingBubbles}
        content={content}
        isSent={isSent}
        setIsSent={setIsSent}
        link={link}
        title={subject}
      />
    </>
  );
}
