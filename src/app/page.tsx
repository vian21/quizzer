"use client";

import Question from "@/components/Question";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["json"];

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event?.target?.result as string);
      setQuestions(json);

      const basename = file.name.replace(/\.[^/.]+$/, "");
      setFileName(basename);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    document.title = fileName;
  }, [fileName]);

  return (
    <div className="w-full">
      <center className="no-print mt-8 px-2">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </center>

      {questions.length > 0 && (
        <div className="no-print max-w-4xl mx-auto mt-6 px-6">
          <button
            onClick={() => setShowAllAnswers(!showAllAnswers)}
            className="w-full px-4 py-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-blue-500"
          >
            {showAllAnswers ? "Hide All Answers" : "Show All Answers"}
          </button>
        </div>
      )}

      {questions &&
        questions.map((question, index) => {
          return (
            <Question
              key={index}
              question={question}
              index={index}
              showAllAnswers={showAllAnswers}
            />
          );
        })}
    </div>
  );
}
