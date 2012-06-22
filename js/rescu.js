var RESCU = RESCU || {};

// Default Questions
RESCU.questions = RESCU.questions || {};

RESCU.filterQuestions = function(view){
  return _.filter(RESCU.questions, function(question){
    return question.view === view;
  });
}

RESCU.displayQuestions = function(){
  _.each(questions, function(question){
    var $section = $("<section></section>"),
        $fieldset = $("<fieldset></fieldset>");

    $section.append($("<h2>" + question.question + "</h2>"));
    _.each(question.answers, function(answer){
      $fieldset.append("<input id='"+answer.id+"' name='"+answer.name+"' value='"+answer.points+"' type='"+answer.type+"' />");
      $fieldset.append("<label for='"+answer.id+"'>"+answer.answer+"</label><br />");
      $section.append($fieldset);
    });

    if (question.moreInfo !== undefined){
      $section.append("<a href='"+question.moreInfo.link+"' target='_blank'>"+question.moreInfo.text+"</a>")
    }

    $(".questions").append($section);
  });
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