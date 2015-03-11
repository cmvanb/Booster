// Brick
function Brick(x, y, sprite)
{
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Brick.prototype.update = function()
{
    // Collision with ball.
    if (ball.x + ball.sprite.width > this.x
        && ball.x < this.x + this.sprite.width)
    {
        if (ball.y + ball.sprite.height > this.y
            && ball.y < this.y + this.sprite.height)
        {
            // If the ball came from above the brick...
            if (ball.prevY < this.y
                && ball.velY > 0)
            {
                ball.y = this.y - ball.sprite.height;
            }

            // If the ball came from below the brick...
            if (ball.prevY > this.y + this.sprite.height
                && ball.velY < 0)
            {
                ball.y = this.y + this.sprite.height;
            }

            // Bounce!
            ball.velY = -ball.velY;
        }
    }
};

Brick.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};

Brick.prototype.onHit = function()
{

};
