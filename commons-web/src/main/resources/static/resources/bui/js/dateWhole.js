/**
 * 计算整年整月整日
 * @startDate 开始日期
 * endDate 结束日期
*/

function wholeDateCalc(startDate, endDate) {
    var wholeYear = 0, wholeMonth = 0, WholeDay = 0;
    var startYear = moment(startDate).get('year');
    var startMonth = moment(startDate).get('month');
    var startDay = moment(startDate).get('date');

    var endYear = moment(endDate).get('year');
    var endMonth = moment(endDate).get('month');
    var endDay = moment(endDate).get('date');

    if(moment(endDate).isBefore(startDate)){
        $('#result').text('结束时间不能早于开始时间');
        return false;
    }

    if(startMonth == 0 && startDay == 1) {
        if (endMonth == 11 && endDay == 31) {
            // 1.1&&12.31 即年初年末时: 前后都取整年,直接计算整年其余为0;如2018-01-01&&2020-12-31
            wholeYear = endYear - startYear + 1;
            wholeMonth = 0;
            WholeDay = 0;
        } else if(endDay == moment(endDate).endOf('month').format("DD")){
            // 1.1&&!12.31,&&月末, 即年初非年末但月末时: 前取整年后取月天为0, 如果当年0,跨1年1,跨2年为2;如2018-01-01&&2020-11-30
            wholeYear = endYear - startYear;
            wholeMonth = endMonth + 1;
            WholeDay = 0;
        } else {
            // 1.1&&!12.31,&&非月末, 即年初非年末非月末时: 如2018-01-01&&2020-11-03
            wholeYear = endYear - startYear;
            wholeMonth = endMonth;
            WholeDay = endDay;
        }
    }else if(startDay == 1) {
        if (endMonth == 11 && endDay == 31) {
            // 非年初但月初且年末: 前取月天0,后取年 ;如2018-02-01&&2020-12-31
            wholeYear = endYear - startYear
            wholeMonth = 12 - startMonth;
            WholeDay = 0;
        } else if(endDay == moment(endDate).endOf('month').format("DD")){
            // 非年初但月初且非年末但月末 前后都取月中间取年, 如果当年0,跨1年1,跨2年为2;如2018-02-01&&2020-11-30
            wholeYear = endYear > startYear ? endYear - startYear - 1 : endYear - startYear
            if (endYear > startYear) {
                wholeMonth = (12 - startMonth) + (endMonth + 1);
            } else if (endYear == startYear){
                wholeMonth = endMonth - startMonth + 1;
            }
            WholeDay = 0;
        } else {
            // 非年初但月初且非年末非月末 前取月中间去年后取月天, 如2018-02-01&&2020-11-3
            wholeYear = endYear > startYear ? endYear - startYear - 1 : endYear - startYear;
            if (endYear > startYear) {
                wholeMonth = (12 - startMonth) + endMonth;
            } else if (endYear == startYear){
                wholeMonth = endMonth - startMonth;
            }
            WholeDay = endDay;
        }
    } else {
        if (endMonth == 11 && endDay == 31) {
            // 非年初非月初且年末: 前取月天,后取年 ;如2018-02-08&&2020-12-31
            wholeYear =  endYear - startYear
            wholeMonth = 12 - startMonth - 1;
            WholeDay = moment(startDate).endOf('month').format("DD") - startDay + 1;
        } else if(endDay == moment(endDate).endOf('month').format("DD")){
            // 非年初非月初且非年末但月末 前取月天后取月中间取年, 如果当年0,跨1年1,跨2年为2;如2018-02-08&&2020-11-30
            wholeYear = endYear > startYear ? endYear - startYear - 1 : endYear - startYear;
            wholeMonth = endYear > startYear ? (12 - startMonth - 1) + (endMonth + 1) : endMonth - startMonth;
            WholeDay = moment(startDate).endOf('month').format("DD") - startDay + 1;
        } else {
            // 非年初非月初且非年末非月末 前后都取月天中间取年, 如2018-02-08&&2020-11-3
            wholeYear = endYear > startYear ? endYear - startYear - 1 : endYear - startYear
            // wholeMonth = endYear > startYear  ? (12 - startMonth - 1) + endMonth  : endMonth - startMonth - 1 ;
            // WholeDay = endMonth > startMonth  ? moment(startDate).endOf('month').format("DD") - startDay + 1 + endDay : endDay - startDay + 1;
            if (endYear > startYear) {
                wholeMonth = (12 - startMonth - 1) + endMonth;
                WholeDay = moment(startDate).endOf('month').format("DD") - startDay + 1 + endDay;
            } else if (endYear == startYear){
                if(endMonth > startMonth){
                    wholeMonth = endMonth - startMonth - 1;
                    WholeDay = moment(startDate).endOf('month').format("DD") - startDay + 1 + endDay;
                } else {
                    wholeMonth = endMonth - startMonth;
                    WholeDay = endDay - startDay + 1;
                }
            }
        }
    }
    console.log('wholeYear: ' + wholeYear + '  wholeMonth:' + wholeMonth + '  WholeDay: ' + WholeDay)
}