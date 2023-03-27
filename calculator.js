$(function()
{
    let firstNumber;
    let secondNumber;
    let operator;
    let mainDisplay = 0;
    let historyDisplay = 0;

    function isNumber(val) 
    {
        return !isNaN(val);
    }

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

    function parse(str)
    {
        let answer;
        str = str.split(" ");
        while (str)
        {
            nextEntry = str.shift();
            if (isNumber(nextEntry))
            {
                if (operator != null)
                {
                    if (firstNumber == null)
                    {
                        if (answer == null)
                        {
                            firstNumber = historyDisplay;
                        }
                        else
                        {
                            firstNumber = answer;
                        };
                    }
                    else
                    {
                        secondNumber = nextEntry;
                        answer = operate(firstNumber, secondNumber, operator)
                        firstNumber = secondNumber = operator = null;
                    };
                }
                else
                {
                    firstNumber = nextEntry;
                };
            }
            else
            {
                operator = nextEntry;
            };
        };
    };
});

