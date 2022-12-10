export function generateMainContactFlowContent(
    menuBotAliasArn: string,
    getTodaysHoursLambdaArn: string,
    getTodaysSpecialsLambdaArn: string,
    queueArn: string,
    queueFlowArn: string,
): string {
    return JSON.stringify({
        Version: "2019-10-30",
        StartAction: "248bf049-9480-4c4a-95f1-49ed147ad7ef",
        Metadata: {
            entryPointPosition: {x: 42.400000000000006, y: 64}, ActionMetadata: {
                "248bf049-9480-4c4a-95f1-49ed147ad7ef": {position: {x: 141.6, y: 66.4}},
                "92cc7bac-feac-42ac-8951-970d06aa754a": {
                    position: {x: 368, y: 68.8},
                    overrideConsoleVoice: false
                },
                "b77b5ad4-002d-46a7-8ae4-5929bcff6a4c": {position: {x: 607.2, y: 71.2}},
                "75e9df51-e74b-47b2-b7b3-38f1fa4072d1": {position: {x: 608, y: -360.8}},
                "29254ea5-f0f7-4261-8576-242dcb13b6fb": {position: {x: 987.2, y: 872.8000000000001}},
                "4fc089f7-a5d5-4aef-9f3d-15c2f8e42296": {
                    position: {x: 1291.2, y: 132},
                    parameters: {LambdaFunctionARN: {useDynamic: true}},
                    dynamicMetadata: {},
                    useDynamic: true
                },
                "0b864041-327a-4b54-b914-2d0bf707c647": {
                    position: {x: 1292, y: -79.2},
                    parameters: {LambdaFunctionARN: {useDynamic: true}},
                    dynamicMetadata: {},
                    useDynamic: true
                },
                "222aedb9-0659-4806-8524-894e7dc9dc1a": {position: {x: 1988, y: 988.8000000000001}},
                "55682850-541d-45ce-a825-b10d23215c5c": {position: {x: 1863.2, y: 376.8}},
                "ba1d7a60-3918-4873-b545-f8a9d2cce243": {
                    position: {x: 878.4000000000001, y: 71.2},
                    parameters: {LexV2Bot: {AliasArn: {useDynamic: true}}},
                    useDynamicLexBotArn: true,
                    lexV2BotName: "",
                    conditionMetadata: [{
                        id: "73987188-cbb7-464e-b0ea-7e3463a097a8",
                        operator: {name: "Equals", value: "Equals", shortDisplay: "="},
                        value: "GetHours"
                    }, {
                        id: "0de5f4d4-f188-4fcd-9169-41c3497abc2e",
                        operator: {name: "Equals", value: "Equals", shortDisplay: "="},
                        value: "GetSpecials"
                    }, {
                        id: "e53176de-bdde-427d-a664-cd008bd4d7b3",
                        operator: {name: "Equals", value: "Equals", shortDisplay: "="},
                        value: "SpeakToSomeone"
                    }]
                },
                "65bd6b0c-0518-4310-8b99-ab35767dc611": {position: {x: 1620.8000000000002, y: 945.6}},
                "81a82d5f-e971-4cab-9f5f-411bfc6f9d5b": {
                    position: {x: 1560.8000000000002, y: 331.20000000000005},
                    parameters: {QueueId: {useDynamic: true}},
                    useDynamic: true
                },
                "23dead74-22e7-4b5b-8671-48ad07bb03bb": {
                    position: {x: 1291.2, y: 336.8},
                    parameters: {EventHooks: {CustomerQueue: {useDynamic: true}}},
                    useDynamic: true,
                    customerOrAgent: true
                },
                "a7e9a996-eaac-4dd3-83ec-3a111cc6ea7b": {position: {x: 2435.2000000000003, y: -468}},
                "988dd7ba-34d5-40a7-85f5-0e4212e8483e": {position: {x: 1276.8000000000002, y: 552.8000000000001}},
                "bcff4df5-ba11-4124-839c-6ad80f71fa4c": {
                    position: {x: 1559.2, y: -80},
                    parameters: {Text: {useDynamic: true}},
                    useDynamic: true
                },
                "5fc3cc16-55c1-48cf-a375-1e1a397fed55": {
                    position: {x: 1561.6000000000001, y: 134.4},
                    parameters: {Text: {useDynamic: true}},
                    useDynamic: true
                },
                "baba2a81-c617-45f4-badb-3d00008a55ba": {position: {x: 2304.8, y: 380.8}},
                "63beaa7f-e599-4a0a-9c63-58d2d7121ebb": {position: {x: 2721.6000000000004, y: 629.6}}
            }, name: "Test", description: "", type: "contactFlow", status: "published", hash: {}
        },
        Actions: [{
            Parameters: {FlowLoggingBehavior: "Enabled"},
            Identifier: "248bf049-9480-4c4a-95f1-49ed147ad7ef",
            Type: "UpdateFlowLoggingBehavior",
            Transitions: {NextAction: "92cc7bac-feac-42ac-8951-970d06aa754a"}
        }, {
            Parameters: {TextToSpeechVoice: "Matthew"},
            Identifier: "92cc7bac-feac-42ac-8951-970d06aa754a",
            Type: "UpdateContactTextToSpeechVoice",
            Transitions: {NextAction: "b77b5ad4-002d-46a7-8ae4-5929bcff6a4c"}
        }, {
            Parameters: {Text: "Thanks for calling Fred's Fish Market. We sell the highest quality fish in the New York City area."},
            Identifier: "b77b5ad4-002d-46a7-8ae4-5929bcff6a4c",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "ba1d7a60-3918-4873-b545-f8a9d2cce243",
                Errors: [{NextAction: "29254ea5-f0f7-4261-8576-242dcb13b6fb", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {LoopCount: "0"},
            Identifier: "75e9df51-e74b-47b2-b7b3-38f1fa4072d1",
            Type: "Loop",
            Transitions: {
                NextAction: "ba1d7a60-3918-4873-b545-f8a9d2cce243",
                Conditions: [{
                    NextAction: "ba1d7a60-3918-4873-b545-f8a9d2cce243",
                    Condition: {Operator: "Equals", Operands: ["ContinueLooping"]}
                }, {
                    NextAction: "ba1d7a60-3918-4873-b545-f8a9d2cce243",
                    Condition: {Operator: "Equals", Operands: ["DoneLooping"]}
                }]
            }
        }, {
            Parameters: {LoopCount: "0"},
            Identifier: "29254ea5-f0f7-4261-8576-242dcb13b6fb",
            Type: "Loop",
            Transitions: {
                NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611",
                Conditions: [{
                    NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611",
                    Condition: {Operator: "Equals", Operands: ["ContinueLooping"]}
                }, {
                    NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611",
                    Condition: {Operator: "Equals", Operands: ["DoneLooping"]}
                }]
            }
        }, {
            Parameters: {LambdaFunctionARN: getTodaysSpecialsLambdaArn, InvocationTimeLimitSeconds: "3"},
            Identifier: "4fc089f7-a5d5-4aef-9f3d-15c2f8e42296",
            Type: "InvokeLambdaFunction",
            Transitions: {
                NextAction: "5fc3cc16-55c1-48cf-a375-1e1a397fed55",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {LambdaFunctionARN: getTodaysHoursLambdaArn, InvocationTimeLimitSeconds: "3"},
            Identifier: "0b864041-327a-4b54-b914-2d0bf707c647",
            Type: "InvokeLambdaFunction",
            Transitions: {
                NextAction: "bcff4df5-ba11-4124-839c-6ad80f71fa4c",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {},
            Identifier: "222aedb9-0659-4806-8524-894e7dc9dc1a",
            Type: "DisconnectParticipant",
            Transitions: {}
        }, {
            Parameters: {},
            Identifier: "55682850-541d-45ce-a825-b10d23215c5c",
            Type: "TransferContactToQueue",
            Transitions: {
                NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611",
                Errors: [{
                    NextAction: "baba2a81-c617-45f4-badb-3d00008a55ba",
                    ErrorType: "QueueAtCapacity"
                }, {NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {
                Text: "What would you like to do? You can say things like \"Today's Hours\", or \"Today's Specials\", or \"Speak to someone\".",
                LexV2Bot: {AliasArn: menuBotAliasArn}
            },
            Identifier: "ba1d7a60-3918-4873-b545-f8a9d2cce243",
            Type: "ConnectParticipantWithLexBot",
            Transitions: {
                NextAction: "29254ea5-f0f7-4261-8576-242dcb13b6fb",
                Conditions: [{
                    NextAction: "0b864041-327a-4b54-b914-2d0bf707c647",
                    Condition: {Operator: "Equals", Operands: ["GetHours"]}
                }, {
                    NextAction: "4fc089f7-a5d5-4aef-9f3d-15c2f8e42296",
                    Condition: {Operator: "Equals", Operands: ["GetSpecials"]}
                }, {
                    NextAction: "23dead74-22e7-4b5b-8671-48ad07bb03bb",
                    Condition: {Operator: "Equals", Operands: ["SpeakToSomeone"]}
                }],
                Errors: [{
                    NextAction: "988dd7ba-34d5-40a7-85f5-0e4212e8483e",
                    ErrorType: "NoMatchingCondition"
                }, {NextAction: "29254ea5-f0f7-4261-8576-242dcb13b6fb", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {Text: "Sorry, there has been an error. The call will now end."},
            Identifier: "65bd6b0c-0518-4310-8b99-ab35767dc611",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "222aedb9-0659-4806-8524-894e7dc9dc1a",
                Errors: [{NextAction: "222aedb9-0659-4806-8524-894e7dc9dc1a", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {QueueId: queueArn},
            Identifier: "81a82d5f-e971-4cab-9f5f-411bfc6f9d5b",
            Type: "UpdateContactTargetQueue",
            Transitions: {
                NextAction: "55682850-541d-45ce-a825-b10d23215c5c",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {EventHooks: {CustomerQueue: queueFlowArn}},
            Identifier: "23dead74-22e7-4b5b-8671-48ad07bb03bb",
            Type: "UpdateContactEventHooks",
            Transitions: {
                NextAction: "81a82d5f-e971-4cab-9f5f-411bfc6f9d5b",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {LoopCount: "3"},
            Identifier: "a7e9a996-eaac-4dd3-83ec-3a111cc6ea7b",
            Type: "Loop",
            Transitions: {
                NextAction: "75e9df51-e74b-47b2-b7b3-38f1fa4072d1",
                Conditions: [{
                    NextAction: "75e9df51-e74b-47b2-b7b3-38f1fa4072d1",
                    Condition: {Operator: "Equals", Operands: ["ContinueLooping"]}
                }, {
                    NextAction: "75e9df51-e74b-47b2-b7b3-38f1fa4072d1",
                    Condition: {Operator: "Equals", Operands: ["DoneLooping"]}
                }]
            }
        }, {
            Parameters: {Text: "Sorry, I didn't understand you. Let's try again."},
            Identifier: "988dd7ba-34d5-40a7-85f5-0e4212e8483e",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "63beaa7f-e599-4a0a-9c63-58d2d7121ebb",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {Text: "$.External.PROMPT"},
            Identifier: "bcff4df5-ba11-4124-839c-6ad80f71fa4c",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "63beaa7f-e599-4a0a-9c63-58d2d7121ebb",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {Text: "$.External.PROMPT"},
            Identifier: "5fc3cc16-55c1-48cf-a375-1e1a397fed55",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "63beaa7f-e599-4a0a-9c63-58d2d7121ebb",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {Text: "Sorry, it looks like our call queue is at capacity."},
            Identifier: "baba2a81-c617-45f4-badb-3d00008a55ba",
            Type: "MessageParticipant",
            Transitions: {
                NextAction: "63beaa7f-e599-4a0a-9c63-58d2d7121ebb",
                Errors: [{NextAction: "65bd6b0c-0518-4310-8b99-ab35767dc611", ErrorType: "NoMatchingError"}]
            }
        }, {
            Parameters: {LoopCount: "0"},
            Identifier: "63beaa7f-e599-4a0a-9c63-58d2d7121ebb",
            Type: "Loop",
            Transitions: {
                NextAction: "a7e9a996-eaac-4dd3-83ec-3a111cc6ea7b",
                Conditions: [{
                    NextAction: "a7e9a996-eaac-4dd3-83ec-3a111cc6ea7b",
                    Condition: {Operator: "Equals", Operands: ["ContinueLooping"]}
                }, {
                    NextAction: "a7e9a996-eaac-4dd3-83ec-3a111cc6ea7b",
                    Condition: {Operator: "Equals", Operands: ["DoneLooping"]}
                }]
            }
        }]
    })
}
