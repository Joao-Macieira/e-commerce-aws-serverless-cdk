#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppStack } from '../lib/productsApp-stack';

const app = new cdk.App();
const env: cdk.Environment = {
  account: process.env.ACCOUNT_ID,
  region: process.env.AWS_REGION,
};

const tags = {
  cost: "ECommerce",
  team: "SiecolaStudyTeam"
};

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags,
  env,
});

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags,
  env,
});

eCommerceApiStack.addDependency(productsAppStack);
