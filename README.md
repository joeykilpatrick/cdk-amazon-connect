# cdk-amazon-connect
---
A complete Amazon Connect contact center described entirely with the AWS CDK.

This Contact Center consists of a small IVR and a single queue with a single agent user. The IVR has one contact flow, two Lambda Functions, and one Lex Bot.

Official [CloudFormation support](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_Connect.html) for Amazon Connect is limited and custom resources must be developed to use a pure Infrastructure as Code approach to development on the platform. Some experimental custom resource implementations are available in the package `cdk-amazon-connect-resources` and can be found on [npm](https://www.npmjs.com/package/cdk-amazon-connect-resources) and on [GitHub](https://github.com/joeykilpatrick/cdk-amazon-connect-resources).


Here are the CloudFormation resources that are provisioned:

- Connect Instance
  - `AWS::CloudFormation::Instance`
- Phone Number
  - `AWS::Connect::PhoneNumber`
  - `Custom::ConnectPhoneNumberContactFlowAssociation`
- IVR
  - `AWS::Connect::ContactFlow`
  - `Custom::ConnectExistingPrompt`
  - `AWS::Lex::Bot`
  - `AWS::Lex::BotVersion`
  - `AWS::Lex::BotAlias`
  - `Custom::ConnectLexBotAssociation`
  - `AWS::Lambda::Function`
  - `Custom::ConnectLambdaFunctionAssociation`
- Queue
  - `AWS::Connect::ContactFlow`
  - `AWS::Connect::HoursOfOperation`
  - `Custom::ConnectQueue`
- Agent
  - `AWS::Connect::User`
  - `Custom::ConnectRoutingProfile`
  - `Custom::ConnectSecurityProfile`

### Deploying

If you have not deployed a CDK application in your AWS account before, you will need to bootstrap the account with:

```shell
npm install --global aws-cdk
cdk bootstrap aws://YOUR_ACCOUNT_ID/YOUR_AWS_REGION
```

Then you can clone this repository and install dependencies:

```shell
git clone https://github.com/joeykilpatrick/cdk-amazon-connect.git
cd cdk-amazon-connect
npm install
```

To deploy, you need to set some environment variables for the deploy command. Replace the dummy values below with your own AWS account id and region you would like to deploy into.

On Linux and Mac:

```shell
ACCOUNT_ID=123456789012 REGION=us-east-1 npm run deploy
```

On Windows:

```shell
npm install --global cross-env
cross-env ACCOUNT_ID=123456789012 REGION=us-east-1 npm run deploy
```


This will create a CloudFormation stack with the name `cdk-amazon-connect-YOUR_ACCOUNT_ID`. Once the stack is finished creating, a CloudFormation output will be generated with the phone number provisioned for your application. You can immediately call the phone number to test your new contact center. If you would like to accept your call as an agent, you can navigate to the login page for your new Connect Instance and login as user `fredjones` with password `cHANGEmE123` to reach the Agent CCP.