Template.addProject.events({
    'click #startDateButton':function (evt, tmpl) {
        $('#inpStartDate').trigger('click');
    }
    'change #inpStartDate':function (evt, tmpl) {
        //meteor add momentis:moment
        var _date = new Date($('#inpStartDate').val());
        var str_date = moment(_date).format('YYYY-MM-DD');
        $('#startDateButton').text(str_date);
    }
})
