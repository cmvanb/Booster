// Paddle
function Paddle(x, y, sprite)
{
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.minX = 10;
    this.maxX = (spriteRenderer.width - sprite.width) - 10;
};

Paddle.prototype.update = function()
{
    if (inputHandler.isDown(37)) // Left arrow.
    {
        this.x -= 8;
    }
    if (inputHandler.isDown(39)) // Right arrow.
    {
        this.x += 8;
    }
    if (inputHandler.isDown(38)) // Up arrow.
    {        
        ball.launch();
    }
    if (this.x < this.minX)
    {
        this.x = this.minX;
    }
    if (this.x > this.maxX)
    {
        this.x = this.maxX;
    }
};

Paddle.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};
