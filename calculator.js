$(function()
{
    // Elements used for calculator display
    const mainDisplayText = $('#mainDisplayText');
    const historyDisplayText = $('#historyDisplayText');
    
    // Used to decide whether to continue calculating or start fresh
    let calculated = true;

    // Calculation variables
    let firstNumber;
    let secondNumber;
    let operator;

    // Used to store the last calculated value for display
    let historyValue = 0;

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
        if (o=="%")
        {
            return div(a,b);
        };
    };

    function parse(str)
    {
        let answer;
        str = str.split(" ");
        while (str.length>0)
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
                            firstNumber = parseFloat(historyDisplayText.text());
                        }
                        else
                        {
                            firstNumber = parseFloat(answer);
                        };
                    }
                    else
                    {
                        secondNumber = parseFloat(nextEntry);
                        console.log(firstNumber+" "+operator+" "+secondNumber);
                        answer = operate(firstNumber, secondNumber, operator);
                        firstNumber = answer;
                        secondNumber = null;
                        operator = null;
                    };
                }
                else
                {
                    firstNumber = parseFloat(nextEntry);
                };
            }
            else
            {
                operator = nextEntry;
            };
        };
        console.log(answer);
        answer = parseFloat(answer.toFixed(30));
        calculated = true;
        mainDisplayText.text(answer.toString());
        historyDisplayText.text(historyValue.toString());
        historyValue = answer;
        answer = null;
    };

    $(".button").click(function(){
        if ($(this).text() == "=")
        {
            parse(mainDisplayText.text());
        }
        else if ($(this).attr('id') == 'clear')
        {
            mainDisplayText.text("");
            historyDisplayText.text("");
        } 
        else
        {
            if (calculated)
            {
                if (isNumber($(this).text()))
                {
                    historyDisplayText.text(mainDisplayText.text());
                    mainDisplayText.text("");
                };
                calculated = false;
            }
            if (!isNumber($(this).text()) && !isNumber(mainDisplayText.text()[mainDisplayText.text().length-1]))
            {
                return 0;
            };
            mainDisplayText.text(mainDisplayText.text()+$(this).text());
        }
    });
});

