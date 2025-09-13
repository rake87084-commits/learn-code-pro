import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, Code2, CheckCircle } from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  code?: string;
  tip?: string;
  completed: boolean;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  steps: TutorialStep[];
}

const sampleTutorial: Tutorial = {
  id: "js-functions",
  title: "JavaScript Functions Masterclass",
  description: "Learn everything about JavaScript functions from basics to advanced concepts",
  category: "JavaScript Fundamentals",
  difficulty: "beginner",
  estimatedTime: 45,
  steps: [
    {
      id: 1,
      title: "Introduction to Functions",
      content: "Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.",
      code: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Calling the function
const message = greet("Alice");
console.log(message); // Output: Hello, Alice!`,
      tip: "Functions should have descriptive names that clearly indicate what they do.",
      completed: false
    },
    {
      id: 2,
      title: "Function Parameters and Arguments",
      content: "Parameters are variables listed in the function definition. Arguments are the actual values passed to the function when it's called.",
      code: `// Function with multiple parameters
function calculateArea(length, width) {
  return length * width;
}

// Calling with arguments
const area = calculateArea(5, 3);
console.log(area); // Output: 15`,
      tip: "You can have as many parameters as needed, but keep it reasonable for readability.",
      completed: false
    },
    {
      id: 3,
      title: "Return Values",
      content: "Functions can return values using the 'return' keyword. If no return statement is used, the function returns 'undefined'.",
      code: `// Function that returns a value
function add(a, b) {
  return a + b;
}

// Function without explicit return
function logMessage(message) {
  console.log(message);
  // No return statement = returns undefined
}

const sum = add(5, 3); // sum = 8
const result = logMessage("Hi"); // result = undefined`,
      tip: "Always return meaningful values from your functions when appropriate.",
      completed: false
    },
    {
      id: 4,
      title: "Arrow Functions",
      content: "Arrow functions provide a shorter syntax for writing functions and have different behavior with 'this' keyword.",
      code: `// Traditional function
function multiply(a, b) {
  return a * b;
}

// Arrow function
const multiply = (a, b) => {
  return a * b;
};

// Short arrow function (implicit return)
const multiply = (a, b) => a * b;

// Single parameter (parentheses optional)
const square = x => x * x;`,
      tip: "Use arrow functions for short, simple operations and when you need to preserve 'this' context.",
      completed: false
    }
  ]
};

interface TutorialSystemProps {
  tutorial?: Tutorial;
  onComplete?: () => void;
}

export const TutorialSystem = ({ 
  tutorial = sampleTutorial, 
  onComplete 
}: TutorialSystemProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = tutorial.steps[currentStep];
  const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, step.id]));
      setCurrentStep(currentStep + 1);
    } else {
      // Complete tutorial
      setCompletedSteps(prev => new Set([...prev, step.id]));
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

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
      {/* Tutorial Header */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{tutorial.title}</CardTitle>
              <CardDescription className="text-primary-foreground/80 mt-2">
                {tutorial.description}
              </CardDescription>
              <div className="flex items-center gap-4 mt-4">
                <Badge className={`${getDifficultyColor(tutorial.difficulty)} text-white`}>
                  {tutorial.difficulty}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {tutorial.category}
                </Badge>
                <span className="text-sm opacity-90">
                  ~{tutorial.estimatedTime} minutes
                </span>
              </div>
            </div>
            <BookOpen className="w-8 h-8 opacity-80" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentStep + 1} of {tutorial.steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {tutorial.steps.map((tutorialStep, index) => (
              <Button
                key={tutorialStep.id}
                variant={index === currentStep ? "default" : "outline"}
                size="sm"
                onClick={() => handleStepClick(index)}
                className="flex items-center gap-1"
              >
                {completedSteps.has(tutorialStep.id) && (
                  <CheckCircle className="w-3 h-3" />
                )}
                Step {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {currentStep + 1}
              </span>
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {step.content}
            </p>
            
            {step.tip && (
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-info mb-1">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground">{step.tip}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Example */}
        {step.code && (
          <Card className="bg-code border-code-border">
            <CardHeader className="bg-secondary border-b border-code-border">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code2 className="w-4 h-4" />
                Code Example
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-4 text-sm font-mono text-foreground overflow-x-auto">
                <code>{step.code}</code>
              </pre>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {tutorial.steps.length}
            </span>
            
            <Button onClick={handleNext}>
              {currentStep === tutorial.steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Tutorial
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};