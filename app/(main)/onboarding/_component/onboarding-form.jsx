"use client";

import { userSchema } from "@/app/lib/zodSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { set } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const router = useRouter;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className={"w-full max-w-lg mt-10 mx-2"}>
        <CardHeader>
          <CardTitle className="gradient-title text-2xl justify-center ">
            🔥 Level Up Your Profile Game!
          </CardTitle>
          <CardDescription className=" ml-2">
            🚀 Choose Your Industry & Let the Insights Roll In!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className="w-[180px]">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem key={ind.id} value={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialzation</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="SubIndustry" className="w-[180px]">
                    <SelectValue placeholder="Choose your Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-red-500">{errors.subIndustry.message}</p>
                )}
              </div>
            )}
            {/* // Add experience fields here */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <input
                type="number"
                placeholder="Experience in Years"
                {...register("experience")}
                min={0}
                max={40}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.experience && (
                <p className="text-red-500">{errors.experience.message}</p>
              )}
            </div>
            {/* Add Skills field */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <input
                id="skills"
                placeholder="Add your Skills"
                {...register("skills")}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-red-500">{errors.skills.message}</p>
              )}
            </div>
            {/* Add Bio field */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                {...register("bio")}
                className="h-32 border border-gray-300 rounded-md"
              />

              {errors.bio && (
                <p className="text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" className={"w-full"}>
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
