var https = require('https');

var dormNames = [
    'Andrews',
    'Barbour',
    'Buxton',
    'Caswell',
    'Champlin',
    'Chapin',
    'Diman',
    'Wayland',
    'Sears',
    'Olney',
    'Perkins',
    'New Pembroke',
    'Slater',
    'Woolley',
];

exports.handler = (event, context) => {

    try {

		if (event.session.new) {
		    // New Session
		    console.log("NEW SESSION");
		}

		switch (event.request.type) {
		    case "LaunchRequest":
				console.log("LAUNCH REQUEST");
				context.succeed(
				    generateResponse(
					buildSpeechletResponse("Want to get fresh? Brown's Laundry Alexa Skill helps you check for laundry machine availability based on your dorm.", true),
					{}
				    )
				);
				break;

		    case "IntentRequest":
				console.log("INTENT REQUEST");

				switch(event.request.intent.name) {
				    case "GetDormNames":
					let dorms = dormNames.toString();
					context.succeed(
					    generateResponse(
						buildSpeechletResponse("Valid dorm names are: " + dorms, true),
						{}
					    )
					);
					break;
				    case "GetLaundryAvailabilityByDorm":
					// TO-DO: Get Brown API credentials and implement this part
					let dormName = event.request.intent.slots.DormName.value;
					if (!dormName)
					    throw "Invalid Dorm Name";
					context.succeed(
					    generateResponse(
						buildSpeechletResponse("Unable to get the laundry room availability for" + dorms, true),
						{}
					    )
					);
					break;

				    default:
					throw "Invalid Intent";
				}
				break;

		    case "SessionEndedRequest":
				console.log("SESSION ENDED REQUEST");
				break;

		    default:
				context.fail('INVALID REQUEST TYPE: ${event.request.type}');
		}
    }
    catch(error) {
		context.fail('Exception: ${error}');
    }
}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
