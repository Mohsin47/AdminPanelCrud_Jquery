function Details(id) {
    debugger;

    $("#DetailModelLabel").text("Details of Employee")

    debugger;

    $.ajax({

        url: "/Register/Detaisl/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            debugger;
            $("#DetailModelLabel").val("Details Of Employee")
            //$('#Id').val(result.Id);
            $('#user').val(result.userName);
            $('#full').val(result.fullName);
            $('#Last').val(result.lastName);
            $('#Pass').val(result.password);
            $('#Confirm').val(result.confirmPassword);
            $('#Add').val(result.address);


            $("#Drop option:selected").text(result.country.name);



            //This is used to check that if the Value in db is true then output
            //popup will also true

            var isCsharp = result.isCsharp;
            if (isCsharp) {
                $("#checkbo").prop('checked', true);
            }
            else {
                $("#checkbo").prop('checked', false);
            }



            var isPython = result.isPython;

            if (isPython) {
                $('#checkboo').prop('checked', true);
            }
            else {
                $('#checkboo').prop('checked', false);

            }


            var isJava = result.isJava;

            if (isJava) {
                $('#checkbooo').prop('checked', true);
            }
            else {
                $('#checkbooo').prop('checked', false);
            }


            var isActive = result.isActive;
            if (isActive) {
                $('#checkboAc').prop('checked', true);
            }
            else {
                $('#checkboAc').prop('checked', false);
            }




            //$("#checkbo:checked").text(result.isCsharp);
            //$("#checkboo:checked").val(result.isPyhton);
            //$("#checkbooo:checked").val(result.isjava);



            $('#DetailsModels').modal('show');
            $('#btnUpdateClient').show();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}