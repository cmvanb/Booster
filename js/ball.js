// Ball
function Ball(x, y, sprite)
{
    this.x = 0;
    this.y = 0;
    this.sprite = sprite;

    this.minX = 10;
    this.maxX = (spriteRenderer.width - sprite.width) - 10;
    this.minY = 10;
    this.maxY = (spriteRenderer.height - sprite.height) - 10;

    this.prevX = 0;
    this.prevY = 0;

    this.velX = 0;
    this.velY = 0;

    this.launched = false;
};

Ball.prototype.update = function()
{
    if (!this.launched)
    {
        this.x = paddle.x + (paddle.sprite.width / 2) - (this.sprite.width / 2);

        return;
    }

    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.velX;
    this.y += this.velY;

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

    this.velX = 0;
    this.velY = 0;

    this.launched = false;
};

Ball.prototype.launch = function()
{
    if (this.launched == false)
    {
        this.velX = 4;
        this.velY = -6;

        this.launched = true;
    }
};
