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
        $fieldset = $("<fieldset></fieldset>");

    var answerID = localStorage.getItem(question.question);
    if (answerID !== undefined){
      $section.append($("<h2>" + question.question + "</h2>"));
      _.each(question.answers, function(answer){
        if (answerID === answer.id){
          $fieldset.append("<input id='"+answer.id+"' name='"+answer.name+"' value='"+answer.points+"' type='"+answer.type+"' checked='true' />");
        } else {
          $fieldset.append("<input id='"+answer.id+"' name='"+answer.name+"' value='"+answer.points+"' type='"+answer.type+"' />");
        }
        $fieldset.append("<label for='"+answer.id+"'>"+answer.answer+"</label><br />");
        $section.append($fieldset);
      });
    } else {
      $section.append($("<h2>" + question.question + "</h2>"));
      _.each(question.answers, function(answer){
        $fieldset.append("<input id='"+answer.id+"' name='"+answer.name+"' value='"+answer.points+"' type='"+answer.type+"' />");
        $fieldset.append("<label for='"+answer.id+"'>"+answer.answer+"</label><br />");
        $section.append($fieldset);
      });
    }


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
    this.total = this.walls + this.foundation + this.threshold + this.windows + this.roof;

    var $scoreEl = $("#score h3");
    if ($scoreEl){
      $scoreEl.html(this.total);
    }
  }
};

RESCU.currPage = "foundation";
