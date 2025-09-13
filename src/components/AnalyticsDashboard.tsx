import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  TrendingUp, 
  Code, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Brain,
  Zap
} from "lucide-react";

const codeQualityData = [
  { metric: "Syntax", score: 85, maxScore: 100 },
  { metric: "Style", score: 78, maxScore: 100 },
  { metric: "Performance", score: 92, maxScore: 100 },
  { metric: "Security", score: 88, maxScore: 100 },
  { metric: "Maintainability", score: 82, maxScore: 100 },
];

const skillProgressData = [
  { skill: "Functions", progress: 85, level: "Advanced" },
  { skill: "Arrays", progress: 70, level: "Intermediate" },
  { skill: "Objects", progress: 60, level: "Intermediate" },
  { skill: "Async/Await", progress: 45, level: "Beginner" },
  { skill: "ES6+", progress: 55, level: "Intermediate" },
];

const weeklyActivityData = [
  { day: "Mon", exercises: 3, time: 45 },
  { day: "Tue", exercises: 5, time: 60 },
  { day: "Wed", exercises: 2, time: 30 },
  { day: "Thu", exercises: 4, time: 55 },
  { day: "Fri", exercises: 6, time: 75 },
  { day: "Sat", exercises: 3, time: 40 },
  { day: "Sun", exercises: 1, time: 20 },
];

const errorTypeData = [
  { name: "Syntax Errors", value: 35, color: "#ef4444" },
  { name: "Logic Errors", value: 28, color: "#f97316" },
  { name: "Runtime Errors", value: 22, color: "#eab308" },
  { name: "Style Issues", value: 15, color: "#06b6d4" },
];

export const AnalyticsDashboard = () => {
  const totalExercises = 24;
  const completedExercises = 18;
  const currentStreak = 7;
  const totalCodeLines = 1247;
  const averageScore = 82;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((completedExercises/totalExercises)*100)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedExercises} of {totalExercises} exercises
            </p>
            <Progress value={(completedExercises/totalExercises)*100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Zap className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              days in a row
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lines of Code</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCodeLines.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +127 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Brain className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>
              Your coding activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="exercises" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Analysis
            </CardTitle>
            <CardDescription>
              Distribution of error types in your code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={errorTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {errorTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {errorTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Skill Progress
          </CardTitle>
          <CardDescription>
            Your progress across different programming concepts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgressData.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.skill}</span>
                    <Badge 
                      variant="outline"
                      className={
                        skill.level === "Advanced" ? "border-success text-success" :
                        skill.level === "Intermediate" ? "border-warning text-warning" :
                        "border-muted-foreground text-muted-foreground"
                      }
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Quality Metrics
          </CardTitle>
          <CardDescription>
            Analysis of your code quality across different dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={codeQualityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="metric" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};