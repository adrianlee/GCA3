function HealthBar(x,y,lives){
  HealthBar.superclass.constructor.call(this);
  console.log('test');
  for(var i=0;i<lives;i++){
    this.addChild(new Heart(50*i,0));
  }
  this.setBounds(x,y,500,50);
}
HealthBar.prototype.hearts = function(heroHearts){
  console.log(this.childrenList.length);
  if(heroHearts>this.childrenList.length){
    for(var i=0;i<heroHearts-this.childrenList.length;i++){
      this.addChild(new Heart(50*(i+heroHearts-1),0));
    }
  }else if(heroHearts<this.childrenList.length){
    console.log(this.childrenList);
    for(var i=0;i<this.childrenList.length-heroHearts;i++){
      this.childrenList.pop().destroy();
    }
  }

};
extend(HealthBar,CAAT.ActorContainer);
function Heart(x,y){
  Heart.superclass.constructor.call(this);
  this.setBounds(x,y,50,50);
  this.setBackgroundImage(this.image);
}
extend(Heart,CAAT.Actor);