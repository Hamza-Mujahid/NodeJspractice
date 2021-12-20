const http = require('http');

const server = http.createServer((req, res) => {
    const fs = require("fs");
    const path = require("path");


    const filepath = path.join(__dirname, "data.text")


    if (req.url === '/') {
        res.write('Hello');
        res.write(' World');
        res.end();
    } else if (req.url === '/form') {
        res.setHeader("content-Type", "text/html") //this used to tell the brwower that we want to render a html file in the server 
        res.write('<form action="/submit" method="post" ><input name ="data"  /> <input name ="data2"  /> <button>submit</button> </form>') // this is form we will render in the brower 
        res.end();

    } else if (req.url === '/submit') {
        // the below data  is different from the other upper one 
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            // console.log(data.split())
            fs.readFile(filepath, 'utf8', (err, oldData) => {
                const newData = oldData + '\n' + data; 
                fs.writeFile(filepath, newData, () => {
                    console.log("saved");
                });
                console.log(data.toString());
            })

        })
        res.write("Data Recieved")
        res.end();

    }
})

server.listen(3000);

