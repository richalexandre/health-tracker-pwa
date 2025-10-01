"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, Calendar, Pill, Apple } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Tracker</h1>
          <p className="text-gray-600">Your comprehensive wellness companion</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calories</span>
              <span className="font-semibold">1,847 / 2,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Time</span>
              <span className="font-semibold">45 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Weekly Progress</span>
              <span className="font-semibold">4/7 days</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/timers">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <Timer className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-base">Exercise Timers</CardTitle>
                <CardDescription className="text-xs">
                  Workout intervals & rest periods
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/calendar">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-base">Workout Calendar</CardTitle>
                <CardDescription className="text-xs">
                  Track & sync your sessions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/supplements">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <Pill className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-base">Supplements</CardTitle>
                <CardDescription className="text-xs">
                  Schedule & track intake
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/food">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <Apple className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle className="text-base">Food & Calories</CardTitle>
                <CardDescription className="text-xs">
                  Nutrition database & tracking
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="text-center pt-4">
          <Badge variant="secondary" className="text-xs">
            PWA Ready - Add to Home Screen
          </Badge>
        </div>
      </div>
    </div>
  );
}
