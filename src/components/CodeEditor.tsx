import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";

interface CodeError {
  line: number;
  message: string;
  type: "error" | "warning";
}

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  showOutput?: boolean;
}

export const CodeEditor = ({ 
  initialCode = "// Write your code here\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));", 
  language = "javascript",
  onCodeChange,
  showOutput = true 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [errors, setErrors] = useState<CodeError[]>([]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
    analyzeCode(newCode);
  };

  const analyzeCode = (codeToAnalyze: string) => {
    const detectedErrors: CodeError[] = [];
    const lines = codeToAnalyze.split('\n');
    
    lines.forEach((line, index) => {
      // Simple error detection examples
      if (line.includes('var ') && !line.includes('//')) {
        detectedErrors.push({
          line: index + 1,
          message: "Consider using 'let' or 'const' instead of 'var'",
          type: "warning"
        });
      }
      
      if (line.includes('==') && !line.includes('===')) {
        detectedErrors.push({
          line: index + 1,
          message: "Use strict equality (===) instead of loose equality (==)",
          type: "warning"
        });
      }
      
      if (line.match(/function\s+\w+\([^)]*\)\s*{/) && !line.trim().endsWith('{')) {
        detectedErrors.push({
          line: index + 1,
          message: "Missing opening brace",
          type: "error"
        });
      }
    });
    
    setErrors(detectedErrors);
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      // Simple code execution simulation
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
      };
      
      // Very basic and unsafe eval - only for demo purposes
      try {
        eval(code);
        setOutput(logs.join('\n') || 'Code executed successfully!');
        toast.success("Code executed successfully!");
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        toast.error("Execution failed");
      }
      
      console.log = originalLog;
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setErrors([]);
    toast.info("Code reset to initial state");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Code Editor */}
      <Card className="p-0 overflow-hidden bg-code border-code-border">
        <div className="bg-secondary p-3 border-b border-code-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="ml-2 text-sm text-muted-foreground">{language}.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={resetCode}>
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
            <Button size="sm" onClick={runCode} disabled={isRunning}>
              {isRunning ? (
                <Zap className="w-3 h-3 mr-1 animate-pulse" />
              ) : (
                <Play className="w-3 h-3 mr-1" />
              )}
              Run
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-96 p-4 bg-code text-foreground font-mono text-sm resize-none focus:outline-none"
            spellCheck={false}
            placeholder="Write your code here..."
          />
          
          {/* Line numbers */}
          <div className="absolute left-0 top-0 p-4 text-muted-foreground font-mono text-sm pointer-events-none select-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="h-5 leading-5">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Error indicators */}
        {errors.length > 0 && (
          <div className="border-t border-code-border p-3 bg-secondary/50">
            <div className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Code Analysis
            </div>
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <Badge variant={error.type === "error" ? "destructive" : "secondary"}>
                    Line {error.line}
                  </Badge>
                  <span className="text-muted-foreground">{error.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Output Panel */}
      {showOutput && (
        <Card className="p-0 overflow-hidden bg-code border-code-border">
          <div className="bg-secondary p-3 border-b border-code-border">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Output</span>
            </div>
          </div>
          <div className="p-4">
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap min-h-[300px]">
              {output || "Run your code to see output here..."}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};