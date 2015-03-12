// Level Generator
function LevelGenerator()
{
    this.maxColumns = 7;
    this.maxRows = 16;
};

LevelGenerator.prototype.generate = function()
{
    // Randomly determine what rows and columns will have bricks.
    var columnChance = 0.7 + (getRandom() * 0.3);
    var columns = Math.ceil(columnChance * this.maxColumns);
    var rowChance = 0.3 + (getRandom() * 0.7);
    var rows = Math.ceil(columnChance * this.maxColumns);
    var brickSpots = Create2DArray(this.maxRows);

    for (var x = 0; x < this.maxColumns; ++x)
    {
        for (var y = 0; y < this.maxRows; ++y)
        {
            brickSpots[x][y] = false;
        }
    }

    while (columns > 0)
    {
        for (var x = 0; x < this.maxColumns; ++x)
        {
            if (getRandom() < 0.9)
            {
                continue;
            }

            for (var y = 0; y < this.maxRows; ++y)
            {
                brickSpots[x][y] = true;
            }

            --columns;
        }
    }

    while (rows > 0)
    {
        for (var y = 0; y < this.maxRows; ++y)
        {
            if (getRandom() < 0.9)
            {
                continue;
            }

            for (var x = 0; x < this.maxColumns; ++x)
            {
                brickSpots[x][y] = true;
            }

            --rows;
        }
    }

    // Find the side with more gaps and mirror it for some nice symmetry.
    var leftSideGaps = 0;

    for (var x = 0; x < Math.floor(this.maxColumns / 2); ++x)
    {
        for (var y = 0; y < this.maxRows; ++y)
        {
            if (brickSpots[x][y] == false)
            {
                ++leftSideGaps;
            }
        }
    }

    var rightSideGaps = 0;

    for (var x = this.maxColumns - Math.floor(this.maxColumns / 2); x < this.maxColumns; ++x)
    {
        for (var y = 0; y < this.maxRows; ++y)
        {
            if (brickSpots[x][y] == false)
            {
                ++rightSideGaps;
            }
        }
    }

    if (leftSideGaps == 0)
    {
        // choose right
        brickSpots = this.mirror(false, brickSpots);
    }
    else if (rightSideGaps == 0)
    {
        // choose left
        brickSpots = this.mirror(true, brickSpots);
    }
    else if (leftSideGaps > rightSideGaps)
    {
        // choose right
        brickSpots = this.mirror(false, brickSpots);
    }
    else if (rightSideGaps > leftSideGaps)
    {
        // choose left
        brickSpots = this.mirror(true, brickSpots);
    }
    else
    {
        // choose at random
        brickSpots = this.mirror(getRandom() > 0.5 ? true : false, brickSpots);
    }

    // Fill bricks array.
    bricks = [];

    for (var x = 0; x < this.maxColumns; ++x)
    {
        for (var y = 0; y < this.maxRows; ++y)
        {
            if (brickSpots[x][y] == true)
            {
                var b = new Brick(
                    40 + x * brickSprite1.width,
                    40 + y * brickSprite1.height,
                    brickSprite1);

                bricks.push(b);
            }
        }
    }

    return bricks;
};

LevelGenerator.prototype.mirror = function(leftSide, brickSpots)
{
    if (leftSide)
    {
        for (var x = 0; x < Math.floor(this.maxColumns / 2); ++x)
        {
            for (var y = 0; y < this.maxRows; ++y)
            {
                brickSpots[(this.maxColumns - 1) - x][y] = brickSpots[x][y];
            }
        }
    }
    else
    {
        for (var x = this.maxColumns - Math.floor(this.maxColumns / 2); x < this.maxColumns; ++x)
        {
            var realX = (Math.floor(this.maxColumns / 2) - 1) - (x - Math.floor(this.maxColumns / 2) - 1);

            for (var y = 0; y < this.maxRows; ++y)
            {
                brickSpots[realX][y] = brickSpots[x][y];
            }
        }
    }

    return brickSpots;
};
