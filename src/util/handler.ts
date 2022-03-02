import * as debug from "./debug";

//@ts-ignore
export default function handler(lambda) {
  //@ts-ignore
  return async function (event, context) {
    let body, statusCode;

    // Start debugger
    debug.init(event);

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      // Print debug messages
      debug.flush(e);
      //@ts-ignore
      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
