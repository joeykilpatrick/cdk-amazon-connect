import {ConnectExistingPrompt} from "cdk-amazon-connect-resources";

export function generateQueueContactFlowContent(
    prompt: ConnectExistingPrompt,
): string {
    return JSON.stringify({
        Version: "2019-10-30",
        StartAction: "3e4fbaa3-0203-44b6-8796-eb5f61325a2c",
        Metadata: {
            entryPointPosition: {x: 40, y: 40},
            ActionMetadata: {
                "3e4fbaa3-0203-44b6-8796-eb5f61325a2c": {
                    position: {x: 200.8, y: 21.6},
                    parameters: {Messages: [null, {PromptId: {displayName: prompt.attrName}}]},
                    audio: [{
                        id: prompt.attrArn,
                        text: prompt.attrName,
                        type: "Prompt"
                    }]
                }
            },
            name: "",
            description: "",
            type: "contactFlow",
            status: "published",
            hash: {}
        },
        Actions: [{
            Parameters: {Messages: [
                {Text: "Your call is very important to us. Please stay on the line to talk to a representative."},
                {PromptId: prompt.attrArn}
            ]},
            Identifier: "3e4fbaa3-0203-44b6-8796-eb5f61325a2c",
            Type: "MessageParticipantIteratively",
            Transitions: {}
        }]
    })
}
