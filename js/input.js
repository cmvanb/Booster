// InputHandler - Handles keyboard input.
function InputHandler()
{
    this.down = {};
    this.pressed = {};
    this.ipadTilt = 0.0;
    this.touch = false;

    var _this = this;

    document.addEventListener("keydown", function(event)
    {
        _this.down[event.keyCode] = true;
    });
    document.addEventListener("keyup", function(event)
    {
        delete _this.down[event.keyCode];
        delete _this.pressed[event.keyCode];
    });
    window.addEventListener("deviceorientation", function(event)
    {
        _this.ipadTilt = event.beta;
        document.getElementById("ipadTiltVar").innerHTML = Math.round(_this.ipadTilt);
    }, false);

    document.body.addEventListener("touchstart", function(event)
    {
        _this.touch = true;
    }, false);
    document.body.addEventListener("touchend", function(event)
    {
        _this.touch = false;
    }, false);
    document.body.addEventListener("touchcancel", function(event)
    {
        _this.touch = false;
    }, false);
    document.body.addEventListener("touchleave", function(event)
    {
        _this.touch = false;
    }, false);
};

InputHandler.prototype.isDown = function(keyCode)
{
    return this.down[keyCode];
};

InputHandler.prototype.isPressed = function(keyCode)
{
    if (this.pressed[keyCode])
    {
        return false;
    }
    else if (this.down[keyCode])
    {
        return this.pressed[keyCode] = true;
    }

    return false;
};
