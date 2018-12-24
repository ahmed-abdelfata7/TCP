const tcp = require("net");
//creating tcp server
const app = tcp.createServer((socket) => {
    console.log("connection is established.......");
    //get number of connection 
    app.getConnections((error, count) => {
        console.log("Number of connection:" + count);
    });
    //get all socket information 
    console.log(`Remote Port: ${socket.remotePort}`);
    console.log(`Remote Addr: ${socket.remoteAddress}`);
    console.log(`Local Port: ${socket.localPort}`);
    console.log(`Local Addr: ${socket.localAddress}`);

    socket.on("end", () => {
        console.log("connection is terminated....");
    });
    socket.on("data", (data) => {
        console.log(`data received from tcp client is : ${data}`);
        //sendinfg data from server to client
        socket.write(`Server ACK ${data} received`);
    });

    //restrict number of client connection
    app.maxConnections = 1;
});
//start the server
//make port static
/*
app.listen(7000, () => {
    console.log("server is listening");
});
*/
//make port random
app.listen(() => {
    const port = app.address().port;
    console.log(`Server is running:${port}`);
});