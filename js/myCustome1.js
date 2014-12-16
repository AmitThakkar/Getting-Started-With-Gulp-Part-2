/**
 * Created by Amit Thakkar on 10/12/14.
 */
var module1 = (function () {
    var myCustomFunction1 = function () {
        console.log("My Custom Code.");
    };
    return {
        myCustomFunction1: myCustomFunction1
    }
}());
module1.myCustomFunction1();