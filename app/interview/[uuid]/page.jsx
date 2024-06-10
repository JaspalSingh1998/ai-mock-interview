"use client";
import { db } from "@/utils/db";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { Interview } from "@/utils/schema";
import { ArrowRight, Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InterviewPage = ({ params }) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const fetchInterviewData = async () => {
    const result = await db
      .select()
      .from(Interview)
      .where(eq(Interview.uuid, params.uuid))[0];
    console.log(result);
  };
  useEffect(() => {
    fetchInterviewData();
  }, []);
  return (
    <div className="flex flex-col container mx-auto p-10">
      <h2 className="text-3xl font-bold mb-12 text-center">Start Your Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
                <p><span>Job Title: </span>Software Engineer</p>
                <p><span>Experience: </span>2 Years</p>
                <p><span>Job Description: </span>MERN Stack.</p>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb /> <strong>Information</strong></h2>
                <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
        </div>

        <div>
          {webcamEnabled ? (
            <Webcam
              mirrored={true}
              style={{ height: 300, width: 300 }}
              onUserMedia={() => setWebcamEnabled(true)}
              onError={() => setWebcamEnabled(false)}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-10 bg-secondary rounded-md shadow-sm" />
              <Button
                variant="outline"
                onClick={() => setWebcamEnabled(true)}
                className="w-full my-4"
              >
                Enable Camera & Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/interview/${params.uuid}/start`}>
            <Button className="flex gap-2">Get Started <ArrowRight /> </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewPage;
