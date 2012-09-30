
function Player(x,y){
  Player.superclass.constructor.call(this);
  this.params = {
    bodyType:   Box2D.Dynamics.b2Body.b2_staticBody,
    x: 400-25,
    y: 250-25,
    density:    1.2,
    friction:   1,
    restitution: 0.5,
    image: this.image,
    polygonType:CAAT.B2DPolygonBody.Type.BOX,
    bodyDef:    [
        {x: 0,  y: 0 },
        {x: 50,  y: 50 }
    ],
    userData:   {}
  };
  this.lives = 3;
  return this;
}

Player.prototype = {
  createBody: function(world){
  var p = Player.superclass.createBody.call(this,world,this.params);
  p.cacheAsBitmap();
    return p;
  },
  die: function(){
    this.setLocation( this.params.x, this.params.y );
    this.lives--;
    if(this.lives <= 0){
      return false;
    }else{
      return true;
    }
  }
};
extend(Player,CAAT.B2DPolygonBody);
/*
        {x:14,y:17},
        {x:14,y:0},
        {x:25,y:0},
        {x:25,y:-5},
        {x:14,y:-5},
        {x:14,y:-16},
        {x:-14,y:-16},
        {x:-14,y:-5},
        {x:-25,y:-5},
        {x:-25,y:0},
        {x:-14,y:0}
        */