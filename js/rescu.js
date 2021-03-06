/**
 * RESCU.js magic
 *
 * In order to understand this file, there are a few helper methods you need.
 * From underscore.js (http://underscorejs.org/)
 *    - _.filter (filter a collection) http://underscorejs.org/#filter
 *    - _.each (iterate over a collection) http://underscorejs.org/#each
 *
 * From jquery.js
 *    - $.append (insert content) http://api.jquery.com/append/
 *    - $.attr (get/set an attribute) http://api.jquery.com/attr/
 *
 * @author Andrew Thorp
 */

var RESCU = RESCU || {};

// Default Questions
RESCU.questions = RESCU.questions || {};

/**
 * Filter questions for a specified view
 *
 * @param view ("threshold", "foundation", "walls", "windows", or "roof")
 * @author Andrew Thorp
 */
RESCU.filterQuestions = function(view){
  return _.filter(RESCU.questions, function(question){
    return question.view === view;
  });
}

/**
 * Display all of the questions for the given screen
 *
 * @author Andrew Thorp
 */
RESCU.displayQuestions = function(questions){
  _.each(questions, function(question){
    var $section = $("<section></section>"),
        $fieldset = $("<fieldset></fieldset>"),
        options = {
          multiplicative: question.multiplicative === undefined ? false : true,
          multiplierID: question["multiplier-id"] === undefined ? "" : question["multiplier-id"]
        };

    // Add the question to the screen
    $section.append($("<h2 id='"+question.id+"'>" + question.question + "</h2>"));

    // Loop through each answer
    _.each(question.answers, function(answer){

      // Setup Input Question
      var $input = $("<input id='"+answer.id+"' name='"+answer.name+"' value='"+answer.points+"' type='"+answer.type+"' data-multiplicative='"+options.multiplicative+"' data-multiplier-id='"+options.multiplierID+"' />");

      // Decide if it was previously answered
      if (localStorage.getItem(question.id) === answer.id){
        $input.attr("checked", true);
      }

      // Append input (radio button) and label (answer text) to fieldset
      $fieldset.append($input);
      $fieldset.append("<label for='"+answer.id+"'>"+answer.answer+"</label><br />");

      // Add the fieldset to the screen
      $section.append($fieldset);
    });

    if (question.moreInfo !== undefined){
      $section.append("<a href='"+question.moreInfo.link+"' target='_blank'>"+question.moreInfo.text+"</a>")
    }

    $(".questions").append($section);
  });
}

/**
 * Find a question object
 *
 * Helper function that will take a question as a paramter, and
 * return the associated question with it's answers.
 *
 * @author Andrew Thorp
 */
RESCU.findQuestion = function(question){
  var length = RESCU.questions.length,
      result;

  for(var i=0; i<length; i++){
    if (RESCU.questions[i].question === question){
      result = RESCU.questions[i];
    }
  }

  return result;
}

/**
 * Find an answer object
 *
 * This takes a question and an answer, and it digs into it to return
 * the answer object, which has the id, points, etc.
 *
 * @author Andrew Thorp
 */
RESCU.findAnswer = function(question, answer){
  var q = RESCU.findQuestion(question),
      length = q.answers.length,
      result;

  for(var i=0; i<length; i++){
    if (q.answers[i].id === answer){
      result = q.answers[i];
    }
  }

  return result;
}

/**
 * Persist an answer in localStorage
 *
 * TODO: allow more than just the question string and answer id here.
 *
 * @author Andrew Thorp
 */
RESCU.persistAnswer = function(question, answer){
  localStorage.setItem(question, answer);
}

/**
 * Get the user information from localStorage.
 *
 * Optional paramter, whether or not to deserialize.
 * Defaults to true.
 *
 * @author Andrew Thorp
 */
RESCU.user = function(deserialize){
  deserialize = typeof deserialize === 'undefined' ? true : deserialize

  if (deserialize){
    return JSON.parse(localStorage.getItem("userInfo"));
  } else {
    return localStorage.getItem("userInfo");
  }
};


// This function was taken from the following URL:
// http://ntt.cc/2008/04/25/6-very-basic-but-very-useful-javascript-number-format-functions-for-web-developers.html
RESCU.addCommas = function(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

// Default Scores
RESCU.scores = RESCU.scores || {};

RESCU.scores = {
  total: 0,
  threshold: 0,
  foundation: 0,
  walls: 0,
  windows: 0,
  roof: 0,

  calculateTotal: function(){
    this.total = this.walls + this.foundation + this.windows + this.roof;

    var $scoreEl = $("#score h3");
    if ($scoreEl){
      $scoreEl.html(this.total.toFixed(1));
    }
  }
};

RESCU.currPage = "foundation";
