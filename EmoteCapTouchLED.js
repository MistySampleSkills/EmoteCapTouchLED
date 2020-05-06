/**********************************************************************
    Copyright 2020 Misty Robotics
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    **WARRANTY DISCLAIMER.**

    * General. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MISTY
    ROBOTICS PROVIDES THIS SAMPLE SOFTWARE "AS-IS" AND DISCLAIMS ALL
    WARRANTIES AND CONDITIONS, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
    INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
    PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, AND NON-INFRINGEMENT OF
    THIRD-PARTY RIGHTS. MISTY ROBOTICS DOES NOT GUARANTEE ANY SPECIFIC
    RESULTS FROM THE USE OF THIS SAMPLE SOFTWARE. MISTY ROBOTICS MAKES NO
    WARRANTY THAT THIS SAMPLE SOFTWARE WILL BE UNINTERRUPTED, FREE OF VIRUSES
    OR OTHER HARMFUL CODE, TIMELY, SECURE, OR ERROR-FREE.
    * Use at Your Own Risk. YOU USE THIS SAMPLE SOFTWARE AND THE PRODUCT AT
    YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR (AND MISTY
    ROBOTICS DISCLAIMS) ANY AND ALL LOSS, LIABILITY, OR DAMAGES, INCLUDING TO
    ANY HOME, PERSONAL ITEMS, PRODUCT, OTHER PERIPHERALS CONNECTED TO THE PRODUCT,
    COMPUTER, AND MOBILE DEVICE, RESULTING FROM YOUR USE OF THIS SAMPLE SOFTWARE
    OR PRODUCT.

    Please refer to the Misty Robotics End User License Agreement for further
    information and full details:
        https://www.mistyrobotics.com/legal/end-user-license-agreement/
**********************************************************************/



// Misty Emotes to Touch on her head

misty.Debug("Moving Head and Arms to home position");
misty.MoveHeadDegrees(0, 0, 0, 100);
misty.MoveArmDegrees("both", 0, 45);

misty.Set("pastState", "skillStarted");
misty.Set("red", 148);
misty.Set("green", 0);
misty.Set("blue", 211);
misty.ChangeLED(148, 0, 211);
registerCaptouch();

// -----------------------------Cap Touch--------------------------------------------------------
function registerCaptouch() {
    // misty.AddPropertyTest(string eventName, string property, string inequality, string valueAsString, string valueType);
    // misty.RegisterEvent(string eventName, string messageType, int debounce, [bool keepAlive = false], [string callbackRule = “synchronous”], [string skillToCall = null]);
    // Enevent callback function names are event names prefixed with an underscore
    misty.AddReturnProperty("Touched", "sensorName");
	misty.RegisterEvent("Touched", "TouchSensor", 250 ,true);
}

// We use the timeout to move head back to home position 
misty.Set("touchTimeout", 3);
misty.Set("touchAt", (new Date()).toUTCString());
misty.Set("inTouch",false);

function _Touched(data) {

	if (!misty.Get("inTouch")) {
		misty.Set("inTouch", true);
		misty.Set("touchAt", (new Date()).toUTCString());

		var sensor = data.AdditionalResults[0];
		misty.Debug(sensor);

		switch(sensor) {
			case "CapTouch_Chin":
				blue_up();
				misty.PlayAudio("<audio_file_name_with_extension>");
				misty.DisplayImage("Happy.png");
				misty.Set("touchTimeout", 6);
misty.MoveHeadDegrees(null, -35, null);
			 	break;
			case "CapTouch_HeadLeft":
				blue_up();
				misty.PlayAudio("<audio_file_name_with_extension>");
				misty.DisplayImage("Wonder.png");
				misty.Set("touchTimeout", 6);
misty.MoveHeadDegrees(null, 35 ,null);
			 	break;
			default:
				red_up();
				misty.PlayAudio("<audio_file_name_with_extension>");
				misty.DisplayImage("Angry.png");
				misty.Set("touchTimeout", 3);
		  }
	}
}

// --------------------------LED Gradients----------------------------------------------------

// This part would need not be handled by developers. Would ba handled by Misty SDK soon
function green_up() {
	var red = misty.Get("red")/10.0;
    var green = misty.Get("green")/10.0;
    var blue = misty.Get("blue")/10.0;
    for (var i = 10; i >=0 ; i=i-1) { 
        misty.ChangeLED(Math.floor(i*red),Math.floor(i*green),Math.floor(i*blue));
        misty.Pause(50);
    }
    for (var i =0; i <=10 ; i=i+1) { 
		misty.ChangeLED(0,Math.floor(i*20),0);
		misty.Pause(50);
    }
    misty.Set("red", 0);
    misty.Set("green", 200);
    misty.Set("blue", 0);
}

function purple_up() {
	var red = misty.Get("red")/10.0;
    var green = misty.Get("green")/10.0;
    var blue = misty.Get("blue")/10.0;
    for (var i = 10; i >=0 ; i=i-1) { 
        misty.ChangeLED(Math.floor(i*red),Math.floor(i*green),Math.floor(i*blue));
        misty.Pause(50);
    }
    for (var i =0; i <=10 ; i=i+1) { 
		misty.ChangeLED(Math.floor(i*14.8),0,Math.floor(i*21.1));
		misty.Pause(50);
    }
    misty.Set("red", 148);
    misty.Set("green", 0);
    misty.Set("blue", 211);
}

function red_up() {
    var red = misty.Get("red")/10.0;
    var green = misty.Get("green")/10.0;
    var blue = misty.Get("blue")/10.0;
    for (var i = 10; i >=0 ; i=i-1) { 
        misty.ChangeLED(Math.floor(i*red),Math.floor(i*green),Math.floor(i*blue));
        misty.Pause(50);
    }
    for (var i =0; i <=10 ; i=i+1) { 
		misty.ChangeLED(Math.floor(i*20),0,0);
		misty.Pause(50);
    }
    misty.Set("red", 200);
    misty.Set("green", 0);
    misty.Set("blue", 0);
}

function blue_up() {
    var red = misty.Get("red")/10.0;
    var green = misty.Get("green")/10.0;
    var blue = misty.Get("blue")/10.0;
    for (var i = 10; i >=0 ; i=i-1) { 
        misty.ChangeLED(Math.floor(i*red),Math.floor(i*green),Math.floor(i*blue));
        misty.Pause(50);
    }
    for (var i =0; i <=10 ; i=i+1) { 
		misty.ChangeLED(0,0,Math.floor(i*20));
		misty.Pause(50);
    }
    misty.Set("red", 0);
    misty.Set("green", 0);
    misty.Set("blue", 200);
}

// ------------------------Loop----------------------------------------------------------

while (true) {
    misty.Pause(100);
	if (misty.Get("inTouch") && secondsPast(misty.Get("touchAt")) > misty.Get("touchTimeout")) {
		misty.Set("inTouch", false);
        misty.MoveHeadDegrees(0, 0, 0, 100);
        purple_up();
	}	
}

// -----------------------Support Functions------------------------------------------------

function secondsPast(value) {
	var timeElapsed = new Date() - new Date(value);
    timeElapsed /= 1000;
    return Math.round(timeElapsed); // seconds
}
