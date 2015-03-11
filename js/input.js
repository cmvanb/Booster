// InputHandler - Handles keyboard input.
function InputHandler()
{
    this.down = {};
    this.pressed = {};

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
