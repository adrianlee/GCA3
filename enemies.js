function Bullet(x,y){
    Bullet.superclass.constructor.call(this);
        var params= {
        bodyType:   Box2D.Dynamics.b2Body.b2_dynamicBody,
        x: x||100,
        y: y||100,
        density:    1.2,
        friction:   0,
        restitution:1,
        polygonType:CAAT.B2DPolygonBody.Type.BOX,
        bodyDef:    [
            {x: 0,  y: 0 },
            {x: 10,  y: 10 }
        ],
        userData:   {}
    };

    function getParams(){
        return params;
    }

    function setVelocity(x,y,speed){
        var theta = Math.atan(y/x);
        this.worldBody.SetLinearVelocity(   
            new Box2D.Common.Math.b2Vec2(
                speed*Math.cos(x),
                speed*Math.sin(y) ));
        return this;
    }
  //  this.createBody = createBody;
    this.setVelocity = setVelocity;
    this.params = getParams();
    return this;
};


Bullet.prototype = {

    createBody: function(world,params){  
        var p = params||this.params;    
        return Bullet.superclass.createBody.call(this,world,p);
    }

};
extend(Bullet,CAAT.B2DPolygonBody);
