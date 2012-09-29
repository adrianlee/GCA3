function Bullet(){

}

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