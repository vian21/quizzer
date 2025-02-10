import React, { useEffect, useState } from "react";

interface QuestionProps {
  question: {
    question: string;
    choices: { key: string; value: string }[];
    answer: string;
    explanation: string;
  };
  index: number;
}

const Question = ({ question, index }: QuestionProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const isCorrect = selectedChoice === question.answer;

  const handleSubmit = () => {
    if (selectedChoice) {
      setShowExplanation(true);
    }
  };

  useEffect(() => {
    setSelectedChoice(null);
    setShowExplanation(false);
  }, [question]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {`${index + 1}. ${question.question}`}
        </h2>
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, key) => (
          <label
            key={key}
            className="flex items-start space-x-3 p-3 rounded border cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              value={choice.key}
              checked={selectedChoice === choice.key}
              onChange={() => {
                setSelectedChoice(choice.key);
                setShowExplanation(false);
              }}
              className="mt-1"
            />
            <div>
              <span className="font-medium">{choice.key}) </span>
              <span>{choice.value}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedChoice}
          className="w-full px-4 py-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>

        {showExplanation && (
          <div
            className={`p-4 rounded-md ${
              isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <p
              className={`font-medium ${
                isCorrect ? "text-green-800" : "text-red-800"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect."}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {isCorrect ? question.explanation : null}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
