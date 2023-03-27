$(function()
{
    // Elements used for calculator display
    const mainDisplayText = $('#mainDisplayText');
    const historyDisplayText = $('#historyDisplayText');
    mainDisplayText.fit
    
    // Used to decide whether to continue calculating or start fresh
    let calculated = true;

    // Calculation variables
    let firstNumber;
    let secondNumber;
    let operator;

    // Used to store the last calculated value for display
    let historyValue = 0;

    // Determine if input is a number
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
        // Check for divide by zero
        if (b === 0)
        {
            mainDisplayText.text("0");
            alert("Nice try, guy.")
        }
        else
        {
            return a/b;
        };
    };

    // Perform calculations from parsed input
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

    // Parse input and return answer from calculations
    function calculate(str)
    {
        // Initialize answer variable to perform multiple operations from single input
        let answer;

        // Split string input into array of numbers and operators
        str = str.split(" ");

        // Process all items - FIFO
        while (str.length>0)
        {

            // Take first object of the remaining input array
            nextEntry = str.shift();
            if (isNumber(nextEntry))
            {
                // Case - nextEntry is a number and an operator exists - Calculate
                if (operator != null)
                {

                    // Assign secondNumber
                    secondNumber = parseFloat(nextEntry);

                    // Caculate firstNumber operator secondNumber ex: 1 + 1
                    answer = operate(firstNumber, secondNumber, operator);

                    // Set firstNumber to answer for any additional operations
                    firstNumber = answer;

                    // Initialize secondNumber and operator
                    secondNumber = null;
                    operator = null;
                }

                // Case - nextEntry is a number and there is no operator - Set firstNumber to nextEntry
                else
                {
                    firstNumber = parseFloat(nextEntry);
                };
            }

            // Case - nextEntry is an operator - Set the variable
            else
            {
                operator = nextEntry;
            };
        };
        // Round answer to a max of 30 decimal places
        answer = parseFloat(answer.toFixed(30));

        // Set bool for clear/continue decision
        calculated = true;

        // Update displays
        mainDisplayText.text(answer.toString());
        historyDisplayText.text(historyValue.toString());

        // Store answer for future history display
        historyValue = answer;
    };

    // Function to run when buttons are clicked
    $(".button").click(function(){

        // Case - Input is "=" - send to calculate function
        if ($(this).text() == "=")
        {
            calculate(mainDisplayText.text());
        }

        // Case - input is the Clear button - initialize displays
        else if ($(this).attr('id') == 'clear')
        {
            mainDisplayText.text("0");
            historyDisplayText.text("0");
        } 

        else
        {
            // Case - user tries to input incorrect "."
            if ($(this).text() == ".")
            {
                if (mainDisplayText.text().includes("."))
                {
                    return 0;
                }
            }
            // Case - the main display has a previously calculated answer
            if (calculated)
            {   
                // Case - answer exists on display and input is a number - Move display to history and start new equation
                if (isNumber($(this).text()))
                {
                    historyDisplayText.text(mainDisplayText.text());
                    mainDisplayText.text("");
                };

                // Uncalculated input has been taken - Toggle calculated flag
                calculated = false;
            }

            // Case - User attempted to input multiple operators in a row.
            if (!isNumber($(this).text()) && !isNumber(mainDisplayText.text()[mainDisplayText.text().length-1]))
            {
                return 0;
            };
            
            // Append input to end of display string
            mainDisplayText.text(mainDisplayText.text()+$(this).text());
        }
    });
});

