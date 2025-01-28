import { useEffect, useState } from "react";
import HistoryTable from "./components/HistoryTable";
import PageLayer from "./PageLayer";
import axiosInstance from "../axiosInstance";
import AdvancedSpinner from "./components/AdvancedSpinner";

export default function History() {
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getLinesHistory() {
    setIsLoading(true);
    axiosInstance
      .get("/getStatistics")
      .then((response) => {
        setLines(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getLinesHistory();
  }, []);

  return (
    <PageLayer title={"Historique"}>
      {isLoading ? (
        <div className="flex justify-center items-center flex-col gap-4 ">
          <AdvancedSpinner />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span>Récupération de l'historique en cours...</span>
        </div>
      ) : (
        <HistoryTable lines={lines} />
      )}
    </PageLayer>
  );
}
