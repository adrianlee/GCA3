(function() {
    //CAAT.DEBUG = 1;

    CAAT.TOUCH_BEHAVIOR = CAAT.TOUCH_AS_MULTITOUCH;

    window.enemy = [];
    window.powerup = [];

    var enemyContainer;
    var powerUpContainer;
    var healthBar;
    var keys = [0,0,0,0];
    var prevTime = -1;
    var pixelsPerSecond = 400;
    var collision = null;
    var hero = null;
    var world;
    var wallThickness = 5;
    var text;
    var level=-1;
    var currentLevel;
    var levelDuration = window.levelDuration = 10000;

    var joystickE = true;
    var joystickSize = 150;
    var levelpause = false;

    if (joystickE) {
        var joystick = new CAAT.ActorContainer().
            setId(99).
            setBounds(0,0,800,500).
            setAlpha(0).
            setFillStyle('#00ffff').
            cacheAsBitmap();

        // var subjsSize = joystickSize/5;
        // var subjs = new CAAT.Actor().
        //     //setShape( CAAT.ShapeActor.prototype.SHAPE_CIRCLE ).
        //     setBounds(joystickSize/2-subjsSize/2,joystickSize/2-subjsSize/2,subjsSize,subjsSize).
        //     setFillStyle('#ffff00').
        //     cacheAsBitmap().
        //     setSize(40, 40).
        //     setAlpha(.32).
        //     setScale(0.7, 0.7);

        // joystick.addChild(subjs);

        joystick.touchStart= function( e ) {
            console.log("touchstart");
            for( var i=0; i< e.changedTouches.length; i++ ) {
                    var touch= e.changedTouches[i];
                    var id= touch.identifier;
                    // var actor= new CAAT.Actor().
                    //         setBackgroundImage( img ).
                    //         enableEvents(false).
                    //         setGestureEnabled(false).
                    //         setId( id ).
                    // var child = this.childrenList[0];

                    // e.point.x < subjsSize-5 ? e.point.x = subjsSize-5 : e.point.x;
                    // e.point.x > joystickSize-subjsSize+5 ? e.point.x = joystickSize-subjsSize+5 : e.point.x;
                    // e.point.y < subjsSize-5 ? e.point.y = subjsSize-5 : e.point.y;
                    // e.point.y > joystickSize-subjsSize+5 ? e.point.y = joystickSize-subjsSize+5 : e.point.y;

                    // console.log("point: " + e.point.x + ", " + e.point.y);
                    // console.log("page: " + touch.pageX + ", " + touch.pageY);

                    // child.setLocation( e.point.x - child.width/2, e.point.y - child.height/2);


                    this.joy_x = e.changedTouches[i].pageX - hero.x;
                    this.joy_y = e.changedTouches[i].pageY - hero.y;
                }
            };

        joystick.touchMove= function( e ) {
            console.log("touchmove");
            for( var i=0; i < e.changedTouches.length; i++ ) {
                var touch= e.changedTouches[i];
                // var child = this.childrenList[0];
                // var actor = cc.findActorById(e.changedTouches[i].identifier);
                // actor.setLocation(e.changedTouches[i].pageX-W/2, e.changedTouches[i].pageY-H/2);
                // child.setLocation(e.point.x - child.width/2, e.point.y - child.height/2 );

                this.joy_x = e.changedTouches[i].pageX - hero.x;
                this.joy_y = e.changedTouches[i].pageY - hero.y;
            }
        };

        joystick.touchEnd= function( e ) {
            console.log("touchend");
            // for( var i=0; i< e.changedTouches.length; i++ ) {
            //     var actor = cc.findActorById(e.changedTouches[i].identifier);
            //     actor.destroy();
            // }



            // this.joy_x = 0;
            // this.joy_y = 0;
            // var child = this.childrenList[0];
            // child.setLocation(this.width/2-child.width/2,this.height/2-child.height/2);
        };

        joystick.mouseMove = function(e){
            // var child = this.childrenList[0];
            //     e.point.x < subjsSize-5 ? e.point.x = subjsSize-5 : e.point.x;
            //     e.point.x > joystickSize-subjsSize+5 ? e.point.x = joystickSize-subjsSize+5 : e.point.x;
            //     e.point.y < subjsSize-5 ? e.point.y = subjsSize-5 : e.point.y;
            //     e.point.y > joystickSize-subjsSize+5 ? e.point.y = joystickSize-subjsSize+5 : e.point.y;
            //     window.c = child;
            //     child.setLocation(e.point.x - child.width/2, e.point.y - child.height/2 );
            //     // child.moveTo(e.point.x - child.width/2, e.point.y - child.height/2, 5);
                this.joy_x = e.point.x - hero.x - hero.width/2;
                this.joy_y = e.point.y - hero.y - hero.height/2;
            };

        joystick.mouseExit = function(e){
            // if((e.point.x<0 || e.point.x>800) ||(e.point.y<0 ||e.point.y>500) ){
            //     this.joy_x = 0;
            //     this.joy_y = 0;
            //     // var child = this.childrenList[0];
            //     // child.setLocation(this.width/2-child.width/2,this.height/2-child.height/2);
            // }
        }
    }

    function __preload() {

        new CAAT.ImagePreloader().loadImages(
            [
                { id:'bomb', url:'Image/Powerups/bomb.png'},
                { id:'mushroom', url:'Image/Powerups/Mushroom.png'},
                { id:'bullet', url:'Image/Projectiles/Random_Projectile2_Rotated.png'},
                { id:'joypad', url:'Image/Interface/Outer_Square.png'},
                { id:'joystick',url:'Image/Interface/Inner_Square50px.png'},
                { id:'hero', url:'Image/Units/Human.png'},
                { id:'knight', url:'Image/Units/BadGuy.png'},
                { id:'back1', url:'Image/Background/Tiled_Background.png'},
                { id:'ghost', url:'Image/Units/Ghost.png'},
                { id:'heart', url:'Image/Interface/Heart.png'},
                { id:'start', url:'Image/Interface/Start.png'},
                { id:'menu', url:'Image/Background/Splash_Black.png'},
                { id:'game_over', url:'Image/Background/Game Over.png'},
                { id:'ghost2', url:'Image/Units/ghost3.png'},
                { id:'boomer', url:'Image/Units/boomer.png'}
            ],
            function( count, images ) {
                if (count === images.length) {
                    __setup(images);
                }
            }
        );
    }

    function __setup(images){

        // var el = document.createElement('link');
        // el.href = "Image/font/BMHARRY.TTF";
        // el.type = "application/octet-stream";
        // el.rel ='stylesheet';
        // document.head.appendChild(el);

        var director = new CAAT.Director().
            initialize( 800,500 ).
            setClear( CAAT.Director.CLEAR_DIRTY_RECTS );

        CAAT.currentDirector = director;
        CAAT.PMR = director.width / 10;

        director.
            addAudio("death", 'sound/Retro Gaming - Lose Life - GCA3.mp3').
            addAudio("audio_2", 'sound/2.mp3').
            addAudio("audio_3", 'sound/3.mp3').
            addAudio("gameover", 'sound/Retro Gaming - Game Over - GCA3.mp3').
            addAudio("level1", 'sound/Retro Gaming - Level 1 - GCA3.mp3').
            addAudio("menuscreen", 'sound/Retro Gaming - Menu Screen (2)- GCA3.mp3').
            addAudio("nextlevel", 'sound/Retro Gaming - Next Level (2)- GCA3.mp3').
            addAudio("powerup", 'sound/Retro Gaming - Powerup - GCA3.mp3');

        director.setImagesCache(images);

        PowerUp.prototype.bomb = director.getImage('bomb');
        PowerUp.prototype.mushroom = director.getImage('mushroom');
        Bullet.prototype.image = director.getImage('bullet');
        Player.prototype.image = director.getImage('hero');
        Knight.prototype.image = director.getImage('knight');
        Ghost.prototype.image = director.getImage('ghost');
        Heart.prototype.image = director.getImage('heart');
        Boomer.prototype.image = director.getImage('boomer');
        DumbGhost.prototype.image = director.getImage('ghost2');
        // joystick.setBackgroundImage(director.getImage('joypad'));
        // subjs.setBackgroundImage(director.getImage('joystick'));

        var scene = director.createScene();
        scene.setBounds(0,0,director.width,director.height);
        scene.setFillStyle('#000');
        var scene2 = director.createScene();
        scene2.setBounds(0,0,director.width,director.height);
        var scene3 = director.createScene().setBounds(0,0,director.width,director.height);
        director.setScene(0);
        __menu(director,scene2);
        __deadScreen(director,scene3);
        __start(director,scene);
        director.setScene(1);
        CAAT.loop(60);
    }

    function __deadScreen(director,scene){
        scene.addChild(new CAAT.Actor().setBounds(0,0,scene.width,scene.height).setBackgroundImage(director.getImage('game_over')).setBackgroundImageOffset(-15,0));
        scene.setFillStyle('#fff');
        __deadScreen.prototype.text = new CAAT.TextActor().calcTextSize(director).setFont('50px BM harry').setAlpha(1.0);
        __deadScreen.prototype.text.setLocation(scene.width/2-200,scene.height/2+100);
        __deadScreen.prototype.text.textFillStyle = '#000';
        scene.addChild(__deadScreen.prototype.text);
        var button = new CAAT.Actor();
        button.touchStart = function( e ) {
            director.setScene(0);
        };
        button.setAsButton(director.getImage('start'),0,0,0,0,function(){
            director.setScene(0);
        }).setBounds(scene.width/2-100,scene.height/2+30,200,48);


        scene.addChild(button);

    }

    function __menu(director,scene){
        scene.setFillStyle('#fff');
        scene.addChild(new CAAT.Actor().setBounds(0,0,scene.width,scene.height).setBackgroundImage(director.getImage('menu')));
        var button = new CAAT.Actor();
        button.touchStart = function( e ) {
            director.setScene(0);
        };


        button.setAsButton(director.getImage('start'),0,0,0,0,function(){
            director.setScene(0);
        }).setBounds(scene.width/2-100,scene.height/2-24,200,48);

        director.audioPlay("menuscreen");
        scene.addChild(button);
    }
    function __start(director,scene) {

        text = new CAAT.TextActor().calcTextSize(director).setFont('100px BM harry').setAlpha(1.0);
        text.setLocation(scene.width/2-150,scene.height/2-100);
        scene.addChild(text);
        scene.setFillStyle('#000');
       // scene.setBackgroundImage(director.getImage('back1'));
        scene.cacheAsBitmap();
        world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0,0), true);
        world.SetContinuousPhysics(true);

        __createLevel( director, scene );
        //__createHero( scene ,director.getImage('hero'));
        hero =new Player(scene.width/2,scene.height/2).createBody(world);
        hero.setFillStyle('#fff');
        scene.addChild(hero);
        healthBar = new HealthBar(200,450,hero.lives);
        scene.addChild(healthBar);
        __startLevel(director, scene, 1);
        joystickE ? scene.addChildAt(joystick,1000) : null;

        __setKeys( scene, hero );


        var listener = new Box2D.Dynamics.b2ContactListener;
        listener.BeginContact = function(contact){

        }
        listener.EndContact = function(contact){
            var a = contact.GetFixtureA().GetBody();
            var b  = contact.GetFixtureB().GetBody();
            a.SetAngularVelocity(0);
            b.SetAngularVelocity(0);

        }
        world.SetContactListener(listener);


        /* Game Loop */
        scene.onRenderStart= function() {
            world.Step(1.0/60, 1,1);
            world.ClearForces();
            };

        scene.onRenderEnd =  function(time)    {
            joystick.joy_x = joystick.joy_x *.9;
            joystick.joy_y = joystick.joy_y *.9;
            healthBar.hearts(hero.lives);
            world.DrawDebugData();
            if(enemyContainer.childrenList.length==0 && !levelpause){
                text.setText("Level " + (level+2));
                text.setAlpha(1.0);

                console.log("Level: " + (level+2));
                __nextLevel(director, this,level);
                level++;
                levelpause = true;
            }else{

                for(var i=0;i<enemyContainer.childrenList.length;i++){
                    enemyContainer.childrenList[i].move(hero.x,hero.y);

                }
            }
        }



    }

    function __setKeys( scene, selected ) {
        /**
         * This timer makes the process to increment actor position based on elapsed time.
         * it will move pixelsPerSecond pixels on any direction.
         */
        scene.createTimer( scene.time, Number.MAX_VALUE, null,
            function(time, ttime, timerTask) {

                var ottime= ttime;
                if ( -1!=prevTime ) {
                    ttime-= prevTime;

                            var nx= hero.x + joystick.joy_x*(ttime/1500)*6;
                            var ny= hero.y + joystick.joy_y*(ttime/1500)*6;

                        /**
                         * Test map collision: hero vs map.
                         */

                        var collides = collision.getOverlappingActors(new CAAT.Rectangle().setBounds(nx, ny, hero.width, hero.height));

                        if (!collides.length) {
                            hero.setLocation( nx, ny );
                        } else {

                            // Allow frictionless surface when collision with wall.
                            if (wallThickness >= ny || ny + hero.height >= scene.height-wallThickness) {
                                // Top & Bottom
                                if (!(nx < wallThickness) && !(nx + hero.width > scene.width - wallThickness)) {
                                    hero.setLocation( nx, hero.y );
                                }
                            } else if (wallThickness >= nx || nx + hero.width >= scene.width-wallThickness) {
                                // Left & Right Walls
                                if (!(ny < wallThickness) && !(ny + hero.height > scene.height - wallThickness)) {
                                    hero.setLocation( hero.x, ny );
                                }
                            }
                        }
                }
                prevTime = ottime;
            },
            null
        );

    }



    function addPowerUp(director, scene, item) {
        var obj;

        for (var i = 1; i < Math.random()+0.1; i++) {
            obj = new PowerUp(i);

            powerup.push(obj);
            powerUpContainer.addChild(obj);
        }
    }

    function addEnemies(scene, level){
        for(var i=0;i<1*level;i++){
            // var t = new Bullet(0,Math.random()*500).createBody(world);s
            var x, y;
            if(Math.random()>0.5){
            y = Math.random()>0.5? -50: scene.height+50;
            x = Math.random()*scene.width;
            }else{
            x = Math.random()>0.5? -50: scene.width+50;
            y = Math.random()*scene.height;
            }

            var t = new Boomer(x, y).createBody(world);

            enemy.push(t);


            window.t = t;
            enemyContainer.addChild(t);
            //Set the direction of the bullets here
            //To use physical formulas use t.worldBody then you can use ApplyForce or ApplyImpulse

            t.setVelocity(hero.x-x,hero.y-y,1);

            window.t=t;

            t.setFrameTime( scene.time, t.lifespan );
        }
    }

    function __enemySpawner(scene, timeline) {
        var enemySpawned;
        enemySpawned = timeline.shift();

        var clevel = level;
        currentLevel = scene.createTimer(
            scene.time,
            levelDuration,
            function(time, ttime, timerTask) {
                console.log("level ended!");
                levelpause = false;
            },
            function(time, ttime, timerTask) {
                if (enemySpawned && !!enemySpawned.time) {
                    if (enemySpawned.time * levelDuration <= ttime) {
                        // spawn
                        var x, y;

                        if (Math.random() > 0.5){
                            y = Math.random() > 0.5 ? 1 : scene.height;
                            x = Math.random() * scene.width;
                        } else {
                            x = Math.random() > 0.5 ? 1 : scene.width;
                            y = Math.random() * scene.height;
                        }

                        var t;

                        switch(enemySpawned.type) {
                            case 0:
                                t = new Bullet(x, y).createBody(world);
                                break;
                            case 1:
                                t = new Knight(x, y).createBody(world);
                                break;
                            case 2:
                                t = new Ghost(x, y).createBody(world);
                                break;
                            case 3:
                                t = new DumbGhost(x, y).createBody(world);
                                break;
                            case 4:
                                t = new Boomer(x, y).createBody(world);
                                break;
                            default:
                                t = new Bullet(x, y).createBody(world);
                        }

                        enemy.push(t);
                        enemyContainer.addChild(t);

                        t.setVelocity(hero.x-x,hero.y-y,3);
                        t.setFrameTime( scene.time, t.lifespan );

                        console.log("spawned enemy type " + enemySpawned.type + " at frame " + ttime+ " "+clevel);
                        enemySpawned = timeline.shift();
                    }
                }
            },
            function(){console.log("canceled "+level);levelpause = false;level--;}
        );


        // while (timeline) {
        //     enemySpawned = timeline.pop();

        // }
    }

    function __cleanUpLevel() {
        // emptyContainer
        // empty arrays
    }

    function __generateLevel(scene) {
        var timeline = [];

        var parseLevel,
            parseEnemy,
            levelJSONLength = levelJSON.length;


        // use level in JSON or modulus of json length.
        // levelJSON[level] ? parseLevel = levelJSON[level]  : levelJSON[level%levelJSONLength];
        parseLevel = levelJSON[level%levelJSONLength];

        // calculate interpolation
        for (var o=0; o < parseLevel.enemy.length;o++) {
            parseEnemy = parseLevel.enemy[o];

            // console.log(parseEnemy.type)
            // console.log(parseEnemy.amount)
            // console.log(parseEnemy.interpolation)

            // Time. value between 0 to 1
            for (var i =0; i < parseEnemy.amount; i++) {
                var obj = new Object();
                obj.type = parseEnemy.type;
                obj.time = Math.random(); // random
                // obj.time = 1 / i; // linear
                timeline.push(obj);
            }

            // console.log(obj + " " + parseEnemy[obj]);
            // type
            // amount
            // interp
            // map to R (linearly);
        }

        // createLinearInterpolator(bPingPong, bInverse)
        // var o = new CAAT.Interpolator().createLinearInterpolator(false, false);
        // createExponentialOutInterpolator(exponent, bPingPong)
        // var j = new CAAT.Interpolator().createExponentialOutInterpolator(2, true);            console.log(o.getPosition());

        // sort timeline by time.
        timeline.sort(function(obj1, obj2) {
            return obj1.time - obj2.time;
        });

        console.log(timeline);

        return timeline;
    }

    function __nextLevel(director, scene, level){
        scene.createTimer(scene.time+6000,1,function(time,ttime,timerTask){
            text.setAlpha(0.0);
            // empty array
            enemy.length = 0;
            powerup.length = 0;

            var timeline = __generateLevel();

            //play music
            director.audioPlay("level1");

            // spawn enemies
            // addEnemies(scene, level);
            __enemySpawner(scene, timeline);

            this.cancel();
        }, null, null);

    }

    function __startLevel(director, scene, level) {

        var temp;

        var getRand = function () {
            return Math.floor((Math.random()*10)+1);
        }
        window.w = director;
        director.endSound();
        // director.audioLoop("music_1");

        // Create container for holding enemies
        enemyContainer = new CAAT.ActorContainer().setBounds(0, 0, scene.width, scene.height);
        powerUpContainer = new CAAT.ActorContainer().setBounds(0, 0, scene.width, scene.height);

        // Randomly generate enemies based on level, addChild to container
        addPowerUp(director, scene);

        // add container to scene
        scene.addChild(enemyContainer,1);
        scene.addChild(powerUpContainer);


        // collision detectiob, enemy

        scene.createTimer( scene.time, Number.MAX_VALUE, null,
            function(time, ttime, timerTask) {

                var entitiesCollision = new CAAT.QuadTree().create( 0,0, scene.width, scene.height, enemyContainer.childrenList  );
                var collide = entitiesCollision.getOverlappingActors( new CAAT.Rectangle().setBounds( hero.x-1, hero.y+1, hero.width+1, hero.height+1) );
                // console.log(collide);

                if ( collide.length >0 ) {
                    console.log("collision");
                    // collision with enemies.

                    __cleanUp(director,scene);

                }
            },
        null);

        // collision detection, power ups
        scene.createTimer( scene.time, Number.MAX_VALUE, null,
            function(time, ttime, timerTask) {
                var entitiesCollision = new CAAT.QuadTree().create( 0,0, scene.width, scene.height, powerup );
                var collide = entitiesCollision.getOverlappingActors( new CAAT.Rectangle().setBounds( hero.x, hero.y, hero.width, hero.height) );
                collide.length ? console.log(collide) : null;
                // for(var i = 0;i<powerUpContainer.length;i++){
                //     powerUpContainer[i].setVelocity(0,0);
                //     console.log(powerUpContainer[i]);
                // }
                if ( collide.length ) {
                    collide[0].pickup(hero);
                    powerUpContainer.removeChild(collide[0]);
                    powerup.removeByValue(collide[0]);
                    collide[0].destroy();

                    // collision with power ups.
                    director.audioPlay("audio_2");

                }
            },
        null);
    }


    function __createLevel( director, scene ) {


        var walls = [];

        walls.push({ AABB: new CAAT.Rectangle().setBounds(0, 0, director.width, wallThickness) }); // top
        walls.push({ AABB: new CAAT.Rectangle().setBounds(0, 0, wallThickness, director.height) }); // left
        walls.push({ AABB: new CAAT.Rectangle().setBounds(director.width - wallThickness, 0, wallThickness, director.height) }); // right
        walls.push({ AABB: new CAAT.Rectangle().setBounds(0, director.height - wallThickness, director.width, wallThickness) }); // bottom

        collision = new CAAT.QuadTree().create(0, 0, director.width, director.height, walls);
    }

    function __cleanUp(director,scene){
        if(hero.die()){
            // kill music
            director.endSound();
            director.audioPlay("death");
            console.log("You have "+hero.lives+" remaining");
            console.log(enemyContainer.childrenList.length);
            enemyContainer.destroy();
            powerUpContainer.destroy();
            enemy = [];
            enemyContainer = new CAAT.ActorContainer().setBounds(0, 0, scene.width, scene.height);
            powerUpContainer = new CAAT.ActorContainer().setBounds(0, 0, scene.width, scene.height);
            // Randomly generate enemies based on level, addChild to container
            addPowerUp(director, scene);
            // add container to scene
            scene.addChild(enemyContainer);
            scene.addChild(powerUpContainer);
            scene.removeChild(joystick);
            scene.addChild(joystick);
            currentLevel.cancel();
           //__nextLevel(scene,level);

        }else{
            director.endSound();
            director.audioPlay("gameover");
            __gameOver(director,scene);
        }
    }

    function __gameOver(director,scene){
        currentLevel.cancel();
        enemyContainer.destroy();
        powerUpContainer.destroy();
        enemy = [];
        enemyContainer = new CAAT.ActorContainer().setBounds(0, 0, director.width, director.height);
        powerUpContainer = new CAAT.ActorContainer().setBounds(0, 0, director.width, director.height);
        scene.addChild(enemyContainer);
        scene.addChild(powerUpContainer);
        scene.removeChild(joystick);
        scene.addChild(joystick);
        scene.removeChild(healthBar);
        scene.removeChild(hero);
        hero =new Player(scene.width/2,scene.height/2).createBody(world);
        scene.addChild(hero);
        // __setKeys( scene, hero );
        healthBar = new HealthBar(200,450,hero.lives);
        scene.addChild(healthBar);
        __deadScreen.prototype.text.setText("Your level: "+(level+2));
        level = -1;
        director.setScene(2);

    }

    window.addEventListener('load', __preload, false);
})();