// Userlist data array for filling in info box
var listemotsData = [];
var listetypesmotData = [];
var sColTri="mot";
var sSensTri="ASC";
var socket = io();
var idMotModif = "";
var libelleNA = "<span style=\"color:gray; font-style:italic;\">N/A</span>";

// DOM Ready =============================================================
$(document).ready(function() {
    socket.emit('status','client pret');
    // Populate the user table on initial page load
    populateTable(sColTri,sSensTri);

    // Username link click
    $('#listemots table tbody').on('click', 'td a.linkshowmot', showMotInfo);
    // Add User button click
    $('#btnAddMot').on('click', addMot);
    $('#btnAddMot').prop('disabled', true);
    $('#btnAnnuler').on('click', annulerModification);
    $('#btnAnnuler').prop('disabled', true);
    

     socket.on('INSERT', function(msg){
        console.log("INSERT effectué."+msg.status);
        alert("INSERT effectué."+msg.status);
        populateTable(sColTri,sSensTri);
      });
});



// Functions =============================================================

// Fill table with data
function populateTable(sColTriP, sSensTriP) {

    // Empty content string
    var tableContent = '';
    sColTri=sColTriP;
    sSensTri=sSensTriP;
    if(sColTri == undefined || sColTri=="")sColTri="mot";
    if(sSensTri  == undefined || sSensTri=="")sSensTri="ASC";

    // jQuery AJAX call for JSON
    $.getJSON( '/mots/listemots/'+sColTri+'/'+sSensTri, function( data ) {
        // Stick our user data array into a userlist variable in the global object
        listemotsData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowmot" rel="' + this.mot + '">' + this.mot + '</a></td>';
            tableContent += '<td>' + this.trad + '</td>';
            tableContent += '<td>' + (this.numoppitunti=='0'?libelleNA:this.numoppitunti) + '</td>';
            tableContent += '<td>' + (this.codetypemot==''?libelleNA:this.libelletypemot) + '</td>';
            tableContent += '<td><a href="#" class="linkdeletemot" rel="' + this.idtrad + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#listemots table tbody').html(tableContent);
        getComboTypesMot();
        afficheTri(sColTri, sSensTri);
    });
};

function clickBtnAction(event)
{
    if(idMotModif!="")
    {
        //Modification
    }
    else
    {
        addMot(this);
    }
}

function changeTri(mot)
{
    console.log("changeTri("+mot+"). sColTri="+sColTri);
    if(sColTri==mot)
    {
        sSensTri = sSensTri=='ASC'?'DESC':'ASC'; //toggle
    }
    else
    {
        sSensTri = 'ASC';
        sColTri = mot;
    }
    console.log("sSensTri="+sSensTri);
    console.log("sColTri="+sColTri);
    populateTable(sColTri,sSensTri);
}

function afficheTri(mot, sens)
{
    $('.sort').css("display", "none");
    $('#sort'+mot+sens).css("display", "");
}

function appendComboTypesMot(data)
{
    var tableContent = '<option value="" style="color:#BBB">Type de mot</option>';
     $.each(data, function(){
                tableContent += '<option value="'+this.codetypemot+'">'+this.libelletypemot+'</option>';
            });
     return tableContent;
}

function getComboTypesMot(){
    var tableContent = "";

    if(listetypesmotData.length==0)
    {
        // jQuery AJAX call for JSON
        $.getJSON( '/mots/listetypemot', function( data ) {
            // Stick our user data array into a userlist variable in the global object
            listetypesmotData = data;
            // For each item in our JSON, add a table row and cells to the content string
            $('#addMot fieldset select#inputCodetypemot').html(appendComboTypesMot(data));
        });
    }
    else
    {
         $('#addMot fieldset select#inputCodetypemot').html(appendComboTypesMot(listemotsData));
     }
};

// Show User Info
function showMotInfo(event) {
    
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisIdTrad = $(this).attr('rel');


    // Generate an array that only contains the user names
    var IDArray = listemotsData.map(function (arrayItem) {
        return arrayItem.mot;
    });

    var indexOfClickedMot = IDArray.indexOf(thisIdTrad);
    var mot = listemotsData[indexOfClickedMot];


    // Get Index of object based on id value
    var arrayPosition = listemotsData.map(function(arrayItem) {return arrayItem.mot; }).indexOf(thisIdTrad);
    // Get our User Object
    var thisMotObject = listemotsData[arrayPosition];
    //Populate Info Box
    $('#inputMot').val(mot.mot);
    $('#inputTrad').val(mot.trad);
    $('#inputNumoppitunti').val(mot.numoppitunti==null || mot.numoppitunti=='0'?"":mot.numoppitunti);
    $('#inputCodetypemot').val(mot.codetypemot==null?"":mot.codetypemot);
    $('#inputCommentaire').val(mot.commentaire==null?"":mot.commentaire);
    $('#btnAddMot').html("Modifier");
    $('#btnAnnuler').prop('disabled', false);
    idMotModif = thisIdTrad;
    $('#btnAddMot').prop('disabled', false);
};

function annulerModification()
{
    $('#btnAnnuler').prop('disabled', true);
    action = "";
    clearInputs();
    $('#btnAddMot').html("Ajouter");
    $('#btnAddMot').prop('disabled', false);
}

// Add User
function addMot(event) {
    event.preventDefault();


    // Check and make sure errorCount's still at zero
    if($('#addMot fieldset input#inputMot').val()!="" && 
        $('#addMot fieldset input#inputTrad').val()!="") {

        var newMot = {
            'mot': $('#addMot fieldset input#inputMot').val(),
            'trad': $('#addMot fieldset input#inputTrad').val(),
            'numoppitunti': ($('#addMot fieldset input#inputNumoppitunti').val()==""?0:$('#addMot fieldset input#inputNumoppitunti').val()),
            'codetypemot': $('#addMot fieldset select#inputCodetypemot').val(),
            'commentaire': $('#addMot fieldset textarea#inputCommentaire').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newMot,
            url: '/mots/addmot',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.status === 'en cours') {
                clearInputs();                
                // Update the table
                populateTable(sColTri,sSensTri);

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Mot et traduction obligatoires.');
        return false;
    }
};

function clearInputs()
{
    // Clear the form inputs
                $('#addMot fieldset input').val('');
                $('#addMot fieldset textarea').val('');
                $('#addMot fieldset select').val('');
                $('#addMot fieldset select option:eq("")').prop('selected', true);
}