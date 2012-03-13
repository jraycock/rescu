var RESCU = RESCU || {};

// Default Scores
RESCU.scores = RESCU.scores || {};

RESCU.scores = {
  total: 0,
  foundation: 0,
  walls: 0,
  windows: 0,
  roof: 0,
  chimney: 0,
  vents: 0,
  gutters: 0,

  calculateTotal: function(){
    this.total = this.walls + this.foundation + this.windows + this.roof + this.chimney + this.vents + this.gutters;

    var $scoreEl = $("#score h3");
    if ($scoreEl){
      $scoreEl.html(this.total);
    }
  }
};

RESCU.currPage = "foundation";