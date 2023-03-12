const handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter UserName</title></head>");
    res.write(
      "<body><h1>Welcome to user page</h1><h3>Create new user</h3><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>User List</title></head>");
    res.write(
      "<body><h1>User list</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my NodeJS server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handle: handleRequest,
};
