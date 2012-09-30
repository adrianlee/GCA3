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

    // this.createBody = createBody;
    this.setVelocity = setVelocity;
    this.params = getParams();
    return this;
};

Bullet.prototype = {
    createBody: function(world,params){
        var p = params||this.params;
        return Bullet.superclass.createBody.call(this,world,p);
    },

    move: function(){
        console.log(this);
    }
};
extend(Bullet,CAAT.B2DPolygonBody);

// Fish
function Fish(x, y) {
    Fish.superclass.constructor.call(this);

    var params= {
        bodyType:   Box2D.Dynamics.b2Body.b2_dynamicBody,
        x: x || 100,
        y: y || 100,
        density: 0.4,
        friction: 0,
        restitution: 1,
        polygonType: CAAT.B2DPolygonBody.Type.BOX,
        image: new CAAT.SpriteImage().initialize(document.getElementById('sprite_1'), 1, 1),
        bodyDef:    [
            {x: 0,  y: 0 },
            {x: 20,  y: 30 }
        ],
        userData: {}
    };

    function getParams(){
        return params;
    }


    this.setBackgroundImage( new CAAT.SpriteImage().initialize(document.getElementById('sprite_1'), 1, 1), true );
    this.setAnimationImageIndex( [0,1,2,1] );


    // this.createBody = createBody;
  //  this.setVelocity = setVelocity;
    this.params = getParams();
    return this;
};

Fish.prototype = {
    createBody: function(world,params){
        var p = params ||this.params;
        return Fish.superclass.createBody.call(this,world,p);

    },

    move: function(){
  
    },
    setVelocity: function(x,y,speed){
        console.log(this.params.x+" "+this.params.y);
        var tx = x>this.params.x? 0:1;
        var theta = Math.atan((y-this.params.y)/(x-this.params.x));
        this.worldBody.SetLinearVelocity(
            new Box2D.Common.Math.b2Vec2(
                speed*Math.cos(tx*Math.PI+theta),
                speed*Math.sin(tx*Math.PI+theta) ));
        console.log(theta);
         this.worldBody.SetAngle(theta+(tx-0.5)*Math.PI);
        return this;
    }

};
extend(Fish, CAAT.B2DPolygonBody);






