/* Bullet - Non Homing */

function Bullet(x,y){
    Bullet.superclass.constructor.call(this);
    this.lifespan = levelDuration;
    this.params= {
        bodyType:   Box2D.Dynamics.b2Body.b2_dynamicBody,
        x: x||100,
        y: y||100,
        density:    1.2,
        friction:   0,
        restitution:1,
        image: this.image,
        polygonType:CAAT.B2DPolygonBody.Type.BOX,
        bodyDef:    [
            {x: 0,  y: 0 },
            {x: 10,  y: 30 }
        ],
        userData:   {}
    };



    function setVelocity(x,y,speed){
        var tx = x>0? 0:1;
        var theta = Math.atan((y)/(x));
        this.worldBody.SetLinearVelocity(
            new Box2D.Common.Math.b2Vec2(
                speed*Math.cos(tx*Math.PI+theta),
                speed*Math.sin(tx*Math.PI+theta) ));
        this.worldBody.SetAngle(theta+(tx-0.5)*Math.PI);
        return this;
    }

    // this.createBody = createBody;
    this.setVelocity = setVelocity;
    return this;
}

Bullet.prototype = {
    createBody: function(world,params){
        var p = params||this.params;
        var t=Bullet.superclass.createBody.call(this,world,p);
        t.addListener({
            actorLifeCycleEvent : function(actor, event, time) {
                if (event === 'expired') {
                    var body = actor.worldBody;
                    t.world.DestroyBody(body);
                    actor.destroy();
                    enemy.removeByValue(actor);
                }
            }
        });
        return t;
    },

    move: function(){
        // console.log(this);
        var v = this.worldBody.GetLinearVelocity();
        var theta = Math.atan((v.y)/(v.x));
        this.worldBody.SetAngle(theta+(0.5)*Math.PI);
        this.worldBody.SetAngularVelocity(0);
    }
};
extend(Bullet,CAAT.B2DPolygonBody);

/* Boomer - Non Homing - Exploding */

function Boomer(x,y){
    Boomer.superclass.constructor.call(this,x,y);
    this.lifespan = 500;
    this.params.bodyDef = [
            {x: 0,  y: 0 },
            {x: 30,  y: 30 }
        ];
}

Boomer.prototype = {
    destroy: function(){
        array = [0,-1,-1,-1,0,1,1,1];
        for(var i=0;i<8;i++){
            var b = new Bullet(this.x,this.y).createBody(this.world);
            this.parent.addChild(b);
            b.setVelocity(array[i],array[(i+6)%8],10);
            b.setFrameTime(this.time,1000);
        }
        Boomer.superclass.destroy.call(this);
    }
};
extend(Boomer,Bullet);
/* Knight - Homing */
function Knight(x, y) {
    Knight.superclass.constructor.call(this);
    this.lifespan = levelDuration;
    this.params= {
        bodyType:   Box2D.Dynamics.b2Body.b2_dynamicBody,
        x: x || 100,
        y: y || 100,
        density: 0.4,
        friction: 0,
        restitution: 1,
        polygonType: CAAT.B2DPolygonBody.Type.BOX,
        image: this.image,
        bodyDef:    [
            {x: 0,  y: 0 },
            {x: 50,  y: 50 }
        ],
        userData: {}
    };

    this.homeFactor = 10;

    // this.createBody = createBody;
  //  this.setVelocity = setVelocity;

    return this;
}

Knight.prototype = {
    createBody: function(world,params){
        var p = params ||this.params;
        var k = Knight.superclass.createBody.call(this,world,p);
        k.worldBody.SetFixedRotation(true);
        k.addListener({
        actorLifeCycleEvent : function(actor, event, time) {
            if (event === 'expired') {
                var body = actor.worldBody;
                k.world.DestroyBody(body);
                actor.destroy();
                enemy.removeByValue(actor);
            }
        }
        });
        return k;
    },

    move: function(x,y){
        var vel = this.worldBody.GetLinearVelocity();

        this.setVelocity(vel.x+(x-this.x)/this.homeFactor,vel.y+(y-this.y)/this.homeFactor,5);
    },

    setVelocity: function(x,y,speed){
        var tx = x>this.params.x? 0:1;
        var theta = Math.atan((y)/(x));
        this.worldBody.SetLinearVelocity(
            new Box2D.Common.Math.b2Vec2(
                speed*Math.cos(tx*Math.PI+theta),
                speed*Math.sin(tx*Math.PI+theta) ));
         //this.worldBody.SetAngle(theta+(tx-0.5)*Math.PI);
        return this;
    }

};
extend(Knight, CAAT.B2DPolygonBody);

/* Ghosts */

function Ghost(x,y){

    Ghost.superclass.constructor.call(this,x,y);
    this.setAlpha(0.20);
    this.homeFactor = 500;
}

extend(Ghost,Knight);

function DumbGhost(x,y){
    DumbGhost.superclass.constructor.call(this,x,y);
    this.setAlpha(0.15);
}
DumbGhost.prototype.move = function(x,y){

};
extend(DumbGhost,Knight);


