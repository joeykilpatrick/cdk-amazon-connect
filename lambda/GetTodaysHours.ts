import {
    ConnectContactFlowEvent,
    ConnectContactFlowHandler,
    ConnectContactFlowResult,
} from 'aws-lambda';

export const handler: ConnectContactFlowHandler = async (_event: ConnectContactFlowEvent): Promise<ConnectContactFlowResult> => {

    let prompt: string = "We are open Monday through Friday from 9 AM to 5 PM eastern time.";

    const day: string = new Date().toLocaleString('en-US', { timeZone: 'EST', weekday: 'long' }) ;

    switch (day) {
        case 'Monday':
        case 'Tuesday':
        case 'Wednesday':
        case 'Thursday':
        case 'Friday':
            prompt += ` Today is ${day} so we will be open from 9 AM to 5 PM.`;
            break;
        case 'Saturday':
        case 'Sunday':
            prompt += ` Today is ${day} so we will be closed.`;
            break;
    }

    return {
        "PROMPT": prompt,
    };

}
