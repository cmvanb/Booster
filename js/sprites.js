// SpriteRenderer - Draws sprites to the canvas.
function SpriteRenderer(width, height)
{
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.context = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
};

SpriteRenderer.prototype.clear = function()
{
    this.context.clearRect(0, 0, this.width, this.height);
};

SpriteRenderer.prototype.drawSprite = function(sprite, x, y)
{
    this.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height,
        x, y, sprite.width, sprite.height);
};

// Sprite - Defines a sprite within an image.
function Sprite(image, x, y, width, height)
{
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};
