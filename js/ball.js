// Ball
function Ball(x, y, sprite)
{
    this.x = 0.0;
    this.y = 0.0;
    this.sprite = sprite;

    this.minX = edgeThickness;
    this.maxX = (spriteRenderer.width - sprite.width) - edgeThickness;
    this.minY = edgeThickness;
    this.maxY = (spriteRenderer.height - sprite.height) - edgeThickness;

    this.velX = 0.0;
    this.velY = 0.0;

    this.launchVelX = -160.0;
    this.launchVelY = -320.0;

    this.launched = false;
};

Ball.prototype.update = function()
{
    if (!this.launched)
    {
        this.x = paddle.x + (paddle.sprite.width / 2.0) - (this.sprite.width / 2.0);

        return;
    }

    this.x += this.velX * deltaTime;
    this.y += this.velY * deltaTime;

    if (this.x < this.minX)
    {
        this.x = this.minX;
        this.velX = -this.velX;
    }
    if (this.x > this.maxX)
    {
        this.x = this.maxX;
        this.velX = -this.velX;
    }
    if (this.y < this.minY)
    {
        this.y = this.minY;
        this.velY = -this.velY;
    }
    if (this.y > spriteRenderer.height)
    {
        this.reset();
    }

    // Collision with paddle.
    if (this.y > paddle.y - this.sprite.height
        && this.x + this.sprite.width > paddle.x
        && this.x < paddle.x + paddle.sprite.width)
    {
        this.y = paddle.y - this.sprite.height;
        this.velY = -this.velY;
    }
};

Ball.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};

Ball.prototype.reset = function()
{
    this.x = paddle.x + (paddle.sprite.width / 2) - (this.sprite.width / 2);
    this.y = paddle.y - this.sprite.height;

    this.velX = 0.0;
    this.velY = 0.0;

    this.launched = false;
};

Ball.prototype.launch = function()
{
    if (this.launched == false)
    {
        this.velX = this.launchVelX;
        this.velY = this.launchVelY;

        this.launched = true;
    }
};
