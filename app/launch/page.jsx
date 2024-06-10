"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModel";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment/moment";
import { Interview } from "@/utils/schema";
import { useRouter } from "next/navigation";

const Launch = () => {
  const [title, setTitle] = useState("");
  const [yoe, setYoe] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [jsonResponse, setJsonResponse] = useState(null);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setDisabled(true);
    if (yoe !== '' && title !== '' && description !== '') {
      setDisabled(false);
    }
  }, [title, yoe, description]);

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job Title: ${title}
    Years of Experience: ${yoe}
    Job Description: ${description}.
    Based on the above information, could you please generate 4 technical questions and answers in JSON format for my mock interview.
    `;

    const result = await chatSession.sendMessage(inputPrompt);
    const mockJsonResponse = (result.response?.text()).replace('```json', '').replace('```', '');
    console.log(mockJsonResponse);
    const parsedJsonResponse = JSON.parse(mockJsonResponse);
    console.log(mockJsonResponse);
    setJsonResponse(parsedJsonResponse);

    if (parsedJsonResponse) {
      try {
        const resp = await db.insert(Interview).values({
          uuid: uuidv4(),
          TailoredInterviewData: mockJsonResponse,
          position: title,
          description: description,
          experience: yoe,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('YYYY-MM-DD')
        }).returning({ uuid: Interview.uuid });
        setDescription('');
        setTitle('');
        setYoe('');
        router.push(`/interview/${resp[0].uuid}`);
      } catch (error) {
        console.error('Error inserting into database:', error);
      }
    }

    setLoading(false);
  };

  return (
    <section className="min-h-full flex flex-col items-center mt-20">
      <h1 className="text-5xl font-bold mb-10">Enter Job Details</h1>
      <div className="flex flex-col gap-10">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="job">Job Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="job"
            placeholder="Software Engineer | Data Analyst | QA"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="yoe">Years Of Experience</Label>
          <Input
            type="number"
            id="yoe"
            placeholder="1"
            min="0"
            value={yoe}
            onChange={(e) => setYoe(e.target.value)}
          />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="message-2">Job Description</Label>
          <Textarea
            placeholder="Paste job description here."
            id="message-2"
            className="h-24 min-h-[100px]"
            style={{ height: 250 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your job description will be used to tailor the interview questions
            for you.
          </p>
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Tailoring Questions...
          </Button>
        ) : (
          <Button disabled={disabled} onClick={handleGenerateQuestions}>Generate Questions</Button>
        )}
      </div>
    </section>
  );
};

export default Launch;
