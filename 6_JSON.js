const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url =='/api/user'){
        const user= {
            name:"김사과",
            age:20,
            job:"개발자"
        }
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify(user))
    } else{
        res.writeHead(404)
        res.end('Not Found')
    }
})

server.listen(3000,()=>{
    console.log("서버 실행 중")
})