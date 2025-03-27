import React from "react";
import ResumeBuilder from "./_component/resume-builder";
import { getResume } from "@/actions/resume";

const Resume = async () => {
  const resume = await getResume();
  //console.log("initialcontent: ", resume?.content);
  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
};

export default Resume;
