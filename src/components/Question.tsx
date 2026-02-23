import React, { useEffect, useState } from "react";

interface QuestionProps {
  question: {
    question: string;
    choices: { key: string; value: string }[];
    answer: string | string[];
    explanation: string;
  };
  index: number;
  showAllAnswers: boolean;
}

const Question = ({ question, index, showAllAnswers }: QuestionProps) => {
  const isMultiple = Array.isArray(question.answer);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const correctAnswers: string[] = isMultiple ? question.answer as string[] : [question.answer as string];
  const isCorrect = isMultiple
    ? selectedChoices.length === correctAnswers.length &&
      correctAnswers.every((a) => selectedChoices.includes(a))
    : selectedChoice === question.answer;

  const handleSingleSelect = (choiceKey: string) => {
    setSelectedChoice(choiceKey);
    setShowExplanation(false);
  };

  const handleMultipleSelect = (choiceKey: string) => {
    setSelectedChoices((prev) =>
      prev.includes(choiceKey)
        ? prev.filter((k) => k !== choiceKey)
        : [...prev, choiceKey]
    );
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    if (isMultiple ? selectedChoices.length > 0 : selectedChoice) {
      setShowExplanation(true);
    }
  };

  useEffect(() => {
    setSelectedChoice(null);
    setSelectedChoices([]);
    setShowExplanation(false);
  }, [question]);

  useEffect(() => {
    if (showAllAnswers) {
      const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
      setSelectedChoices(correctAnswers);
      if (!isMultiple) {
        setSelectedChoice(question.answer as string);
      }
      setShowExplanation(true);
    } else {
      setSelectedChoice(null);
      setSelectedChoices([]);
      setShowExplanation(false);
    }
  }, [showAllAnswers, question.answer, isMultiple]);

  return (
    <div className="question-container max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="question-heading mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {`${index + 1}. ${question.question}`}
        </h2>
      </div>

      <div className="choices-container space-y-3">
        {question.choices.map((choice, key) => (
          <label
            key={key}
            className="choice-label flex items-start space-x-3 p-3 rounded border cursor-pointer hover:bg-gray-50"
          >
            {isMultiple ? (
              <input
                type="checkbox"
                value={choice.key}
                checked={selectedChoices.includes(choice.key)}
                onChange={() => handleMultipleSelect(choice.key)}
                className="mt-1"
              />
            ) : (
              <input
                type="radio"
                value={choice.key}
                checked={selectedChoice === choice.key}
                onChange={() => handleSingleSelect(choice.key)}
                className="mt-1"
              />
            )}
            <div>
              <span className="font-medium">{choice.key}) </span>
              <span className="break-words">{choice.value}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="button-container mt-6 space-y-4">
        <button
          onClick={handleSubmit}
          disabled={isMultiple ? selectedChoices.length === 0 : !selectedChoice}
          className="no-print w-full px-4 py-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>

        {showExplanation && (
          <div
            className={`explanation-box p-4 rounded-md ${
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
            <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
