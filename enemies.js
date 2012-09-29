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
        console.log("as");
        return params;
    }
    function createBody(world,params){
        return Bullet.superclass.createBody(world,params);
    }
    function setVelocity(x,y){
        this.worldBody.SetLinearVelocity(
            new Box2D.Common.Math.b2Vec2(
                x,
                y ));
        return this;
    }
  //  this.createBody = createBody;
    this.setVelocity = setVelocity;
    this.params = getParams();
    return this;
};
extend(Bullet,CAAT.B2DPolygonBody);
/*
Bullet.prototype = {

    createBody: function(world,params){
        var test = this.params;  
        Bullet.superclass.createBody(world,this.params);
        var velocity= {
            x: 0,
            y: Math.random()
        };
        this.worldBody.SetLinearVelocity(
        new Box2D.Common.Math.b2Vec2(
                velocity.x,
                velocity.y) );
        return this;
    }
};
extend(Bullet,CAAT.B2DPolygonBody);


function Bullet(world,x,y){

    return new CAAT.B2DPolygonBody()
}*/
function enemy1() {

}

        function enemy1(x1, y1, x2, y2, delay, speed) {
            return new CAAT.Actor().
                setFillStyle( 'blue' ).
                setBounds(-20, -20, 20, 10).
                setDiscardable(true).
                // cacheAsBitmap().
                addBehavior(
                    new CAAT.PathBehavior().
                        setValues(
                            new CAAT.Path().
                                setLinear( x1, y1, x2, y2 )
                        ).
                        setAutoRotate(true).
                        setFrameTime( delay, speed ).
                        setCycle( false )
                );
        }