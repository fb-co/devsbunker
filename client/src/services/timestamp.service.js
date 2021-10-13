const TimeStampService = {
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    convertToDate: function(timestamp, showMonth, showDay, showYear) {
        let dateObj;

        // conver to date object requires parmater to be parsed to int if requried
        if (Number.isInteger(timestamp)) {
            dateObj = new Date(timestamp);
        } else {
            dateObj = new Date(parseInt(timestamp));
        }

        let finalTimeStamp = 
            (showMonth ? this.monthNames[dateObj.getMonth()] : "") + 
            (showDay ? " " + dateObj.getDate() : "") + ", " + 
            (showYear ? dateObj.getFullYear() : "");

        return finalTimeStamp;
    }
};

export default TimeStampService;