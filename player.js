

function Player() {

  this.init =  function(x,y,speed){
    this.actor = new CAAT.Actor().
      setLocation(x,y).
      setSize(50,50);
  };

}