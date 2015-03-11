// Utility functions

function rectangleIntersect(
    r1left, r1top, r1right, r1bottom, 
    r2left, r2top, r2right, r2bottom)
{
    return !(r2left > r1right ||
           r2right < r1left ||
           r2top > r1bottom ||
           r2bottom < r1top);;
}
