var DayCount = (function () {
    'use strict';
	
    var msPerHour = 60 * 60 * 1000;
    var msPerDay = 24 * msPerHour;
	var months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

    function toLocalString(d) {
        d = d.clone();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        var s = d.toISOString();
        return s.replace(/T/, " ");
    }

    Date.prototype.hms = function () {  
        return toLocalString(this).substring(11, 19);
    };

    Date.prototype.ymd = function () {
        return toLocalString(this).substring(0, 10)
    };

    Date.prototype.ymdhm = function () {
        return toLocalString(this).substring(0, 16);
    };

    Date.prototype.ymdhms = function () {
        return toLocalString(this).substring(0, 19);
    };

    Date.prototype.mmmyy = function () {
        return months[this.getMonth()] + " " + (this.getFullYear() % 100).toFixed(0);
    };

    Date.prototype.mmmyyyy = function () {
        return months[this.getMonth()] + " " + this.getFullYear().toFixed(0);
    };

    Date.prototype.addHours = function (h) {
        var t = this.getTime();
        return new Date(t + msPerHour * h);
    };

    Date.prototype.totalHours = function () {
        if (isNaN(this.getTime()))
            return NaN;
        var r = this.getHours() + (this.getMinutes() + this.getSeconds() / 60) / 60;
        if (r < 0)
            r += 24;
        else if (r > 24)
            r -= 24;
        return r;
    };

    Date.prototype.date = function () {
        var d = this.clone();
        d.setHours(0, 0, 0, 0);
        return d;
    }

    Date.prototype.clone = function () {
        return new Date(this.getTime());
    }

    Date.prototype.addDays = function (days) {
        return (new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + days, 0, 0, 0))).date();
        //var res = this.clone();
        //res.setDate(res.getDate() + days);
        //return res;
    }

    Date.isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };

    Date.getDaysInMonth = function (year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    Date.prototype.getDaysInMonth = function () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
        var res = this.clone();
        var n = res.getDate();
        res.setDate(1);
        res.setMonth(res.getMonth() + value);
        res.setDate(Math.min(n, res.getDaysInMonth()));
        return res;
    };

    Date.prototype.addYears = function (value) {
        return this.addMonths(12 * value);
    };

    Date.prototype.dayOfYear = function () {
        let start = new Date(Date.UTC(this.getFullYear(), 0, 0));
        return Math.floor((this - start) / msPerDay);
    };

    Date.prototype.monthNumber = function () {
        return 12 * (this.getFullYear() - 1970) + this.getMonth();
    };

    Date.prototype.endOfMonth = function () {
        let m = this.getMonth();
        let y = this.getFullYear();
        return new Date(Date.UTC(y, m, Date.getDaysInMonth(y, m)));
    };

    Date.prototype.lastDayOfMonth = function () {
        return this.endOfMonth();
    };

    Date.prototype.toUnixTime = function () {
        return Math.floor(this.getTime() / 1000);
    }
	
	// Monday starting week day
	Date.prototype.weekDay = function () {
		return (this.getDay() + 6) % 7;
	}

	Date.daysBetween = function (d1, d2) {
		return (d2 - d1) / msPerDay;
	}

	// Month 1-12 !
    Date.fromYmd = function (y, m, d) {
        var d = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
		return d;
	}

	// Swedish week number
	Date.prototype.weekNumber = function () {
		var y = this.getFullYear();
		var firstJan = Date.fromYmd(y, 1, 1);
		var d0 = firstJan.weekDay();
		var w = Math.floor((Date.daysBetween(firstJan, this) + d0) / 7);
		if (d0 < 4)	
			return w + 1;
		if (w >= 1) 
			return w;
		firstJan = Date.fromYmd(y - 1, 1, 1);
		d0 = firstJan.weekDay();
		return Math.floor((Date.daysBetween(firstJan, this) + d0) / 7) + ((d0 >= 4) ? 0 : 1);
	}

    var firstEasterYear = 1990;
    var lastEasterYear = 2040;
    var easterDays = ["1990-04-15", "1991-03-31", "1992-04-19", "1993-04-11", "1994-04-03", "1995-04-16", "1996-04-07",
        "1997-03-30", "1998-04-12", "1999-04-04", "2000-04-23", "2001-04-15", "2002-03-31", "2003-04-20", "2004-04-11", "2005-03-27", "2006-04-16",
        "2007-04-08", "2008-03-23", "2009-04-12", "2010-04-04", "2011-04-24", "2012-04-08", "2013-03-31", "2014-04-20", "2015-04-05", "2016-03-27",
        "2017-04-16", "2018-04-01", "2019-04-21", "2020-04-12", "2021-04-04", "2022-04-17", "2023-04-09", "2024-03-31", "2025-04-20", "2026-04-05",
        "2027-03-28", "2028-04-16", "2029-04-01", "2030-04-21", "2031-04-13", "2032-03-28", "2033-04-17", "2034-04-09", "2035-03-25", "2036-04-13",
        "2037-04-05", "2038-04-25", "2039-04-10", "2040-04-01"].map(d => (new Date(d)).dayOfYear());

    function easterDay(y) {
        var d = (19 * (y % 19) + 24) % 30;
        var e = (2 * (y % 4) + 4 * (y % 7) + 6 * d + 5) % 7;
        var f = d + e;
        var month = ((f + 22) <= 31) ? 3 : 4;
        var day = f + ((month == 3) ? 22 : -9) + (((f - 9) == 26) ? -7 : 0) + (((d == 28) && (e == 6)) ? -7 : 0);
        return Date.fromYmd(y, month, day).dayOfYear();
    }

    Date.prototype.isBusinessDay = function () {
        let w = this.getDay();
        if ((w == 6) || (w == 0))
            return false;
        let m = this.getMonth();
        let d = this.getDate();
        if (m == 0) //jan
            if ((d == 1) || (d == 6))
                return false;
        if (m == 11) //dec
            if ((d == 24) || (d == 25) || (d == 26) || (d == 31))
                return false;
        if (m == 4) //maj
            if (d == 1)
                return false;
        let y = this.getFullYear();
        if (m == 5) { //jun
            if (d == 6)
                return false;
            let w = (new Date(Date.UTC(y, 5, 19))).getDay();
            if (d == (25 - ((w + 1) % 7)))
                return false; // midsommar
        }
        //if ((y >= firstEasterYear) && (y <= lastEasterYear)) {
        let e = this.dayOfYear() - easterDay(y); // easterDays[y - firstEasterYear];
        if ((e == -2) || (e == 1) || (e == 39)) // långfredag, annandag påsk och kristi himmelsfärd
            return false;
        //}
        return true;
    }

    Date.prototype.nextBusinessDay = function () {
        let d = this;
        while (true) {
            d = d.addDays(1);
            if (d.isBusinessDay())
                return d;
        }
    }

    Date.prototype.adjustNextBusinessDay = function () {
        let d = this;
        if (!d.isBusinessDay())
            d = d.nextBusinessDay();
    }

    Date.prototype.previousBusinessDay = function () {
        let d = this;
        while (true) {
            d = d.addDays(-1);
            if (d.isBusinessDay())
                return d;
        }
    }

    Date.prototype.adjustPreviousBusinessDay = function () {
        let d = this;
        if (!d.isBusinessDay())
            d = d.previousBusinessDay();
    }

    Date.prototype.isLastBusinessDayOfMonth = function () {
        return (this.getMonth() != this.nextBusinessDay().getMonth());
    }

    Date.prototype.lastBusinessDayOfMonth = function () {
        let d = this.lastDayOfMonth();
        if (d.isBusinessDay())
            return d;
        return d.previousBusinessDay();
    }
}());

if (typeof DayCount !== 'undefined') {
	DayCount.printMsg = function () {
		console.log();
	}
}

if (typeof module === 'undefined')
    module = {};

module.exports = DayCount;