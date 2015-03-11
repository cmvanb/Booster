// Brick
function Brick(x, y, sprite)
{
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Brick.prototype.update = function()
{
};

Brick.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};
