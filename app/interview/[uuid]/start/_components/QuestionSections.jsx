import { Lightbulb } from "lucide-react";
import React from "react";

const QuestionSections = ({ interviewQuestions, activeQuestionIndex }) => {  
  return (
    interviewQuestions && interviewQuestions.length > 0 && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {interviewQuestions?.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-center text-xs md:text-sm cursor-pointer ${
                activeQuestionIndex === index ? "bg-purple-700 text-white" : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">{(interviewQuestions[activeQuestionIndex])?.question}</h2>
        <div className="flex flex-col gap-2 p-6 rounded-lg justify-center bg-blue-100 mt-20">
          <h2 className="flex gap items-center text-purple-300">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-purple-300">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
};

export default QuestionSections;
