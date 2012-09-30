function PowerUp(x, y, item) {
    PowerUp.superclass.constructor.call(this);
    this.item = item;

    switch (item) {
        case 0:
            img = this.bomb;
            break;
        case 1:
            img = this.mushroom;
            break;
        default:
            img = this.bomb;
    }

    this.setBackgroundImage( img, true );
    this.setLocation(x, y);
    this.setScale(0.7, 0.7);
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
        this.disappear();
    },

    disappear: function() {
        console.log("Item disappeared");
        this.setVisible(false);
        this.enableEvents(false);
        window.powerup.removeByValue(this);
    }
};

extend(PowerUp, CAAT.Actor)