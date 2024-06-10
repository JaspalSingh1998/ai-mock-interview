'use client';
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSections from './_components/QuestionSections';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';

const StartInterviewPage = ({params}) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestions, setInterviewQuestions] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const fetchInterviewData = async () => {
    const result = await db
      .select()
      .from(Interview)
      .where(eq(Interview.uuid, params.uuid));
    const jsonMockResp = await (result[0].TailoredInterviewData);
    setInterviewQuestions(JSON.parse(jsonMockResp));
    setInterviewData(result[0]);
  };
  useEffect(() => {
    fetchInterviewData();
  }, []);


  return (
    <div>
      <div className="grid-cols-1 gap-10 grid md:grid-cols-2">
        <QuestionSections interviewQuestions={interviewQuestions} activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswerSection  interviewQuestions={interviewQuestions} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex  != interviewQuestions?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
        {activeQuestionIndex === interviewQuestions?.length - 1 && <Button>End Interview</Button>}
      </div>
    </div>
  )
}

export default StartInterviewPage