import { useState,useEffect } from 'react'
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
  const [code, setCode ] = useState(`//Enter your code here`)
  const [review, setReview]=useState(``)
  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode(){
  const response = await axios.post("http://localhost:4000/api/get-review",{code})
  setReview(response.data)
  }

  return (
    <>
     <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code=> setCode(code)}
            highlight={code=> prism.highlight(code, prism.languages.javascript,"javascript")}
            padding={10}
            style={{
              fontFamily: ' "Fira code", "Fira Mono" , monospace',
              fontSize:16,
              border: "1px solid #ddd",
              height: "100%",
              width:"100%"
            }}
          />
        <div onClick={reviewCode} className="review" >Review</div>
        </div>
      </div>
      <div className="right">
       <Markdown
       rehypePlugins={[rehypeHighlight]}
       >{review}</Markdown>
      </div>
     </main>
    </>
  )
}

export default App
