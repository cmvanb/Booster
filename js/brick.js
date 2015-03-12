// Brick
function Brick(x, y, sprite)
{
    this.x = x;
    this.y = y;
    this.velY = 0.0;
    this.sprite = sprite;
    this.dropping = false;
    this.alive = true;
};

Brick.prototype.update = function()
{
    if (this.dropping)
    {
        this.y += this.velY * deltaTime;
        this.velY += gravity;

        if (this.y > spriteRenderer.height)
        {
            this.alive = false;
        }

        return;
    }

    // NOTE: Worst. Collision code. Ever.
    var ballLeft = ball.x;
    var ballTop = ball.y;
    var ballRight = ball.x + ball.sprite.width;
    var ballBottom = ball.y + ball.sprite.height;

    var brickLeft = this.x;
    var brickTop = this.y;
    var brickRight = this.x + this.sprite.width;
    var brickBottom = this.y + this.sprite.height;

    var intersectingFromLeft = false;
    var intersectingFromRight = false;
    var intersectingFromTop = false;
    var intersectingFromBottom = false;

    if (rectangleIntersect(ballLeft, ballTop, ballRight, ballBottom,
        brickLeft, brickTop, brickRight, brickBottom))
    {
        if (ballRight >= brickLeft
            && ballRight <= brickRight
            && ballLeft < brickLeft)
        {
            intersectingFromLeft = true;
        }

        if (ballLeft >= brickLeft
            && ballLeft <= brickRight
            && ballRight > brickRight)
        {
            intersectingFromRight = true;
        }

        if (ballBottom >= brickTop
            && ballBottom <= brickBottom
            && ballTop < brickTop)
        {
            intersectingFromTop = true;
        }

        if (ballTop >= brickTop
            && ballTop <= brickBottom
            && ballBottom > brickBottom)
        {
            intersectingFromBottom = true;
        }

        if (intersectingFromLeft)
        {
            if (intersectingFromTop)
            {
                if (ball.velX > 0)
                {
                    if (ball.velY > 0)
                    {
                        var xIntersectLength = ballRight - brickLeft;
                        var yIntersectLength = ballBottom - brickTop;

                        if (xIntersectLength >= yIntersectLength)
                        {
                            // Bounce horizontally.
                            ball.x = brickLeft - ball.sprite.width;
                            ball.velX = -ball.velX;
                            this.onHit();
                            return;
                        }
                        else
                        {
                            // Bounce vertically.
                            ball.y = brickTop - ball.sprite.height;
                            ball.velY = -ball.velY;
                            this.onHit();
                            return;
                        }
                    }
                    else if (ball.velY < 0)
                    {
                        // Bounce horizontally.
                        ball.x = brickLeft - ball.sprite.width;
                        ball.velX = -ball.velX;
                        this.onHit();
                        return;
                    }
                }
                else if (ball.velX < 0)
                {
                    if (ball.velY > 0)
                    {
                        // Bounce vertically.
                        ball.y = brickTop - ball.sprite.height;
                        ball.velY = -ball.velY;
                        this.onHit();
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        // Do nothing, ball is already bouncing away.
                        return;
                    }
                }
            }
            else if (intersectingFromBottom)
            {
                if (ball.velX > 0)
                {
                    if (ball.velY > 0)
                    {
                        // Bounce horizontally.
                        ball.x = brickLeft - ball.sprite.width;
                        ball.velX = -ball.velX;
                        this.onHit();
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        var xIntersectLength = ballRight - brickLeft;
                        var yIntersectLength = brickBottom - ballTop;

                        if (xIntersectLength >= yIntersectLength)
                        {
                            // Bounce horizontally.
                            ball.x = brickLeft - ball.sprite.width;
                            ball.velX = -ball.velX;
                            this.onHit();
                            return;
                        }
                        else
                        {
                            // Bounce vertically.
                            ball.y = brickBottom;
                            ball.velY = -ball.velY;
                            this.onHit();
                            return;
                        }
                    }
                }
                else if (ball.velX < 0)
                {
                    if (ball.velY > 0)
                    {
                        // Do nothing, ball is already bouncing away.
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        // Bounce vertically.
                        ball.y = brickBottom;
                        ball.velY = -ball.velY;
                        this.onHit();
                        return;
                    }
                }
            }
            else
            {
                // Bounce horizontally.
                ball.x = brickLeft - ball.sprite.width;
                ball.velX = -ball.velX;
                this.onHit();
                return;
            }
        }
        else if (intersectingFromRight)
        {
            if (intersectingFromTop)
            {
                if (ball.velX > 0)
                {
                    if (ball.velY > 0)
                    {
                        // Bounce vertically.
                        ball.y = brickTop - ball.sprite.height;
                        ball.velY = -ball.velY;
                        this.onHit();
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        // Do nothing, ball is already bouncing away.
                        return;
                    }
                }
                else if (ball.velX < 0)
                {
                    if (ball.velY > 0)
                    {
                        var xIntersectLength = brickRight - ballLeft;
                        var yIntersectLength = ballBottom - brickTop;

                        if (xIntersectLength >= yIntersectLength)
                        {
                            // Bounce horizontally.
                            ball.x = brickRight;
                            ball.velX = -ball.velX;
                            this.onHit();
                            return;
                        }
                        else
                        {
                            // Bounce vertically.
                            ball.y = brickTop - ball.sprite.height;
                            ball.velY = -ball.velY;
                            this.onHit();
                            return;
                        }
                    }
                    else if (ball.velY < 0)
                    {
                        // Bounce horizontally.
                        ball.x = brickRight;
                        ball.velX = -ball.velX;
                        this.onHit();
                        return;
                    }
                }
            }
            else if (intersectingFromBottom)
            {
                if (ball.velX > 0)
                {
                    if (ball.velY > 0)
                    {
                        // Do nothing, ball is already bouncing away.
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        // Bounce vertically.
                        ball.y = brickBottom;
                        ball.velY = -ball.velY;
                        this.onHit();
                        return;
                    }
                }
                else if (ball.velX < 0)
                {
                    if (ball.velY > 0)
                    {
                        // Bounce horizontally.
                        ball.x = brickRight;
                        ball.velX = -ball.velX;
                        this.onHit();
                        return;
                    }
                    else if (ball.velY < 0)
                    {
                        var xIntersectLength = brickRight - ballLeft;
                        var yIntersectLength = brickBottom - ballTop;

                        if (xIntersectLength >= yIntersectLength)
                        {
                            // Bounce horizontally.
                            ball.x = brickRight;
                            ball.velX = -ball.velX;
                            this.onHit();
                            return;
                        }
                        else
                        {
                            // Bounce vertically.
                            ball.y = brickBottom;
                            ball.velY = -ball.velY;
                            this.onHit();
                            return;
                        }
                    }
                }
            }
            else
            {
                // Bounce horizontally.
                ball.x = brickRight;
                ball.velX = -ball.velX;
                this.onHit();
                return;
            }
        }
        else
        {
            if (intersectingFromTop)
            {
                // Bounce vertically.
                ball.y = brickTop - ball.sprite.height;
                ball.velY = -ball.velY;
                this.onHit();
                return;
            }
            else if (intersectingFromBottom)
            {
                // Bounce vertically.
                ball.y = brickBottom;
                ball.velY = -ball.velY;
                this.onHit();
                return;
            }
            else
            {
                // TODO: Handle edge case: exact middle collision.
                console.log("Oops! this edge case is unhandled. you may see weird behavior.");
                return;
            }
        }
    }
};

Brick.prototype.draw = function()
{
    spriteRenderer.drawSprite(this.sprite, this.x, this.y);
};

Brick.prototype.onHit = function()
{
    this.dropping = true;

    ball.onHitBrick();
};
