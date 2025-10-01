"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search, Apple } from "lucide-react";

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [todaysFoods, setTodaysFoods] = useState([
    { id: 1, name: "Greek Yogurt", calories: 150, protein: 20, carbs: 6, fat: 8, time: "08:00" },
    { id: 2, name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, time: "08:15" },
    { id: 3, name: "Chicken Breast", calories: 231, protein: 43, carbs: 0, fat: 5, time: "12:30" },
    { id: 4, name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 2, time: "12:30" },
    { id: 5, name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, time: "15:00" },
  ]);

  const totalCalories = todaysFoods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = todaysFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = todaysFoods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = todaysFoods.reduce((sum, food) => sum + food.fat, 0);

  const calorieGoal = 2200;
  const proteinGoal = 150;
  const carbGoal = 275;
  const fatGoal = 73;

  const commonFoods = [
    { name: "Oatmeal", calories: 154, protein: 5, carbs: 28, fat: 3 },
    { name: "Eggs", calories: 155, protein: 13, carbs: 1, fat: 11 },
    { name: "Avocado", calories: 234, protein: 3, carbs: 12, fat: 21 },
    { name: "Salmon", calories: 208, protein: 22, carbs: 0, fat: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center space-x-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Food & Calories</h1>
        </div>

        {/* Daily Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600 flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Today's Nutrition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calories */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm font-semibold">{totalCalories} / {calorieGoal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-blue-600">{totalProtein}g</div>
                  <div className="text-xs text-gray-500">Protein</div>
                  <div className="text-xs text-gray-400">{proteinGoal}g goal</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">{totalCarbs}g</div>
                  <div className="text-xs text-gray-500">Carbs</div>
                  <div className="text-xs text-gray-400">{carbGoal}g goal</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-yellow-600">{totalFat}g</div>
                  <div className="text-xs text-gray-500">Fat</div>
                  <div className="text-xs text-gray-400">{fatGoal}g goal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Add</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {commonFoods.map((food, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start"
                >
                  <div className="font-medium text-sm">{food.name}</div>
                  <div className="text-xs text-gray-500">{food.calories} cal</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Foods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Foods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysFoods.map((food) => (
                <div key={food.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-gray-500">
                      {food.calories} cal • P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{food.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Food Button */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6 text-center">
            <Button variant="ghost" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Log Food
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
