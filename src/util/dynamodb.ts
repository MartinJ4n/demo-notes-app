import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export default {
  //@ts-ignore
  get: (params) => client.get(params).promise(),
  //@ts-ignore
  put: (params) => client.put(params).promise(),
  //@ts-ignore
  query: (params) => client.query(params).promise(),
  //@ts-ignore
  update: (params) => client.update(params).promise(),
  //@ts-ignore
  delete: (params) => client.delete(params).promise(),
};
