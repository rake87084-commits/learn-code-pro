import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Star, Trophy, Clock, CheckCircle } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  estimatedTime: number;
  completed: boolean;
  points: number;
}

const sampleExercises: Exercise[] = [
  {
    id: "1",
    title: "Hello World Function",
    description: "Create a function that returns 'Hello, World!' when called",
    difficulty: "beginner",
    category: "Functions",
    estimatedTime: 5,
    completed: true,
    points: 10
  },
  {
    id: "2", 
    title: "Array Manipulation",
    description: "Implement functions to filter, map, and reduce arrays",
    difficulty: "intermediate",
    category: "Arrays",
    estimatedTime: 15,
    completed: false,
    points: 25
  },
  {
    id: "3",
    title: "Promise Chain",
    description: "Create a chain of promises to handle asynchronous operations",
    difficulty: "advanced",
    category: "Async",
    estimatedTime: 30,
    completed: false,
    points: 50
  },
  {
    id: "4",
    title: "Object Destructuring",
    description: "Practice destructuring objects and arrays in different scenarios",
    difficulty: "intermediate",
    category: "ES6+",
    estimatedTime: 20,
    completed: true,
    points: 30
  }
];

interface ExerciseDashboardProps {
  onSelectExercise?: (exercise: Exercise) => void;
}

export const ExerciseDashboard = ({ onSelectExercise }: ExerciseDashboardProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const categories = ["all", ...Array.from(new Set(sampleExercises.map(ex => ex.category)))];
  const difficulties = ["all", "beginner", "intermediate", "advanced"];
  
  const filteredExercises = sampleExercises.filter(exercise => {
    const categoryMatch = selectedCategory === "all" || exercise.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const completedCount = sampleExercises.filter(ex => ex.completed).length;
  const totalPoints = sampleExercises.filter(ex => ex.completed).reduce((sum, ex) => sum + ex.points, 0);
  const progressPercentage = (completedCount / sampleExercises.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success";
      case "intermediate": return "bg-warning";
      case "advanced": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{completedCount}/{sampleExercises.length}</div>
              <div className="text-sm opacity-90">Exercises Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm opacity-90">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-sm opacity-90">Overall Progress</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="mt-4" />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Practice Exercises
          </CardTitle>
          <CardDescription>
            Choose exercises based on your skill level and interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map(exercise => (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          className={`${getDifficultyColor(exercise.difficulty)} text-white`}
                        >
                          {exercise.difficulty}
                        </Badge>
                        <Badge variant="outline">{exercise.category}</Badge>
                      </div>
                    </div>
                    {exercise.completed && (
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {exercise.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exercise.estimatedTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {exercise.points} points
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={exercise.completed ? "outline" : "default"}
                    onClick={() => onSelectExercise?.(exercise)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {exercise.completed ? "Review" : "Start Exercise"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};