const express=require('express');
const app=express();
const PORT=3000;

app.use(express.json());
app.get('/hello',(req,res)=>{res.json({message:'Hello World'})});
app.post('/echo',(req,res)=>{res.json({youSent:req.body})});

app.listen(PORT,()=>{console.log(`API server running at http://localhost:${PORT}`);})

app.get('/status',(req,res)=>{const uptimeSeconds=Math.floor(process.uptime()); res.json({status:'OK',uptime:uptimeSeconds})});

app.use((err,req,res,next)=>{
    if(err instanceof SyntaxError && err.status===400 && 'body' in err){
        console.error('Bad JSON:',err);
        return res.status(400).json({error:'invalid JSON provided', 
        details:'please check request body'});}
next(err);
    }
);
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'DevOps' }
  ]);
});

