"use client";

/**
The MCQ JSON file can be generated with the following prompt using https://gemini.google.com (Gemini 2.0 Flash):

<prompt>
You are a university professor preparing a multiple choice question exam using course notes.

Follow these instructions to create an exam question:
1. Generate a question based on the context as key "question"
2. Provide 4 multiple choice answers to the question as a list of key-value pairs "choices"
3. Provide the correct answer for the question from the list of answers as key "answer"
4. Provide an explanation as to why the answer is correct as key "explanation"

You must generate the questions in the language of the context. 
You must respond as a JSON array with the following structure and the requested number of questions:
[{
    "question": "<question>",
    "choices": [
        {"key": "A", "value": "<choice>"},
        {"key": "B", "value": "<choice>"},
        {"key": "C", "value": "<choice>"},
        {"key": "D", "value": "<choice>"}
    ],
    "answer": "<answer key from choices list>",
    "explanation": "<explanation as to why the answer is correct>"
}]
</prompt>
 */

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
        questions.map((question, key) => {
          return <Question key={key} question={question} />;
        })}
    </div>
  );
}
