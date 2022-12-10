import * as CDK from 'aws-cdk-lib';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as Connect from 'aws-cdk-lib/aws-connect';
import {
    ConnectExistingPrompt,
    ConnectFlowPhoneNumber,
    ConnectQueue,
    ConnectRoutingProfile,
    ConnectSecurityProfile,
} from "cdk-amazon-connect-resources";
import {transformAndValidateSync} from "class-transformer-validator";

import {Environment} from "./environment";
import {ConnectLexBot} from './ConnectLexBot';
import {ConnectLambdaFunction} from "./ConnectLambdaFunction";
import {generateMainContactFlowContent, generateQueueContactFlowContent,} from "../contact-flow";

const environment: Environment = transformAndValidateSync(Environment, process.env);

const stackNameKebab: string = `cdk-amazon-connect-${environment.ACCOUNT_ID}`;

const app = new CDK.App();
const stack = new CDK.Stack(app, stackNameKebab, {
    env: {
        account: environment.ACCOUNT_ID,
        region: environment.REGION,
    }
});

const connectInstance = new Connect.CfnInstance(stack, 'connectInstance', {
    attributes: {
        inboundCalls: true,
        outboundCalls: false,
        contactflowLogs: true,
    },
    identityManagementType: 'CONNECT_MANAGED',
    instanceAlias: stackNameKebab,
});

const menuBot = new ConnectLexBot(stack, 'menuBot', {
    connectInstance,
    name: `${stackNameKebab}-menu`,
    autoBuildBotLocales: true,
    idleSessionTtlInSeconds: 123,
    dataPrivacy: {
        ChildDirected: false
    },
    botLocales: [{
        localeId: 'en_US',
        nluConfidenceThreshold: 0.75,
        intents: [
            {
                name: 'GetHours',
                sampleUtterances: ['get hours', 'hours', 'hours today', 'get today\'s hours'].map((utterance) => {return {utterance}})
            },
            {
                name: 'GetSpecials',
                sampleUtterances: ['get specials', 'specials', 'specials today', 'get today\'s specials'].map((utterance) => {return {utterance}}),
            },
            {
                name: 'SpeakToSomeone',
                sampleUtterances: ['transfer', 'speak to agent', 'speak to someone', 'agent'].map((utterance) => {return {utterance}}),
            },
            {
                name: 'FallbackIntent',
                parentIntentSignature: "AMAZON.FallbackIntent",
            }
        ],
    }],
});

const getTodaysHoursLambda = new ConnectLambdaFunction(stack, 'getTodaysHoursLambda', {
    connectInstance,
    handler: 'handler',
    entry: './lambda/GetTodaysHours.ts',
    functionName: `${stackNameKebab}-todays-hours`,
    runtime: Lambda.Runtime.NODEJS_18_X,
    timeout: CDK.Duration.seconds(8),
});

const getTodaysSpecialsLambda = new ConnectLambdaFunction(stack, 'getTodaysSpecialsLambda', {
    connectInstance,
    handler: 'handler',
    entry: './lambda/GetTodaysSpecials.ts',
    functionName: `${stackNameKebab}-todays-specials`,
    runtime: Lambda.Runtime.NODEJS_18_X,
    timeout: CDK.Duration.seconds(8),
});

const queueHoursOfOperation = new Connect.CfnHoursOfOperation(stack, 'queueHoursOfOperation', {
    config: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
    ].map((day) => {
        return {
            day,
            startTime: {
                hours: 9,
                minutes: 0,
            },
            endTime: {
                hours: 17,
                minutes: 0,
            },
        }
    }),
    instanceArn: connectInstance.attrArn,
    name: "QueueHoursOfOperation",
    timeZone: "America/New_York",
})

const queue = new ConnectQueue(stack, 'queue', {
    InstanceId: connectInstance.attrId,
    Name: "MainQueue",
    HoursOfOperationId: queueHoursOfOperation.ref,
    RemovalPolicy: CDK.RemovalPolicy.RETAIN,
});

const prompt = new ConnectExistingPrompt(stack, 'prompt', {
    connectInstanceId: connectInstance.attrId,
    promptName: "Music_Jazz_MyTimetoFly_Inst.wav",
})

const queueFlow = new Connect.CfnContactFlow(stack, 'queueFlow', {
    name: 'QueueFlow',
    state: 'ACTIVE',
    type: "CUSTOMER_QUEUE",
    content: generateQueueContactFlowContent(prompt),
    instanceArn: connectInstance.attrArn,
});

const mainContactFlow = new Connect.CfnContactFlow(stack, 'mainContactFlow', {
    name: 'MainFlow',
    state: 'ACTIVE',
    type: "CONTACT_FLOW",
    content: generateMainContactFlowContent(
        menuBot.lexBotAlias.attrArn,
        getTodaysHoursLambda.functionArn,
        getTodaysSpecialsLambda.functionArn,
        queue.attrArn,
        queueFlow.attrContactFlowArn,
    ),
    instanceArn: connectInstance.attrArn,
});

const connectPhoneNumber = new ConnectFlowPhoneNumber(stack, 'connectPhoneNumber', {
    type: 'DID',
    countryCode: 'US',
    connectInstance,
    contactFlow: mainContactFlow,
});

new CDK.CfnOutput(stack, 'phoneNumberOutput', {
    exportName: `${stackNameKebab}-phone-number`,
    value: connectPhoneNumber.attrAddress,
});

const routingProfile = new ConnectRoutingProfile(stack, 'routingProfile', {
    InstanceId: connectInstance.attrId,
    Name: 'DefaultRoutingProfile',
    Description: "The default routing profile.",
    DefaultOutboundQueueId: queue.attrId,
    QueueConfigs: [
        {
            Delay: 10,
            Priority: 1,
            QueueReference: {
                Channel: "VOICE",
                QueueId: queue.attrId,
            }
        },
    ],
    MediaConcurrencies: [
        {
            Channel: "VOICE",
            Concurrency: 1,
        }
    ],
    RemovalPolicy: CDK.RemovalPolicy.RETAIN,
});

const securityProfile = new ConnectSecurityProfile(stack, 'securityProfile', {
    InstanceId: connectInstance.attrId,
    SecurityProfileName: "DefaultSecurityProfile",
    Permissions: [
        "BasicAgentAccess",
        "OutboundCallAccess",
        "RoutingPolicies.View",
        "TransferDestinations.View",
        "HoursOfOperation.View",
        "Queues.View",
        "ContactFlows.View",
        "ContactFlowModules.View",
        "PhoneNumbers.View",
        "Prompts.View",
        "Users.View",
        "AgentStates.View",
        "ContactAttributes.View",
        "ContactSearch.View",
        "AgentTimeCard.View",
        "MetricsReports.View",
        "ReportSchedules.View",
        "TaskTemplates.View",
        "VoiceIdAttributesAndSearch.View"
    ]
});

new Connect.CfnUser(stack, 'Fred', {
    instanceArn: connectInstance.attrArn,
    username: "fredjones",
    password: "cHANGEmE123", // Needs 8+, one upper, one lower, one digit
    identityInfo: {
        firstName: 'Fred',
        lastName: 'Jones',
        email: 'fjones@fredsfishmarket.com'
    },
    phoneConfig: {
        phoneType: 'SOFT_PHONE',
    },
    routingProfileArn: routingProfile.attrArn,
    securityProfileArns: [
        securityProfile.attrArn
    ],
})

app.synth();
