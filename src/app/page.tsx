"use client";

import Question from "@/components/Question";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["json"];

export default function Home() {
  const [questions, setQuestions] = useState([]);

  const handleChange = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event?.target?.result as string);
      setQuestions(json);

      console.log("[INFO] Questions file parsed!");
    };
    reader.readAsText(file);
  };

  return (
    <div className="container w-full">
      <center className="mt-8 px-2">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </center>

      {questions &&
        questions.map((question, index) => {
          return <Question key={index} question={question} index={index} />;
        })}
    </div>
  );
}
