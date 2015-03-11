// Game

var spriteRenderer;
var inputHandler;
var paddleSprite;
var paddle;
var ballSprite;
var ball;
var brickSprite1;
var bricks;
var edgeThickness = 0;

function main()
{
    spriteRenderer = new SpriteRenderer(640, 480);
    inputHandler = new InputHandler();

    var image = new Image();
    image.addEventListener("load", function()
    {
        paddleSprite = new Sprite(this, 0, 416, 80, 16);
        ballSprite = new Sprite(this, 16, 368, 16, 16);
        brickSprite1 = new Sprite(this, 480, 80, 80, 16);
        setup();

        // Start game loop.
        window.requestAnimationFrame(gameLoop, spriteRenderer.canvas);
    });
    image.src = "resources/more_breakout_pieces_0.png";
};

function setup()
{
    paddle = new Paddle(
        (spriteRenderer.width - paddleSprite.width) / 2,
        spriteRenderer.height - paddleSprite.height - 20,
        paddleSprite);

    ball = new Ball(
        (spriteRenderer.width - ballSprite.width) / 2,
        (spriteRenderer.height - ballSprite.height) / 2,
        ballSprite);
    ball.reset();

    var horizontalBricks = 7;
    var verticalBricks = 8;

    bricks = [];

    for (var h = 0; h < horizontalBricks; ++h)
    {
        for (var v = 0; v < verticalBricks; ++v)
        {
            var b = new Brick(
                40 + h * brickSprite1.width,
                40 + v * brickSprite1.height,
                brickSprite1);

            bricks.push(b);
        }
    }

    var b2 = new Brick(
        340,
        360,
        brickSprite1);

    bricks.push(b2);
};

function gameLoop()
{
    update();
    draw();

    window.requestAnimationFrame(gameLoop, spriteRenderer.canvas);
};

function update()
{
    paddle.update();
    ball.update();

    for (var i = 0; i < bricks.length; ++i)
    {
        bricks[i].update();
    }
};

function draw()
{
    spriteRenderer.clear();

    for (var i = 0; i < bricks.length; ++i)
    {
        bricks[i].draw();
    }

    paddle.draw();
    ball.draw();
};

main();
