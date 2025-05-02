import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import prism from "prismjs"
import axios from "axios"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`//Enter your code here`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false) 

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true) 
    try {
      const response = await axios.post("http://localhost:4000/api/get-review", { code })
      setReview(response.data)
    }  catch (error) { // Catch errors to prevent unhandled rejections
      console.error("Error during code review:", error);
      setReview("Failed to get review. Please check the console for errors."); // Provide user-friendly feedback
    }finally {
      setLoading(false) 
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: ' "Fira code", "Fira Mono" , monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                height: "100%",
                width: "100%",
                overflowY: "scroll"
              }}
            />
            <div className="review">
              <span onClick={reviewCode}>Review</span>
              {loading && (
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    width: "20px",
                    height: "20px",
                    border: "3px solid #f3f3f3",
                    borderTop: "3px solid #3498db",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    verticalAlign: "middle",
                  }}
                ></span>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  )
}

export default App