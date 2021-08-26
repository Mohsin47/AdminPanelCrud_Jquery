function Editdata(id) {

    debugger;



    $("#AddUpdateModelLabel").text("Update Client Detail")
    //ClearAllInput();
    $.ajax({
        url: "/Register/EditDatas/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            debugger;
            $("#AddUpdateModelLabel").val("Update Client Detail")
            $('#Id').val(result.id);
            $('#username').val(result.userName);
            $('#fullname').val(result.fullName);
            $('#LastName').val(result.lastName);
            $('#Password').val(result.password);
            $('#ConfirmPassword').val(result.confirmPassword);
            $('#Address').val(result.address);


            $("#Dropdown option:selected").text(result.country.name);
            


            //This is used to check that if the Value in db is true then output
            //popup will also true

            var isCsharp =result.isCsharp;
            if (isCsharp) {
                $("#checkbox").prop('checked', true);
            }
            else {
                $("#checkbox").prop('checked', false);
            }



            var isPython = result.isPython;

            if (isPython) {
                $('#checkboxe').prop('checked', true);
            }
            else {
                $('#checkboxe').prop('checked', false);
                
            }


            var isJava = result.isJava;

            if (isJava) {
                $('#checkboxes').prop('checked', true);
            }
            else {
                $('#checkboxes').prop('checked', false);
            }


            var isActive = result.isActive;
            if (isActive) {
                $('#checkboxesAc').prop('checked', true);
            }
            else {
                $('#checkboxesAc').prop('checked', false);
            }

            //this is used to get the value 
            // $('#checkboxes:checked').val(result.isjava);

            //$('#Id').html(result.Id);
            //$('#username').html(result.UserName);
            //$('#fullname').html(result.FullName);
            //$('#LastName').html(result.LastName);
            //$('#Password').html(result.Password);
            //$('#ConfirmPassword').html(result.ConfirmPassword);
            //$('#Address').html(result.Address);


            $('#AddUpdateModel').modal('show');
            $('#btnUpdateClient').show();
            //$('#btnAddClient').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });



}

function UpdateClient() {

    debugger;

    var formData = new FormData();
    filepath = "";
    if (File != "") {
        var HoldNameofFile = "";
        var totalFiles = document.getElementById("file").files.length;
        for (var i = 0; i < totalFiles; i++) {
            var file = document.getElementById("file").files[i];
            HoldNameofFile = file.name;
            formData.append("file", file);

        }
    }

       
    var Id = $('#Id').val();
    formData.append("Id", Id);

    var username = $("#username").val();
    formData.append("UserName", username);

    var fullname = $("#fullname").val();
    formData.append("FullName", fullname);

    var lastName = $("#LastName").val();
    formData.append("LastName", lastName);


    var password = $("#Password").val();
    formData.append("Password", password);

    var confirmpassword = $("#ConfirmPassword").val();
    formData.append("ConfirmPassword", confirmpassword);

    var address = $("#Address").val();
    formData.append("Address", address);


    //To get the Selected Dropdown value
    var country = $('#Country :selected').val();
    formData.append("Country", country);


    //To get the Selected Chekbox value
    var check = $('#checkbox').is(':checked');
    
      formData.append("IsCsharp", check);
  
    var chec = $('#checkboxe').is(':checked');
    formData.append("IsPython", chec);

    var che = $('#checkboxes').is(':checked');
    formData.append("IsJava", che);


    //var UserObj = {
    //    Id: $('#Id').val(),
    //    UserName: $('#username').val(),
    //    FullName: $('#fullname').val(),
    //    LastName: $('#LastName').val(),
    //    Password: $('#Password').val(),
    //    ConfirmPassword: $('#ConfirmPassword').val(),
    //    Address: $('#Address').val(),
    //    //IsCsharp: $('input[type="checkbox"]:checked'),
    //    //IsPython: $('input[type="checkbox"]:checked'),
    //    //IsJava: $('input[type="checkbox"]:checked')
    //    IsCsharp: $('#checkbox:checked').val(),
    //    IsPython: $('#checkboxe:checked').val(),
    //    IsJava: $('#checkboxes:checked').val(),
    //    IsActive: $('#checkboxesAc:checked').val()
    // /*   Image:()*/
    //    //Details: $('#txtDetails').val(),
    //};
 
    debugger;

    $.ajax({
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        url: "/Register/UpdateClient",




        //type: "POST",
        ////dataType: "json",
        //url: "/Register/UpdateClient",
        //data: formData,
        ////contentType: "application/json;charset=utf-8",
        success: function (result) {

            alertify.alert("Your Record Has been Updated Succesfully");

            setTimeout(function () {// wait for 5 secs(2)
                location.reload(); // then reload the page.(3)
            }, 2000);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

