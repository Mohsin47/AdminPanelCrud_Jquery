function AddNewClient() {
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






    $('#Dropdown option:selected').each(function () {
        formData.append("Country", this.value);
    });

    $('#checkbox:checked').each(function () {
        formData.append("IsCsharp", this.value);
    });

    $('#checkboxe:checked').each(function () {
        formData.append("IsPython", this.value);
    });

    $('#checkboxes:checked').each(function () {
        formData.append("IsJava", this.value);
    });







    if (password != confirmpassword) {
        alertify.alert("Your Password does not match with Confirm Password")
    }
    else {
        $.ajax({

            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            url: "/Register/CreateTest",


            //type: "POST",
            //dataType: 'json',
            //url: "/Register/CreateTest",
            //data: formData,


            success: function (Obj) {


            },
            error: function () {
                //your code here
            }
        });
        alertify.alert('Data Is Inserted!');
        $('#form1 input[type="text"]').val('');
        $('#form1 input[type="file"]').val('');
        $('#form1 input[type="password"]').val('');

        var check = $('#checkbox').is(':checked');
        if (check) {
            $('#checkbox').prop('checked', false);
        }


        var chec = $('#checkboxe').is(':checked');
        if (chec) {
            $('#checkboxe').prop('checked', false);
        }
        var che = $('#checkboxes').is(':checked');
        if (che) {
            $('#checkboxes').prop('checked', false);
        }
    }

    //var Country = $("#Dropdown option:selected").val();
    //formData.append("Dropdown", Country);



    //var iscsharp = $("#checkbox:checked").val();
    //formData.append("checkbox", iscsharp);

    //var ispython = $("#checkboxe:checked").val();
    //formData.append("checkboxe", ispython);

    //var isjava = $("#checkboxes:checked").val();
    //formData.append("checkboxes", isjava);


    //Obj.UserName = $("#username").val();;
    //    Obj.FullName = $("#fullname").val();
    //    Obj.LastName = $("#LastName").val();
    //    Obj.Password = $("#Password").val();
    //    Obj.ConfirmPassword = $("#ConfirmPassword").val();
    //    Obj.Address = $("#Address").val();
    //    Obj.Country = $("#Dropdown option:selected").val();
    //    //Obj.IsCsharp = $('#checkboxes').val();
    //    Obj.IsCsharp = $('#checkbox:checked').val();
    //    Obj.IsPython = $('#checkboxe:checked').val();
    //    Obj.IsJava = $('#checkboxes:checked').val();
        //IsPython: $('#checkboxes').val(),
        /*IsJava: $('#checkboxes').val(),*/

     


    
}


function ClearAll() {
    debugger;
    $('#form1 input[type="text"]').val('');
 
    $('#form1 input[type="file"]').val('');

    var check = $('#checkbox').is(':checked');
    if (check) {
        $('#checkbox').prop('checked', false);
    }


    var chec = $('#checkboxe').is(':checked');
    if (chec) {
        $('#checkboxe').prop('checked', false);
    }
    var che = $('#checkboxes').is(':checked');
    if (che) {
        $('#checkboxes').prop('checked', false);
    }
}