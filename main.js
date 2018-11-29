
$(document).ready(function () {



    var AnimateAccordion = {
        easing: "easeInOutCirc",
        duration: 1000,
    }

    $("#accordion").accordion({
        animate: AnimateAccordion,
    });


    /******************************/

    var tabTitle = $("#tab_title"),
        tabContent = $("#tab_content"),
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
        tabCounter = 4;

    var tabs = $("#tabs").tabs();

    // Modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function () {
                addTab();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            form[0].reset();
        }
    });

    // AddTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find("form").on("submit", function (event) {
        addTab();
        dialog.dialog("close");
        event.preventDefault();
    });

    // Actual addTab function: adds new tab using the input from the form above
    function addTab() {
        var label = tabTitle.val() || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
            tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
        tabs.tabs("refresh");
        tabCounter++;
    }

    // AddTab button: just opens the dialog
    $("#add_tab")
        .button()
        .on("click", function () {
            dialog.dialog("open");
        });

    // Close icon: removing the tab on click
    tabs.on("click", "span.ui-icon-close", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });

    tabs.on("keyup", function (event) {
        if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
            var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        }
    });
    /**********************************************************/
    $("#newDataTable").click(function () {
        $("#WindowDialog").dialog({
            width: 'auto',
            maxWidth: 600,
            height: 'auto',
            modal: true,
            fluid: true, //new option
            resizable: false
        });
    });

    $("#CancelNewDataTable").click(function () {
        $("#WindowDialog").dialog('close')
    });

    $("#SaveNewDataTable").click(function () {
        var fname = $("#FirstName").val();
        var lname = $("#LastName").val();
        var pnumber = $("#PhoneNumber").val();
    
        var FnameTD = document.createElement("td");
        var lnameTD = document.createElement("td");
        var pnumberTD = document.createElement("td");
    
        FnameTD.append(fname);
        lnameTD.append(lname);
        pnumberTD.append(pnumber);
    
        var tr = document.createElement("tr");
    
        tr.append(FnameTD);
        tr.append(lnameTD);
        tr.append(pnumberTD);
        $(tr).appendTo($("#personalTable"));
        $("#personalTable tbody").append(tr);
        $("#FirstName").val('');
        $("#LastName").val('');
        $("#PhoneNumber").val('');
        addEventsToRow(tr);                   // Here you will add your events to your new row
    });

    $(".controlgroup").controlgroup()
    $(".controlgroup-vertical").controlgroup({
        "direction": "vertical"
    });


    var state = [
        "dolnośląskie",
        "kujawsko-pomorskie",
        "lubelskie",
        "lubuskie",
        "łódzkie",
        "małopolskie",
        "mazowieckie",
        "opolskie",
        "podkarpackie",
        "podlaskie",
        "pomorskie",
        "śląskie",
        "świętokrzyskie",
        "warmińsko-mazurskie",
        "wielkopolskie",
        "zachodniopomorskie"

    ];
    $("#tags").autocomplete({
        source: state
    });

    $("#FirstRegisterDate").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $("#PurchaseDate").datepicker({
        changeMonth: true,
        changeYear: true
    });

    $("#PurchaseDate , #FirstRegisterDate").change(function () {
        var firstRegister = $("#FirstRegisterDate").val();
        var purchaseCar = $("#PurchaseDate").val();


        if (firstRegister >= purchaseCar) {
            AlertData();
        }
        else {
            TurnOffAlertData();
        }
    });

    function AlertData() {
        $("#datealert").slideDown(700, function () {
            setTimeout(function () {
            }, 3000);
        })
    }

    function TurnOffAlertData() {
        $("#datealert").slideUp(700);
    }

    $("#games").selectmenu();

    $("#slider-range-min").slider({
        range: "min",
        value: 37,
        min: 1,
        max: 250,
        slide: function (event, ui) {
            $("#amount").val("$" + ui.value);
        }
    });


    $("#currency").on("change", function () {
        $("#spinner").spinner("option", "culture", $(this).val());
    });

    $("#spinner").spinner({
        min: 160,
        max: 2500,
        step: 5,
        start: 1000,
        numberFormat: "C"
    });


    $("#PurchaseGame").click(function () {
        var TitleGame = $("#games").val();
        var AuctionCost = $("#amount").val();
        var GamePrice = "$" + $("#spinner").val();


        if (AuctionCost == 0 || GamePrice == 0) {
            alert("Dodaj cene do licytacji lub cenę zakupu")
        }
        else {
            $("#dialogGame").dialog({
                width: 'auto',
                maxWidth: 600,
                height: 'auto',
                modal: true,
                fluid: true, 
                resizable: false
            });

            var TitleGameTD = document.createElement("td");
            var AuctionCostTD = document.createElement("td");
            var GamePriceTD = document.createElement("td");

            TitleGameTD.append(TitleGame);
            AuctionCostTD.append(AuctionCost);
            GamePriceTD.append(GamePrice);

            var trG = document.createElement("tr");
            trG.append(TitleGameTD);
            trG.append(AuctionCostTD);
            trG.append(GamePriceTD);

            GameTable = document.getElementById("GameTable");

            GameTable.append(trG);
            $("#dialogGame").show();
        }
    });

    function addEventsToRow(tr)
{

    let checkBox = document.getElementById("ChangeColorRow");
    tr.addEventListener('mouseover',function(e){
        $(this).css('height','40px');
        $(this).css('background','orange');
        $(this).css('transform','scale(1.05)');
        $(this).css('font-size','18px');  
         
    })

    tr.addEventListener('mouseout',function(e){
            $(this).css('height','');
            $(this).css('background','');
            $(this).css('transform','');
            $(this).css('font-size','15px');
              
        }) }

// here  add  events to  tables default rows.
var tablerows = $('tr').not(":first");
for(var i= 0; i <tablerows.length; i+=1) addEventsToRow( tablerows[i])  


       
       
   


   

   
    

   

});
