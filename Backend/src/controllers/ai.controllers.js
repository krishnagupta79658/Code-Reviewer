import { getReview } from "../services/ai.services.js";
 

async function handleUserInput(req,res){
    const object=req.body
    const code=object.code
    if(!code) return res.status(400).send("code is required")
   
    try {
        const response = await getReview(code);
        res.status(200).send(response)
      } catch (err) {
        res.status(500).json({ error: "Something went wrong", details: err.message });
      }
} 




export  {handleUserInput,}