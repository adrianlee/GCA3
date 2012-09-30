
function Player(x,y){
  Player.superclass.constructor.call(this);
  this.params = {
    bodyType:   Box2D.Dynamics.b2Body.b2_dynamicBody,
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
  p.worldBody.SetFixedRotation(true);
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
  },
  setVelocity: function(x, y, speed){
    // console.log(this.worldBody);
    /*var theta;
    if(x!=0){
    theta = Math.atan((y)/(x));
    }else{
      theta = y>0? 0:Math.PI;
    }
    var tx = x<0? 1:0;
    var ty = y>0? 1:0;
    this.worldBody.SetLinearVelocity(
        new Box2D.Common.Math.b2Vec2(
            speed*Math.cos(theta+(tx*Math.PI)),
            -speed*Math.sin(theta+(ty*Math.PI)) ));
     //this.worldBody.SetAngle(theta+(tx-0.5)*Math.PI);
    return this;*/
    console.log("setVelocity");
    this.worldBody.m_linearVelocity.x = x/10;
    this.worldBody.m_linearVelocity.y = y/10;
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