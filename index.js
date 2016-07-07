/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Would You Rather for a question"
 *  Alexa: "Would you rather: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.35efe55d-27e1-48be-8fa8-102fd918defa"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing odious options.
 */
var FACTS = [
    "Chew on a wild rat's severed tail for a half hour...OR...thoroughly brush your teeth with a toothbrush from a prison's community toothbrush bowl?",
    "Bite into a piece of chocolate and find it filled with maggots...OR...filled with pus?",
    "Walk around all day with a dead mouse in your pants...OR...a dead frog in your mouth?",
    "Be constantly depressed...OR...constantly afraid?",
    "Be accused of discriminating against someone because of age...OR...gender?",
    "Have a Texas accent and live in New York City...OR...have a New York accent and live in Texas?",
    "Have the CIA after you...OR...have the Mafia after you?",
    "Eat all of your food liquefied and frozen, like a popsicle...OR...have strangers squish all of your food like wine grapes with their perfectly clean but bare feet before you eat it?",
    "Fall through a toilet hole in an outhouse...OR...be temporarily trapped under a pile of dead animals?",
    "Chew a mole off of someone's neck...OR...drink a half a cup of your best friend's blood?",
    "Show up noticeably drunk on a national TV show...OR...roaring drunk at your child's high school graduation?",
    "Always have to write with your non-dominant hand...OR...always have to write with your eyes closed?",
    "Be trapped in jail with a guard who hates you...OR...with a cell mate that hates you?",
    "Get a bad case of poison ivy way up in your nose...OR...deep inside your ear?",
    "While trying to fight off a polar bear, be armed with a stun gun...OR...a spear?",
    "Walk around from now on wearing shoes with little suction cups...OR...metal cleats on the bottom?",
    "Be accidentally hit in the head very hard with a sock containing a potato...OR...with a rubber hose?",
    "Have regular encounters with aliens and not have any proof...OR...have your best friend be invisible?",
    "Stick your hand into a sealed box of rattlesnakes...OR...stick your hand into a box that is making a mechanical buzzing sound?",
    "Have every driver but you be a student driver...OR...have every driver (except you) be over 75 years old?",
    "Be married to someone that has every electronic device controlled by clapping...OR...has all of their furniture covered in plastic?",
    "Marry your first boyfriend or girlfriend...OR...marry someone your parents chose for you?",
    "Always have to wear wet socks...OR...always have to wear wet underwear?",
    "Always spit when you talk...OR...always be spit on when spoken to?",
    "Be granted the answers to any three questions...OR...be granted the ability to resurrect one person?",
    "In a fight, be armed with an eight-inch knife...OR...a crowbar?",
    "Have to go to the bathroom in a giant cat-litter box inside your house...OR...anywhere you want, but only outside?",
    "Spend a week at school in only your underwear...OR...attend two classes completely nude?",
    "As a hitchhiker, see handcuffs and a chainsaw in the back seat...OR...see bloody clothing in the back seat?",
    "Always show up 20 minutes late for everything...OR...always show up 90 minutes early for everything?",
    "Eat one small bar of hotel soap...OR...six sticks of butter?",
    "Bang your funny bone five times in a row until it's not funny anymore...OR...listen to somebody scrape their nails down a chalkboard for 20 minutes?",
    "Eat all of your food cold...OR...eat all of your food overcooked?",
    "Have to learn sword swallowing...OR...fire eating?",
    "Work for your sibling...OR...for your best friend?",
    "Meet your greatest hero and vomit on him or her...OR...in trying to meet your hero, be arrested and accused of stalking?",
    "Be trapped in an elevator packed with wet dogs...OR...three fat men with bad breath?",
    "While holding back an imminent bowel movement, run two miles to the nearest bathroom...OR...walk the two miles?",
    "Be married to someone who is completely vain...OR...has an extremely poor self image?",
    "Eat a cooked beaver tail...OR...eat a cooked cow udder?",
    "Be left completely naked in a foreign country...OR...be left completely naked at your place of work?",
    "Walk the stairs to the top of a skyscraper with a 40 pound backpack...OR...with a pebble in each of your shoes?",
    "Forget everyone else's name all of the time...OR...have everyone constantly forget your name?",
    "Accidentally get a fish hook caught on your eyeball...OR...have an ice pick jammed up your nose?",
    "If attacked in your home by a burglar, defend yourself with a baseball bat...OR...an unloaded pistol?",
    "Have an ice cream headache for 12 hours straight...OR...have diarrhea for 12 hours straight?",
    "Have your spouse be disappointed in you...OR...have your child be disappointed in you?",
    "Have a little man that lives in your mouth and incessantly hammers on your teeth with a tiny pick...OR...have a small bird that lives on your nose and yanks out your nose hairs occasionally?",
    "Be seasick for three straight days...OR...be drunk and spinning for four straight hours?",
    "Almost always have to sneeze...OR...hit your funny bone every 15 minutes?",
    "See your 60-year-old mother wearing a thong bikini...OR...your 60 year old father wearing it?",
    "Run a half marathon in wooden shoes...OR...ride 200 miles on a bicycle with no seat?",
    "In your teenager's room, find a vial of cocaine...OR...a gun?",
    "Get a papercut on your eyeball...OR...a papercut on your tongue?",
    "Be forced to watch The Sound of Music continuously for 48 hours...OR...drive cross-country with Barry Manilow singing on the radio the entire time?",
    "Be stranded on a deserted island with twenty friends of your choice...OR...with a group of twenty famous people of your choosing?",
    "Have brown teeth...OR...have a hairline just half an inch above your eyebrows?",
    "Have your fingers chewed off by squirrels...OR...your eyes pecked out by birds?",
    "Live in a world without grass...OR...a world without roads?",
    "Shove your head entirely into an elephant's butt...OR...lick a corpse clean after an autopsy?",
    "Have a butt full of worms...OR...a mouth full of baby frogs?",
    "Super glue your eyes shut...OR...super glue them open?",
    "Be perceived as intelligent...OR...street smart?",
    "Accidentally get a large marble stuck in your nose...OR...get your head stuck between the bars of a wrought iron fence?",
    "Age only from the neck up...OR...age only from the neck down?",
    "Call an important client by the wrong name...OR...completely blank on your in-laws' names when introducing them to a friend?",
    "Turn around three times before you sit down anywhere...OR...do a little jig before you go through any doorway?",
    "Eat five extremely green bananas...OR...eat five extremely brown bananas?",
    "Chew a piece of toenail off of a dirty man's foot...OR...thoroughly lick his unshowered armpit?",
    "Get caught on camera picking your nose...OR...ripping an obnoxiously loud fart?",
    "Cut your lawn using only your teeth...OR...lick up a 15 by 15 foot rain puddle?",
    "Eat a cup of uncooked popcorn...OR...an entire box of uncooked spaghetti?",
    "Streak naked through your office...OR...be known as the office farter?",
    "Have frequent spurts of uncontrollable drooling...OR...be a bet wetter?",
    "Have the worst breath, but great teeth...OR...horrible teeth and fantastic breath?",
    "Talk like you have ten walnuts in your mouth...OR...constantly have to clench one walnut between your butt cheeks?",
    "Have a lisp...OR...pronounce all of your Rs as Ws?"

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say ask a question, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Would you rather: " + randomFact;
    var cardTitle = "Your Would You Rather question";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

