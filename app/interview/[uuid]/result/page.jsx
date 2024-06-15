"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import BarChart from "@/components/BarChart";
import StarIcon from "@/components/StartIcon";
import { CalculateStars } from "@/utils/CalculateStars";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Result = ({params}) => {
  const [result, setResult] = useState();
  const fetchResult = async () => {
    const data = await db
      .select()
      .from(UserAnswer)
      .where(
        eq(UserAnswer.interviewRef,params.uuid)
      );
    setResult(data);
  };

  useEffect(() => {
    fetchResult();
  }, []);

  if(result?.length <= 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-6xl">We don't have any result with that identifier.</h1>
        <Button className="mt-20">
          <Link href="/launch">Go Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto p-6 md:p-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Congratulations!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          You have completed the AI interview assessment.
        </p>
      </div>
      <div className="grid gap-6">
        {result?.map((res, i) => {
          const { filledStars, emptyStars } = CalculateStars(res?.rating || 0);
          return (
            <Card
              key={res?.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg"
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-50">
                  Question {i + 1}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {res?.question}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">
                    Feedback
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {res?.feedback}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">
                    Rating
                  </h3>
                  <div className="flex gap-1 text-yellow-500">
                    {Array(filledStars)
                      .fill(0)
                      .map((_, index) => (
                        <StarIcon key={index} className="w-5 h-5" />
                      ))}
                    {Array(emptyStars)
                      .fill(0)
                      .map((_, index) => (
                        <StarIcon
                          key={index + filledStars}
                          className="w-5 h-5 text-gray-300 dark:text-gray-600"
                        />
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <BarChart result={result} />
      </div>
    </div>
  );
};

export default Result;
