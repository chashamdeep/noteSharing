$('document').ready(function(){

  var latestUrl = "http://acadprojects.com/py/notes/sharing/note";
  getNotes(latestUrl);

    function getNotes(dataUrl)
    {
      $("#loader").css('display', 'block');

      $.ajax({
        url: dataUrl,
        type: "GET",
        success: function(result){
            console.log(result);

            $("#studyMaterials tbody").empty();
            $("#questionPapers tbody").empty();
            $("#projectReports tbody").empty();

            var myNotes = result.notes;

            var length = myNotes.length;

            var countStudyMaterial = 0;
            var countQuestionPaper = 0;
            var countProjectReport = 0;

            for(var i = 0;i<length;i++)
            {
              var noteObject = myNotes[i];

              var notesName = noteObject.doc_name;
              var description = noteObject.doc_description;
              var subject = noteObject.subject.subject;
              var url = noteObject.doc_url;

              var type = noteObject.document_type;

              if(type == 'Study Material')
              {
                countStudyMaterial++;
                $('#studyMaterials tbody').append('<tr> <td> ' + countStudyMaterial +' </td> <td>'+notesName+'</td> <td>'+description+'</td> <td>'+subject+'</td> <td><a target="_blank" href="'+url+'">Download</a></td> </tr>');

              }
              else if(type == 'Question Papers')
              {
                countQuestionPaper++;
                $('#questionPapers tbody').append('<tr> <td> ' + countQuestionPaper +' </td> <td>'+notesName+'</td> <td>'+description+'</td> <td>'+subject+'</td> <td><a target="_blank" href="'+url+'">Download</a></td> </tr>');

              }
              else if(type == 'Project Report')
              {
                countProjectReport++;
                $('#projectReports tbody').append('<tr> <td> ' + countProjectReport +' </td> <td>'+notesName+'</td> <td>'+description+'</td> <td>'+subject+'</td> <td><a target="_blank" href="'+url+'">Download</a></td> </tr>');

              }


            }

            $("#loader").css('display','none');

        }});
    }

    $('#arts').on('click', function(){


      $("#notesNavigation ul li").removeClass('active');

      $(this).parent().addClass('active');

      var url = "https://acadprojects.com/py/notes/sharing/note?category=arts";
      getNotes(url);
    });

    $("#engineering").on('click', function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "https://acadprojects.com/py/notes/sharing/note?category=engineering";
      getNotes(url);

    });

    $("#science").on('click', function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "https://acadprojects.com/py/notes/sharing/note?category=science";
      getNotes(url);

    });

    $("#maths").on('click', function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "https://acadprojects.com/py/notes/sharing/note?category=mathematics";
      getNotes(url);

    });

    $("#latest").on('click', function(){
      $("#notesNavigation ul li").removeClass('active');
      $(this).parent().addClass('active');

      var url = "https://acadprojects.com/py/notes/sharing/note";
      getNotes(url);

    });

$("#submitBtn").on('click', function(){
      var docName = $("#fileName").val();
      var docDescription = $("#description").val();

      var subject = $("#subject").val();
      var documenType = $("#documentType").val();

      var myFile = $("input[type=file]")[0].files[0];


      if(docName == undefined || docName == "")
      {
        alert("Please fill Document Name");
        return false;
      }

      if(docDescription == undefined || docDescription == "")
      {
        alert("Please fill Document Description");
        return false;
      }

      if(subject == undefined || subject == "")
      {
        alert("Please Select Subject");
        return false;
      }

      if(documenType == undefined || documenType == "")
      {
        alert("Please Select Document type");
        return false;
      }

      if(myFile == undefined || myFile == "")
      {
        alert("Please Select a file to upload");
        return false;
      }

      $("#loader").css('display', 'block');

      var formdata = new FormData();

      formdata.append('file', myFile);
      formdata.append('document_type' , documenType);
      formdata.append('doc_description' , docDescription);
      formdata.append('doc_name' , docName);
      formdata.append('category' , subject);

      $.ajax({
        url: 'https://acadprojects.com/py/notes/sharing/note',
        data: formdata,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function(result)
        {
          alert("Submitted");

          $("#loader").css('display', 'none');
          location.reload();
        }
      });
  });

});
