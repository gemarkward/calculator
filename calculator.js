$(function()
{
    let firstNumber;
    let secondNumber;
    let operator;

    function add(a,b)
    {
        return a+b;
    };

    function sub(a,b)
    {
        return a-b;
    };

    function mul(a,b)
    {
        return a*b;
    };

    function div(a,b)
    {
        if (b === 0)
        {
            alert("Nice try, guy.")
        }
        else
        {
            return a/b;
        };
    };

    function operate(a,b,o)
    {
        if (o=="+")
        {
            return add(a,b);
        };
        if (o=="-")
        {
            return sub(a,b);
        };
        if (o=="x")
        {
            return mul(a,b);
        };
        if (o=="/")
        {
            return div(a,b);
        };
    };
});

