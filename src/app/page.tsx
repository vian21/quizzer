"use client";

import Question from "@/components/Question";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["json"];

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

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
    <div className="w-full">
      <center className="mt-8 px-2">
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </center>

      {questions.length > 0 && (
        <div className="max-w-4xl mx-auto mt-6 px-6">
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
