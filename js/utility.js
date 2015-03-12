// Utility functions

function rectangleIntersect(
    r1left, r1top, r1right, r1bottom,
    r2left, r2top, r2right, r2bottom)
{
    return !(r2left > r1right
        || r2right < r1left
        || r2top > r1bottom
        || r2bottom < r1top);
}

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom()
{
    return Math.random();
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function Create2DArray(rows)
{
    var array = [];

    for (var i = 0; i < rows; ++i)
    {
        array[i] = [];
    }

    return array;
}

function Clamp(val, min, max)
{
    return Math.min(Math.max(val, min), max);
};
