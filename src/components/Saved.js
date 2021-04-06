import { useState } from "react";
import RecordForm from "./RecordForm";

export default function Saved() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <>
      <div>
        <p>Saved tab...</p>
      </div>
      <RecordForm show={selectedRecord !== null} onSubmit={handleSubmit} />
    </>
  );
}
