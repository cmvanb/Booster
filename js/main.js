// Game

var spriteRenderer;
var inputHandler;
var levelGenerator;
var paddleSprite;
var paddle;
var ballSprite;
var ball;
var brickSprite1;
var bricks;

var edgeThickness = 0;
var gravity = 9.81;
var terminalVelocity = 400.0;

var deltaTime = 0.0;
var lastFrameTime = 0.0;

function main()
{
    spriteRenderer = new SpriteRenderer(640, 480);
    inputHandler = new InputHandler();
    levelGenerator = new LevelGenerator();

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

    bricks = levelGenerator.generate();
};

function cleanUp()
{
    delete paddle;
    delete ball;
    delete bricks;
};

function gameLoop()
{
    update();
    draw();

    window.requestAnimationFrame(gameLoop, spriteRenderer.canvas);
};

function update()
{
    var currentTime = Date.now();

    deltaTime = (currentTime - lastFrameTime) / 1000.0;
    lastFrameTime = currentTime;

    paddle.update();
    ball.update();

    var bricksDead = 0;

    for (var i = 0; i < bricks.length; ++i)
    {
        if (bricks[i].alive)
        {
            bricks[i].update();
        }
        else
        {
            ++bricksDead;
        }
    }

    if (bricksDead == bricks.length)
    {
        console.log("Game over! New game.");
        cleanUp();
        setup();
    }
};

function draw()
{
    spriteRenderer.clear();

    for (var i = 0; i < bricks.length; ++i)
    {
        if (bricks[i].alive)
        {
            bricks[i].draw();
        }
    }

    paddle.draw();
    ball.draw();
};

main();
