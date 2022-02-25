import * as sst from "@serverless-stack/resources";
import { HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";

interface ApiStackProps extends sst.StackProps {
  table: sst.Table;
}

export default class ApiStack extends sst.Stack {
  // Public reference to the API
  public readonly api;

  constructor(scope: sst.App, id: string, props?: ApiStackProps) {
    super(scope, id, props);
    const { table } = props!;

    // Create the API
    this.api = new sst.Api(this, "Api", {
      //@ts-ignore
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
        },
      },
      cors: {
        //@ts-ignore
        allowMethods: [HttpMethod.GET],
      },
      routes: {
        "POST   /notes": "src/create.main",
        "GET    /notes/{id}": "src/get.main",
        "GET    /notes": "src/list.main",
        "PUT    /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
        "POST   /billing": "src/billing.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
