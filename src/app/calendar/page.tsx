"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample workout data
  const workouts = [
    { date: "2024-10-01", type: "Cardio", duration: 45, completed: true },
    { date: "2024-10-02", type: "Strength", duration: 60, completed: true },
    { date: "2024-10-03", type: "Rest", duration: 0, completed: true },
    { date: "2024-10-04", type: "Yoga", duration: 30, completed: false },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const getWorkoutForDate = (dateString: string) => {
    return workouts.find(w => w.date === dateString);
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center space-x-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Workout Calendar</h1>
        </div>

        {/* Calendar Header */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-green-600">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="h-10"></div>;
                }
                
                const dateString = formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                const workout = getWorkoutForDate(dateString);
                const isToday = new Date().toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toDateString();
                
                return (
                  <div
                    key={day}
                    className={`h-10 flex items-center justify-center text-sm relative ${
                      isToday ? 'bg-green-100 rounded-full font-bold' : ''
                    }`}
                  >
                    {day}
                    {workout && (
                      <div className={`absolute bottom-0 w-2 h-2 rounded-full ${
                        workout.completed ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today&apos;s Workout */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today&apos;s Workout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Strength Training</span>
                <Badge variant="outline">60 min</Badge>
              </div>
              <div className="text-sm text-gray-600">
                Upper body focus • 3 sets • 8-12 reps
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Log Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Workouts Completed</span>
                <span className="font-semibold">4/6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Time</span>
                <span className="font-semibold">3h 15m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Streak</span>
                <span className="font-semibold">12 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
