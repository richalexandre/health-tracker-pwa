"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

export default function TimersPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [totalTime, setTotalTime] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const setPresetTime = (seconds: number) => {
    setIsRunning(false);
    setTimeLeft(seconds);
    setTotalTime(seconds);
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center space-x-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Timers</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-mono text-blue-600">
              {formatTime(timeLeft)}
            </CardTitle>
            <CardDescription>
              {isRunning ? "Timer Running" : "Timer Paused"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progress} className="w-full" />
            
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="w-20 h-20 rounded-full"
              >
                {isRunning ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="w-20 h-20 rounded-full"
              >
                <RotateCcw className="h-8 w-8" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setPresetTime(300)}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">5 min</div>
                  <div className="text-xs text-gray-500">Workout</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => setPresetTime(180)}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">3 min</div>
                  <div className="text-xs text-gray-500">Rest</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => setPresetTime(60)}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">1 min</div>
                  <div className="text-xs text-gray-500">Quick</div>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => setPresetTime(1800)}
                className="h-16"
              >
                <div className="text-center">
                  <div className="font-semibold">30 min</div>
                  <div className="text-xs text-gray-500">Long</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
