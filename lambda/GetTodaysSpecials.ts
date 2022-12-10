import {
    ConnectContactFlowEvent,
    ConnectContactFlowHandler,
    ConnectContactFlowResult,
} from 'aws-lambda';

export const handler: ConnectContactFlowHandler = async (_event: ConnectContactFlowEvent): Promise<ConnectContactFlowResult> => {

    let prompt: string = "We have a unique special each day of the week. ";

    const day: string = new Date().toLocaleString('en-US', { timeZone: 'EST', weekday: 'long' })

    switch (day) {
        case 'Monday':
            prompt += ` Today is ${day} so we will have our salmon special. Our fresh wild Alaskan salmon fillet is only 15 dollars per pound.`;
            break;
        case 'Tuesday':
            prompt += ` Today is ${day} so we will have our lobster special. Whole steamed lobsters are 25 dollar a piece when you buy two or more.`;
            break;
        case 'Wednesday':
            prompt += ` Today is ${day} so we will have our red snapper special. Our delicious red snapper is only 12 dollars per pound.`;
            break;
        case 'Thursday':
            prompt += ` Today is ${day} so we will have our clam chowder special. Try our award winning chowder for 22 dollars per quart.`;
            break;
        case 'Friday':
            prompt += ` Today is ${day} so we will have our king crab legs special. Our imported king crab legs are 75 dollars per pound.`;
            break;
        case 'Saturday':
        case 'Sunday':
            prompt += ` We are closed today, but check back on Monday for our daily special.`;
            break;
    }

    return {
        "PROMPT": prompt,
    };

}
