// Userlist data array for filling in info box
var listemotsData = [];
var listemotsQuizz = [];

// DOM Ready =============================================================
$(document).ready(function() {
    nouveauQuizz();
});

// Functions =============================================================
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function chargePages() {
        var i = 1;
        var tableContent = "";


        for(var i=0; i<listemotsQuizz.length; i++)
        {
            tableContent += '<div data-role="page" id="page'+(i+2)+'">'; 
            tableContent += '    <div data-role="header">';
            tableContent += '        <h1>Suomea quizz</h1>';
            tableContent += '    </div><!-- /header -->';
            tableContent += '    <div data-role="content"> ';
            tableContent += '    <div id="bandeauProposition"> ';
            tableContent += '         <div id="pietimer'+(i+2)+'" class="timerWapper"></div> ';
            tableContent += '    <h1>'+listemotsData[listemotsQuizz[i][0]].mot+'</h1>  '; 
            tableContent += '    </div> ';
            var listeShuffle = shuffle(listemotsQuizz[i].slice());
            for(var indexPropositions=0; indexPropositions<listeShuffle.length; indexPropositions++)
            {
                tableContent += '<a data-role="button" class="buttonProposition" href="javascript:clickMot('+(i+2)+','+listeShuffle[indexPropositions]+')">'+listemotsData[listeShuffle[indexPropositions]].trad+'</a>' ;  
            }
            
            tableContent += '     </div><!-- /content -->';   
            tableContent += '     <div data-role="footer">';
            tableContent += '         <h4>Développé par Rémi GRANZOTTO</h4>';
            tableContent += '     </div><!-- /footer -->';
            tableContent += ' </div><!-- /page -->';
            tableContent += "<script language=\"javascript\">$('#pietimer"+(i+2)+"').pietimer({seconds: 5, color: 'rgba(255, 255, 255, 0.8)', height: 100, width: 100},";
            tableContent += "function(){pieFinished('"+(i+2)+"')});</script>";
        }

        tableContent += '<div data-role="panel" id="right-panel" data-display="push" data-position="right" data-theme="c">';
        tableContent += '    <p>Menu</p>';
        tableContent += '</div><!-- /Menu -->';
        // Inject the whole content string into our existing HTML table
        $('#container').html(tableContent);

        refreshPage();
};

function nouveauQuizz()
{
    // jQuery AJAX call for JSON
    if(listemotsData.length == 0)
    {
        $.getJSON( '/quizz/nouveau', function( data ) {
            // Stick our user data array into a userlist variable in the global object
            listemotsData = data;
            console.log("listeMotData:");
            console.log(listemotsData);
            selectionMotsQuizz();
            console.log("listemotsQuizz:");
            console.log(listemotsQuizz);
            chargePages();
        });
    }
}

function selectionMotsQuizz()
{

    var indexUtilises = [];
    listemotsQuizz = [];
    var index = -1;
    var indexListeMots = 0

    //On boucle jusqu'a 10 fois pour constituer les mots du quizz
    for(var indexQuizz=0; indexQuizz<Math.min(listemotsData.length, 10); indexQuizz++)
    {
        //Choix au hasard d'un mot a afficher: on détermine ici à quel index le lire
        index = -1;
        while(index==-1)
        {
            index = Math.floor(Math.random() * (listemotsData.length));
            if(indexUtilises[index] != true)
            {
                indexUtilises[index] = true;
            }
            else
            {
                index = -1;
            }
        }

        //Choix au hasard de (jusqu'a) 3 propositions
        var indexesPropositions = getArrayPropositions(index, Math.min(listemotsData.length-1, 3));

        //Création d'un tableau de max + 1 valeur: index=0 correspond au mot a deviner, 
        //les (max) autres valeurs à leur propositions. il s'agit des index des mots, pas des mots eux mêmes
        var tabFinal = [];
        tabFinal.push(index);
        for(var nbPropositions=0; nbPropositions<indexesPropositions.length; nbPropositions++)
        {
            tabFinal.push(indexesPropositions[nbPropositions]);
        }
        listemotsQuizz[indexQuizz]=tabFinal;
        indexListeMots++;
    }
}

function getArrayPropositions(indexAExclure, nbMaxPropositions)
{
    var indexPropositionChoisie = -1;
    var indexesPropositions = [];
    var indexesDejaChoisis = [];
    for(var nbPropositions=0; nbPropositions<nbMaxPropositions; nbPropositions++)
    {
        indexPropositionChoisie = -1;
        while(indexPropositionChoisie==-1)
        {
            indexPropositionChoisie = Math.floor(Math.random() * listemotsData.length);
            if(indexesDejaChoisis[indexPropositionChoisie] != true && indexPropositionChoisie!=indexAExclure)
            {
                indexesDejaChoisis[indexPropositionChoisie] = true;
            }
            else
            {
                indexPropositionChoisie = -1;
            }
        }
    indexesPropositions[nbPropositions] = indexPropositionChoisie;
    }
    return indexesPropositions;
}


function refreshPage()
{
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}

function startPie(pie)
{
    $('#pietimer'+pie).pietimer('start');
}

function pieFinished(pie)
{
    $('#pietimer'+pie).html("<div id=\"timeover_"+pie+"\" class=\"status failure\"><br>Time is over!</div>");
    $('#timeover_'+pie).addClass('animated fadeInUp');
    setTimeout("nextWord("+(idPage+1)+")", 1500);
}

function nextWord(idPage)
{
    $.mobile.changePage( "#page"+idPage, { transition: "slide", changeHash: false });
    startPie(idPage);
}

function clickMot(idPage, idMot)
{
    $('#pietimer'+idPage).pietimer('pause');


    if(listemotsData[listemotsQuizz[idPage-2][0]].mot == listemotsData[idMot].mot)
    {
        $('#pietimer'+idPage).html("<img src=\"./images/success.png\" id=\"success_"+idPage+"\" class=\"status success\"/>");
        $('#success_'+idPage).css("display","none");
        $('#success_'+idPage).fadeIn(700);
    }
    else
    {
        $('#pietimer'+idPage).html("<img src=\"./images/failure.png\" id=\"failure_"+idPage+"\" class=\"status failure\"/>");
        $('#failure_'+idPage).css("display","none");
        $('#failure_'+idPage).fadeIn(700);
    }
    setTimeout("nextWord("+(idPage+1)+")", 1500);
}