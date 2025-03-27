"use client";
import { generateAIQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./quiz-results";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const {
    loading: generatingQuiz,
    fn: generateQuizFn, // tis will trigger generateAIQuiz api
    data: quizData,
  } = useFetch(generateAIQuiz);

  const {
    loading: savingQuiz,
    fn: saveQuizFn, // this will trigger the saveQuizResult API
    data: saveQuizData,
    setData: setQuizData,
  } = useFetch(saveQuizResult);

  // log to see quiz result
  // console.log("result : ", saveQuizData);

  useEffect(() => {
    if (quizData) {
      setAnswer(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (ans) => {
    const newAnswer = [...answer];
    newAnswer[currentQuestion] = ans;
    setAnswer(newAnswer);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };
  const calculateScore = () => {
    let correct = 0;
    answer.forEach((ans, index) => {
      if (ans === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();

    try {
      await saveQuizFn(quizData, answer, score);
      toast.success("Quiz Completed");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setShowExplanation(false);
    setAnswer([]);
    generateQuizFn();
    setQuizData(null);
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }
  if (saveQuizData) {
    return (
      <div className="mx-2">
        <QuizResult result={saveQuizData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 ">
        <CardHeader>
          <CardTitle>🎯 Think you’re ready to outsmart the ordinary?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            🧐 Expect twists, turns, and a sprinkle of trickiness. No
            pressure—just pure, brain-boosting fun!
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Now
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion]; // quizdata gives array of question

  return (
    <div>
      <Card className="mx-2 ">
        <CardHeader>
          <CardTitle>
            {/* Output : 1 Of 5 */}
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{question.question}</p>
          <RadioGroup
            className="space-y-2"
            onValueChange={handleAnswer}
            value={answer[currentQuestion]}
          >
            {question.options.map((option, index) => {
              return (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              );
            })}
          </RadioGroup>
          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium">Explanation</p>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              varient="outline"
              disabled={!answer[currentQuestion]}
            >
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="ml-auto"
            disabled={!answer[currentQuestion] || savingQuiz}
          >
            {savingQuiz && (
              <BarLoader className="mt-4" width={"100%"} color="gray" />
            )}
            {currentQuestion < quizData.length - 1 ? "Next" : "Finish Quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
