"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Launch = () => {
  const [title, setTitle] = useState("");
  const [yoe, setYoe] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    setLoading(true);
    const questionData = {
        title,
        yoe,
        description,
    };
    
    try {
        const result = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });

        if (!result.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await result.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
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
            placeholder="Software Enginner | Data Analyst | QA"
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
          <Button onClick={handleGenerateQuestions}>Generate Questions</Button>
        )}
      </div>
    </section>
  );
};

export default Launch;