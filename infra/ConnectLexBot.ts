import * as crypto from 'crypto';
import * as CDK from 'aws-cdk-lib';
import * as IAM from 'aws-cdk-lib/aws-iam';
import * as Lex from 'aws-cdk-lib/aws-lex';
import * as Connect from 'aws-cdk-lib/aws-connect';
import { ConnectLexBotAssociation } from "cdk-amazon-connect-resources";
import { Construct } from 'constructs';

export class ConnectLexBot extends CDK.Resource {

    // TODO This role should be able to be shared across bots
    private readonly lexRuntimeRole: IAM.Role;

    public readonly lexBot: Lex.CfnBot;
    public readonly lexBotVersion: Lex.CfnBotVersion;
    public readonly lexBotAlias: Lex.CfnBotAlias;
    public readonly lexBotAssociation: ConnectLexBotAssociation;

    constructor(
        scope: Construct,
        id: string,
        props: Omit<Lex.CfnBotProps, 'roleArn'> & {
            connectInstance: Connect.CfnInstance,
        },
    ) {
        super(scope, id);

        this.lexRuntimeRole = new IAM.Role(this, "LexRuntimeRole", {
            roleName: `${props.name}-runtime-role`,
            assumedBy: new IAM.ServicePrincipal("lexv2.amazonaws.com"),
        });
        this.lexRuntimeRole.addToPolicy(
            new IAM.PolicyStatement({
                actions: [
                    "polly:SynthesizeSpeech",
                    "comprehend:DetectSentiment",
                    "lambda:invokeFunction",
                ],
                effect: IAM.Effect.ALLOW,
                resources: ["*"],
            })
        );

        this.lexBot = new Lex.CfnBot(this, 'lexBot', {
            roleArn: this.lexRuntimeRole.roleArn,
            ...props,
        });

        /*
            If there are any changes to the bot, then we want to
            change the resource ID of the version here so that a new
            version is always created. The bot alias will always
            point to this new version.
         */
        const propsToHash: object = {
            ...props,
            connectInstance: undefined,
        }
        const propsHash = crypto.createHash('md5').update(JSON.stringify(propsToHash)).digest('hex').slice(0, 6);

        this.lexBotVersion = new Lex.CfnBotVersion(this, `lexBotVersion-${propsHash}`, {
            botId: this.lexBot.attrId,
            botVersionLocaleSpecification: [
                {
                    localeId: 'en_US',
                    botVersionLocaleDetails: {
                        sourceBotVersion: 'DRAFT',
                    },
                }
            ]
        });

        this.lexBotAlias = new Lex.CfnBotAlias(this, "lexBotAlias", {
            botAliasName: "LIVE",
            botId: this.lexBot.attrId,
            botVersion: this.lexBotVersion.attrBotVersion,
            botAliasLocaleSettings: [
                {
                    localeId: 'en_US',
                    botAliasLocaleSetting: {
                        codeHookSpecification: undefined,
                        enabled: true,
                    }
                },
            ],
        });

        this.lexBotAssociation = new ConnectLexBotAssociation(this, 'lexBotAssociation', {
            connectInstanceId: props.connectInstance.ref,
            lexBotAliasArn: this.lexBotAlias.attrArn,
        });
    }

}
