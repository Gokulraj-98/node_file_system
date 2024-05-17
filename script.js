const fs = require("node:fs");
const express = require('express');
const parser = require('body-parser')
const HTTP_SERVER = express()

fs.writeFile("./Files/message.txt", "Hello this is node", "utf8", () => {
    console.log("FIle created");
})



// function readFileFromPath(fileName = "") {
//     fs.readFile(`./inbound/${fileName}`, "utf8", (err, data) => {
//         fileData.fileName = fileName
//         fileData.data = data
//         if (err) {
//             console.log(err)
//         } else {
//             // console.log(fileData)
//         }
//     })
// }


const currentTimestamp = Date.now();
console.log(currentTimestamp);
const currentDate = new Date();
console.log(currentDate.getFullYear())

// const currentDate = new Date();

// Format date and time to create a file name
const fileName = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}_${currentDate.getHours().toString().padStart(2, '0')}-${currentDate.getMinutes().toString().padStart(2, '0')}-${currentDate.getSeconds().toString().padStart(2, '0')}.txt`;

// Create file with the date and time as file name
fs.writeFile(`./inbound/${fileName}`, `${currentTimestamp}`, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log(`File ${fileName} created successfully!`);
});

HTTP_SERVER.get("/get-files", (req, res, next) => {


    fs.readdir('./inbound', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read the folder' });
        }
        res.json(files);
    });


})




const port = 3000
const HOSTNAME = "localhost"

HTTP_SERVER.listen(port, HOSTNAME, 1, () => {
    console.log(`App started at http://${HOSTNAME}:${port}`)
})

//Middleware injection
HTTP_SERVER.use(parser.json())

//Route Injection
HTTP_SERVER.use("/api/task", require("./Modules/Tasks/TasksController"))


