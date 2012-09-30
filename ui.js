function HealthBar(x,y,lives){
  HealthBar.superclass.constructor.call(this);
  for(var i=0;i<lives;i++){
    this.addChild(new Heart(50*i,0));
  }
  this.setBounds(x,y,500,50);
}
HealthBar.prototype.minusHeart = function(){
  this.childrenList.pop().destroy();
  return this;
};
extend(HealthBar,CAAT.ActorContainer);
function Heart(x,y){
  Heart.superclass.constructor.call(this);
  this.setBounds(x,y,50,50);
  this.setBackgroundImage(this.image);
}
extend(Heart,CAAT.Actor);