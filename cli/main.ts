import { CustomAlgorithm } from "./models/algorithm.ts";
import { Token } from "./models/token.ts";

// TODO: Implement cli interface

function main() {
  const algorithm: string | null = localStorage.getItem("algorithm");
  let _algorithm: CustomAlgorithm;

  if (algorithm) {
    _algorithm = new CustomAlgorithm(algorithm);
    console.log(`Found algorithm: ${_algorithm.algorithm}`);
  } else {
    _algorithm = new CustomAlgorithm(
      prompt("Please enter your algorithm:") as string,
    );
    localStorage.setItem("algorithm", _algorithm.algorithm);
    console.log("Algorithm saved!");
  }
  try {
    const parsedTokens: Token[] = _algorithm.getParsedTokens();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    Deno.exit(1);
  }
  let masterPassword: string | null = localStorage.getItem("masterPassword");
  if (masterPassword) {
    console.log(`Found master password: ${masterPassword}`);
  } else {
    console.log(`No master password found`);
    masterPassword = prompt("Master password:");
    localStorage.setItem("masterPassword", masterPassword as string);
  }
}

// main();

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    // The native HTTP server uses the web standard `Request` and `Response`
    // objects.
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get(
        "user-agent",
      ) ?? "Unknown"
    }`;
    // The requestEvent's `.respondWith()` method is how we send the response
    // back to the client.
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );
  }
}
