var dc = require('./daycount.js')

function testYear(y) {
    var d = new Date(Date.UTC(y, 0, 1, 0, 0, 0));
    var s = 0;
    while (true) {
        d = d.nextBusinessDay();
        //console.log(d.ymd());
        if (d.getFullYear() > y)
            return s;
        s += d.getDate();
    }
}

// 2001 - 3928
// 2002 - 3925
// 2003 - 3903
// 2004 - 3991
// 2005 - 3969
// 2006 - 3960
// 2007 - 3949
// 2008 - 3945
// 2009 - 3943
// 2010 - 3970
// 2011 - 3978
// 2012 - 3956
// 2013 - 3925
// 2014 - 3903
// 2015 - 3964
// 2016 - 3979
// 2017 - 3960
// 2018 - 3939
// 2019 - 3893
// 2020 - 3986
function test1() {
    for (var i = 2001; i <= 2020; i++) {
        console.log(i + " - " + testYear(i))
    }
}

function test2() {
    var d;

    d = new Date(Date.UTC(2016, 2, 24, 0, 0, 0));
    console.log("Påsk: " + d.ymd() + " => " + d.nextBusinessDay().ymd());

    d = new Date(Date.UTC(2016, 5, 23, 0, 0, 0));
    console.log("Midsommar: " + d.ymd() + " => " + d.nextBusinessDay().ymd());
}

function range(start, edge, step) {
  if (arguments.length == 1) {
    edge = start;
    start = 0;
  }
  edge = edge || 0;
  step = step || 1;
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

// 2010 => 53,53,53,1,1,1,1
// 2011 => 52,52,1,1,1,1,1
// 2012 => 52,1,1,1,1,1,1
// 2013 => 1,1,1,1,1,1,2
// 2014 => 1,1,1,1,1,2,2
// 2015 => 1,1,1,1,2,2,2
// 2016 => 53,53,53,1,1,1,1
function testWeekNumber() {
	for (var y = 2010; y <= 2016; y++) {
		var ds = range(7).map(d => Date.fromYmd(y,1,1+d)).map(d => d.weekNumber());
		console.log(y + " => " + ds.join(','));
	}
}

test1();
test2();
testWeekNumber();

var d = new Date();
console.log(["hms","ymd","ymdhm","ymdhms","mmmyy","mmmyyyy"].map(g=>d[g]()));

