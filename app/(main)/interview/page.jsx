import { getAssessments } from "@/actions/interview";
import React from "react";
import StatCards from "./_component/stat-cards";
import PerformanceChart from "./_component/performance-chart";
import QuizList from "./_component/quiz-list";

const interview = async () => {
  const assessment = await getAssessments();

  return (
    <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Prepration
      </h1>
      <div className="space-y-6">
        <StatCards assessment={assessment} />
        <PerformanceChart assessment={assessment} />
        <QuizList assessment={assessment} />
      </div>
    </div>
  );
};

export default interview;
