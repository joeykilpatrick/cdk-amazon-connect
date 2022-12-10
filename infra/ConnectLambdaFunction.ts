import * as Lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as Connect from 'aws-cdk-lib/aws-connect';
import { Construct } from 'constructs';
import { ConnectLambdaFunctionAssociation } from "cdk-amazon-connect-resources";

export class ConnectLambdaFunction extends Lambda.NodejsFunction {

    public readonly connectInstanceAssociation: ConnectLambdaFunctionAssociation;

    constructor(
        scope: Construct,
        id: string,
        props: Lambda.NodejsFunctionProps & { connectInstance: Connect.CfnInstance },
    ) {
        super(scope, id, props);

        this.connectInstanceAssociation = new ConnectLambdaFunctionAssociation(this, 'functionAssociation', {
            connectInstanceId: props.connectInstance.ref,
            functionArn: this.functionArn,
        });
    }

}
