const express = require('express');
const port = 5000;

const app = express();
app.use(express.json());

app.get('/', (req,res)=> {
    res.send('Test');
})

function dfs ( start, end, grid){
    
    const path = []
    const visited = new Set();

    // find path 
    function findDfs (x,y){
        if ( x < 0 || x >= grid.length || y < 0 || y >= grid.length){
            return false;
        }

        path.push({x,y});
        visited.add({x,y});

        console.log("visited in DFS- ", visited)


        if ( x == end.x && y == end.y ){
            return true
        }

        // const directions = [(0,-1),(-1,0),(1,0),(0,1)]

        const directions = [{dx:0,dy:-1},{dx:-1,dy:0},{dx:0,dy:1},{dx:1,dy:0}];

        for (const {dx,dy} of directions){
            temp = Number(x) + Number(dx);
            temp2 = Number(y) + Number(dy)
            if ( dfs(temp, temp2)){
                return true
            }
        }

        path.pop()
        console.log("Path inside dfs - ", path)
        return false;

    }

    findDfs(start.x,start.y);
    console.log("Path- ",path)
    console.log("Visited - ",path)


    return path;

};

//start and end coordinates
app.post('/find-path', (req,res)=>{
    const {xstart,ystart,xend,yend} = req.body;
    const grid = Array(20).fill().map(()=> Array(20).fill(0)); 
    const start = {x:xstart,y:ystart};
    const end = {x:xend,y:yend};

    const shortestPath = dfs(start,end,grid);
    res.json({shortestPath});
})

app.listen(port, ()=> {
    console.log('Listening on localhost:5000')
} )