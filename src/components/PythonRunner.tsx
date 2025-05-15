'use client';
import { useEffect, useState } from 'react';

interface PythonRunnerProps {
  code?: string;
}

export default function PythonRunner({ code: initialCode = 'print("Hello from Python!")' }: PythonRunnerProps) {
  const [pyodide, setPyodide] = useState<any>(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
        script.onload = async () => {
          console.log('Pyodide script loaded');
          const py = await (window as any).loadPyodide();
          await py.loadPackage(['numpy', 'pandas', 'matplotlib', 'scipy']);
          console.log('Pyodide initialized successfully');
          setPyodide(py);
          setLoading(false);
        };
        document.body.appendChild(script);
      } catch (err) {
        console.error('Error loading Pyodide:', err);
        setOutput('Failed to load Pyodide. Check console for details.');
        setLoading(false);
      }
    };

    if (!(window as any).loadPyodide) {
      loadPyodide();
    } else {
      (window as any).loadPyodide().then((py: any) => {
        console.log('Pyodide already loaded');
        setPyodide(py);
        setLoading(false);
      });
    }
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide is not ready yet.');
      return;
    }

    try {
      console.log('Executing Python code:', code);
      setOutput('Running...');

      pyodide.runPython(`
import sys
import io
from js import document
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt

class OutputCapture:
    def __init__(self):
        self.output = ""
    def write(self, content):
        self.output += content
    def flush(self):
        pass

sys.stdout = OutputCapture()
sys.stderr = OutputCapture()

# Clear previous images
output_div = document.getElementById("py-output")
while output_div.firstChild:
    output_div.removeChild(output_div.firstChild)

# Patch matplotlib to display inline in output_div
def show_inline():
    import base64
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_data = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    img = document.createElement("img")
    img.src = "data:image/png;base64," + img_data
    output_div.appendChild(img)
    plt.close()

plt.show = show_inline
      `);

      await pyodide.runPythonAsync(code);

      const capturedOutput = pyodide.runPython('sys.stdout.output');
      setOutput(capturedOutput ?? 'No output');
    } catch (err: any) {
      console.error('Error executing Python code:', err);
      setOutput(`Error: ${err.toString()}`);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm mt-3 mb-3">
      <textarea
        className="w-full font-mono text-sm p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={15}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={runCode}
        className={`mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold transition-opacity duration-300
        ${loading ? 'invisible cursor-not-allowed opacity-50' : 'visible cursor-pointer'}`}
        disabled={loading}
      >
        {loading ? 'Loading Pyodide...' : 'Run Code'}
      </button>

      {/* Text output */}
      <pre className="mt-4 p-4 min-h-[50px] whitespace-pre-wrap bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-300 text-sm font-mono overflow-x-auto">
        {output}
      </pre>

      {/* Image output */}
      <div
        id="py-output"
        className="mt-4 p-4 bg-white border border-gray-300 rounded shadow-md"
      ></div>
    </div>
  );
}
