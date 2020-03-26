const fs = require("fs");

const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Nodejs Practice</title></head>");
        res.write(
          "<body><form action='/msg' method='POST'><input type='text' name='msg'/><button type='submit'>Send</button></form></body>"
        );
        res.write("</html>");
        return res.end();
      }
    
      if (url === "/msg" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
          console.log(chunk);
          body.push(chunk);
        });
    
        return req.on("end", () => {
          const parseBody = Buffer.concat(body).toString();
          console.log(parseBody);
          const msg = parseBody.split("=")[1];
          fs.writeFile("message.txt", msg, (err) => {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
        });
      }
    
      //   res.setHeader("Content-Type", "text/html");
      //   res.write("<html>");
      //   res.write("<head><title>Message</title></head>");
      //   res.write("<body><h1>Hello from nodejs Response</h1></body>");
      //   res.write("</html>");
      //   res.end();
}

// way 1
module.exports = requestHandler;

// way2
// module.exports = {
//     handler: requestHandler,
//     'other': "Other"
// }

// way3
// module.exports.handler = requestHandler;
// module.exports.other = "Other"; 

// way4 supported by only nodejs
// exports.handler = requestHandler;
// exports.other = "Other"; 