import { Button } from '@/components/ui/button'
import { Loader2, Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { useToast } from "@/components/ui/use-toast"
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecordAnswerSection = ({ interviewQuestions, activeQuestionIndex, interviewData}) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const {user} = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((result) => (
            setUserAnswer(result?.transcript)
        ))
      }, [results])

      useEffect(() => {
        if(!isRecording && userAnswer.length > 10) {
            updateUserAnswer();
        }
      }, [userAnswer])

      const saveUserAnswer = async () => {
        if(isRecording) {
            stopSpeechToText()
            setLoading(true);
        }else {
            startSpeechToText()
        }
      }

      const updateUserAnswer = async () => {
        const feedbackPrompt=`Question: ${interviewQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Depending on this question and answer for the mock interview. Please give us rating and feedback as area of improvement if any. In just 3 to 5 lines to improve in JSON format with rating (in numeric like 1 to 10) and feedback field.`;
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResponse = (result.response?.text()).replace('```json', '').replace('```', '');
            const jsonFeedbackResponse = JSON.parse(mockJsonResponse);
            
            const resp = await db.insert(UserAnswer)
            .values({
                interviewRef: interviewData.uuid,
                question: (interviewQuestions[activeQuestionIndex])?.question,
                correctAns: (interviewQuestions[activeQuestionIndex])?.answer,
                userAns: userAnswer,
                feedback: jsonFeedbackResponse?.feedback,
                rating: jsonFeedbackResponse?.rating,
                userEmail: user.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            });

            if(resp) {
                toast({
                    title: "Success",
                    description: "Your answer is recorded successfully.",
                  })
            }
            setLoading(false);
            setUserAnswer('');
      }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-center my-10 bg-black rounded-lg p-5'>
            <WebcamIcon style={{
                height: 100,
                width: 200
            }} className='absolute text-white'/>

            <Webcam style={{height: 300, width: '100%', zIndex: 10}} mirrored={true} className='rounded-md'/>
        </div>
        {loading ? (
             <Button disabled>
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             Generating Feedback...
           </Button>
        ) : (
            <Button variant="outline" className="my-10" onClick={saveUserAnswer}>
            {isRecording ? (<><Mic /> Stop Recording...</>) : 'Start Answering'}
            </Button>
        )}
    </div>
  )
}

export default RecordAnswerSection