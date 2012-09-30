function PowerUp(item) {
    PowerUp.superclass.constructor.call(this);
    this.item = item;
            img = this.bomb;
            this.setScale(0.7, 0.7);
 
    

    this.setBackgroundImage( img, true );

    // set random position, 50px padding.
    this.setLocation(50+Math.random()*700, 50+Math.random()*400);

    // console.log(window.scene);
    // window.scene.createTimer(
    //     0,
    //     2000,
    //     function(scene_time, timer_time, timertask_instance)  {
    //         // timeout
    //         console.log("timedout");
    //     },
    //     function(scene_time, timer_time, timertask_instance)  {
    //         // tick
    //         console.log("asd");
    //     },
    //     function(scene_time, timer_time, timertask_instance)  {
    //         // cancel
    //     }
    // );

    return this;
}

PowerUp.prototype = {
    pickup: function() {
        console.log("You've got an item!");
    },


};

extend(PowerUp, CAAT.Actor)