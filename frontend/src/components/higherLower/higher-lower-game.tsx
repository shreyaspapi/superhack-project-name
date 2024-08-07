import React from "react";
import HistoryTable from "./history-table";

export default function HigherLowerGame() {
  return (
    <div className="grid grid-cols-[250px_3fr_2fr] gap-4 h-full">
      <HistoryTable />
      <div>HigherLowerGame</div>
      <div>HigherLowerGame</div>
    </div>
  );
}
