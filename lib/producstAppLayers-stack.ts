import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

export class ProsductsAppLayersStach extends cdk.Stack {
  readonly productsLayers: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.productsLayers = new lambda.LayerVersion(
      this,
      "ProductsLayer",
      {
        code: lambda.Code.fromAsset('lambda/products/layers/productsLayer'),
        compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
        layerVersionName: "ProductsLayer",
        removalPolicy: cdk.RemovalPolicy.RETAIN
      }
    );
    new ssm.StringParameter(this, "ProductsLayerVersionArn", {
      parameterName: "productsLayerVersionArn",
      stringValue: this.productsLayers.layerVersionArn
    });
  }
}
