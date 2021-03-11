// simple function to round-off to 2 decimal places
var handler = function() {
    var rnd = function(n) {
        return Math.round(n * 100) / 100;
    };

    // get user input from the form::::>>>
    var principal = Number(document.getElementById('principal').value); //A
    var interest = Number(document.getElementById('interest').value); //Rn
    var months = Number(document.getElementById('months').value); //N

    // some formulae to aid computations

    // PAYMENTn = (Rn x A) / [ 1- (1+Rn)-N]
    //  PPn = PAYMENTn x (1+Rn) -(1+N-n)
    //  INTn = PAYMENTn – PPn
    //  OBn = OBn-1 – PPn (also OBn = (INTn/Rn) – PPn )

    // compute the monthly interest rate (Rn)
    var i = interest / 100.0 / 12;


    // computing total payments

    // formula:: = PAYMENTn = (Rn x A) / [ 1- (1+Rn)-N] 

    //Rn = interest / 100.0 / 12;
    // A = Number(document.getElementById('principal').value) = principal
    // N = Number(document.getElementById('months').value); = months

    var payment = rnd(principal * (i + i / (Math.pow(1 + i, months) - 1)));

    // print total payments on console
    console.log('total payment::', payment);


    // populate table with computed data:::
    var tabledata = '';
    var m;
    var balance = principal;
    var totalinterest = 0;
    var paymentAmount;
    var intertestAmount;

    // looping through the data to aid populating the table
    for (m = 1; m < months; m++) {
        var tointerest = rnd(balance * i);
        totalinterest = rnd(totalinterest + tointerest);
        var toprincipal = rnd(payment - tointerest);
        balance = rnd(balance - toprincipal);
        paymentAmount = payment; // payment amount
        intertestAmount = rnd(paymentAmount - toprincipal); // difference between payment amount and interest

        var row = '<tr>';
        row += '<td>' + m + '</td>';
        row += '<td>' + paymentAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,") + '</td>';
        row += '<td>' + toprincipal.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,") + '</td>';
        row += '<td>' + intertestAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,") + '</td>';
        row += '<td>' + balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,") + '</td>';
        row += '</tr>';

        tabledata += row;
        document.getElementById('tbl_result').className = 'show';
    }
    // apply data to #tbl_body
    document.getElementById('tbl_body').innerHTML = tabledata;
    console.log("Total computed interest is", totalinterest);


    return false;
}
document.getElementById('btn_calculate').onclick = handler;
