"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Clock, Check } from "lucide-react";

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState([
    { id: 1, name: "Vitamin D3", dosage: "2000 IU", time: "08:00", taken: true, frequency: "Daily" },
    { id: 2, name: "Omega-3", dosage: "1000mg", time: "08:00", taken: true, frequency: "Daily" },
    { id: 3, name: "Magnesium", dosage: "400mg", time: "20:00", taken: false, frequency: "Daily" },
    { id: 4, name: "Protein Powder", dosage: "30g", time: "Post-workout", taken: false, frequency: "As needed" },
    { id: 5, name: "Creatine", dosage: "5g", time: "Pre-workout", taken: true, frequency: "Daily" },
  ]);

  const toggleTaken = (id: number) => {
    setSupplements(prev => 
      prev.map(supp => 
        supp.id === id ? { ...supp, taken: !supp.taken } : supp
      )
    );
  };

  const takenToday = supplements.filter(s => s.taken).length;
  const totalDaily = supplements.filter(s => s.frequency === "Daily").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center space-x-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Supplements</h1>
        </div>

        {/* Daily Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-600">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Supplements Taken</span>
                <span className="font-semibold">{takenToday}/{totalDaily}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(takenToday / totalDaily) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                {takenToday === totalDaily ? "All daily supplements taken! 🎉" : `${totalDaily - takenToday} remaining`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplement List */}
        <div className="space-y-3">
          {supplements.map((supplement) => (
            <Card key={supplement.id} className={`transition-all duration-200 ${
              supplement.taken ? 'bg-green-50 border-green-200' : 'bg-white'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={supplement.taken ? "default" : "outline"}
                        size="sm"
                        className={`w-8 h-8 rounded-full p-0 ${
                          supplement.taken ? 'bg-green-600 hover:bg-green-700' : ''
                        }`}
                        onClick={() => toggleTaken(supplement.id)}
                      >
                        {supplement.taken && <Check className="h-4 w-4" />}
                      </Button>
                      <div>
                        <h3 className={`font-medium ${
                          supplement.taken ? 'text-green-800 line-through' : 'text-gray-900'
                        }`}>
                          {supplement.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{supplement.dosage}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {supplement.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={supplement.frequency === "Daily" ? "default" : "secondary"}>
                    {supplement.frequency}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Supplement */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-6 text-center">
            <Button variant="ghost" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Supplement
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Adherence Rate</span>
                <span className="font-semibold">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Days Completed</span>
                <span className="font-semibold">5/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Streak</span>
                <span className="font-semibold">3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
