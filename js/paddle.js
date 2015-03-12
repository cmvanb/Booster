// Paddle
function Paddle(x, y, sprite)
{
    this.x = x;
    this.y = y;
    this.velX = 0.0;
    this.velY = 0.0;
    this.sprite = sprite;

    this.minX = edgeThickness;
    this.maxX = (spriteRenderer.width - sprite.width) - edgeThickness;

    this.moveSpeed = 600.0;
};

Paddle.prototype.update = function()
{
    if (inputHandler.isDown(37)) // Left arrow.
    {
        this.velX = -this.moveSpeed;
    }
    else if (inputHandler.isDown(39)) // Right arrow.
    {
        this.velX = this.moveSpeed;
    }
    else
    {
        this.velX = 0.0;
    }

    if (inputHandler.isDown(38)) // Up arrow.
    {
        ball.launch();
    }
    if (inputHandler.isDown(40)) // Down arrow.
    {
        ball.reset();
    }
    if (this.x < this.minX)
    {
        this.x = this.minX;
    }
    if (this.x > this.maxX)
    {
        this.x = this.maxX;
    }

    this.x += this.velX * deltaTime;
    this.y += this.velY * deltaTime;
};

Paddle.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};
