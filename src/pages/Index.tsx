import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  BookOpen, 
  BarChart3, 
  PlayCircle, 
  User, 
  Menu,
  Sparkles,
  Trophy,
  Target
} from "lucide-react";
import { CodeEditor } from "@/components/CodeEditor";
import { ExerciseDashboard } from "@/components/ExerciseDashboard";
import { TutorialSystem } from "@/components/TutorialSystem";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
    setActiveTab("code");
    toast.success(`Starting: ${exercise.title}`);
  };

  const handleTutorialComplete = () => {
    toast.success("Tutorial completed! Great job!");
    setActiveTab("analytics");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CodeMaster</h1>
                <p className="text-sm text-muted-foreground">Interactive Programming Education</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                <Trophy className="w-3 h-3 mr-1" />
                Level 3 Coder
              </Badge>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Master Programming Through Practice
          </h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Interactive coding environment with real-time analysis, debugging assistance, 
            and personalized learning paths to accelerate your programming journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Real-time Code Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-success" />
              <span>Interactive Exercises</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-info" />
              <span>Step-by-step Tutorials</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Code Editor</span>
              <span className="sm:hidden">Code</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Exercises</span>
              <span className="sm:hidden">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Tutorials</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-4 animate-slide-up">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2">Interactive Code Editor</h3>
              <p className="text-muted-foreground">
                Write, test, and debug your code with real-time analysis and suggestions.
                {selectedExercise && (
                  <span className="ml-2 text-primary font-medium">
                    Working on: {selectedExercise.title}
                  </span>
                )}
              </p>
            </div>
            <CodeEditor />
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4 animate-slide-up">
            <ExerciseDashboard onSelectExercise={handleExerciseSelect} />
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-4 animate-slide-up">
            <TutorialSystem onComplete={handleTutorialComplete} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 animate-slide-up">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Learning Analytics</h3>
              <p className="text-muted-foreground">
                Track your progress, identify strengths, and discover areas for improvement.
              </p>
            </div>
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 CodeMaster - Interactive Programming Education Platform</p>
            <p className="mt-2">Built with React, TypeScript, and modern web technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
