var projeAdi = "İsimlendirilmeyen Proje";
var isVerenFirma = "Tanımsız";

var insaatAlani = 1;

var tarihBas;
var tarihSon;
var tarihSonFormat;
var isSure = 1;

var dolarK;
var euroK;
var sterlinK;

var maliyet;
var fark;
var fiyatKirmaYuzde;

var isBedeli;

var isTnm1 = "tanımsız iş";
var isTnm2 = "tanımsız iş";

var toplamYuzde;
var isBedelElkYuzde = 0;
var isBedelMakYuzde = 0;
var isBedelInsYuzde = 0;
var isBedelTnm1Yuzde = 0;
var isBedelTnm2Yuzde = 0;

var elkBedelSoz;
var makBedelSoz;
var insBedelSoz;
var tnm1BedelSoz;
var tnm2BedelSoz;

var alanTlSoz;
var alanDlSozar;
var makAlanTlSozani;
var insAlanTlSozani;

var elkAlanDlSoz;
var makAlanDlSoz;
var insAlanDlSoz;

var tutarToplam = 0;

var sayTikla = 0;

$(document).ready(function () {
    $("#dolarKur").tooltip();
    var symbolTl = " ₺ ";
    var symbolDl = " $ ";
    //--------------------------------------------------yeni proje butona tıklandıgında
    $("#yProje").click(function () {
        if ($("#projeAd").val() == null || $("#projeAd").val() == "" || $("#projeAd").val() == " ") {

        } else {
            projeAdi = $("#projeAd").val();
        }
        if ($("#isVerenFirma").val() == null || $("#isVerenFirma").val() == "" || $("#isVerenFirma").val() == " ") {

        } else {
            isVerenFirma = $("#isVerenFirma").val();
        }

        if ($("#isAlani").val() > 0) {
            insaatAlani = $("#isAlani").val();
        }
        $("#isAlanGoster").val(insaatAlani);

        if ($("#isSure").val() >= 0) {
            isSure = $("#isSure").val();
        }

        //------------------------Tarih
        tarihBas = new Date($("#isBaslamaTarih").val());
        tarihSon = new Date($("#isBaslamaTarih").val());
        if ($("#isBaslamaTarih").val() == "") {
            tarihBas = new Date();
            tarihSon = new Date();
        }
        tarihSon.setDate(tarihSon.getDate() + parseInt(isSure));
        tarihSonFormat = tarihSon.getDate() + "." + (tarihSon.getMonth() + 1) + "." + tarihSon.getFullYear();
        $("#teslimTarihGoster").val(tarihSonFormat);

        //toggle
        if (sayTikla == 0) {
            $("#tablolar").toggle("drop");
            $("footer").attr("class", "position-static p-2 bg-dark text-light text-center h6 m-0");
            $("#farkMaliyetTbl").toggle();
            $("#yProje").text("Güncelle");
            sayTikla++;
        } else {
            $.hesapla();
        }
        $.kontrolYuzde();
    });
    /*   Hesapla Fonksiyon   */
    $.hesapla = function () {
        dolarK = $("#dolarKur").val();
        elkBedelSoz = (isBedeli * isBedelElkYuzde / 100);
        makBedelSoz = (isBedeli * isBedelMakYuzde / 100);
        insBedelSoz = (isBedeli * isBedelInsYuzde / 100);
        $("#elkBedelSoz").val(formatMyMoney((elkBedelSoz)));
        $("#makBedelSoz").val(formatMyMoney((makBedelSoz)));
        $("#insBedelSoz").val(formatMyMoney(insBedelSoz));

        alanTlSoz = isBedeli / insaatAlani;
        alanDlSoz = alanTlSoz / dolarK;

        elkAlanTlSoz = elkBedelSoz / insaatAlani;
        makAlanTlSoz = makBedelSoz / insaatAlani;
        insAlanTlSoz = insBedelSoz / insaatAlani;

        elkAlanDlSoz = elkAlanTlSoz / dolarK;
        makAlanDlSoz = makAlanTlSoz / dolarK;
        insAlanDlSoz = insAlanTlSoz / dolarK;



        $("#alanTlSoz").val(formatMyMoney(alanTlSoz));
        $("#alanDlSoz").val(formatMyMoney2(alanDlSoz));

        $("#elkAlanTlSoz").val(formatMyMoney(elkAlanTlSoz));
        $("#makAlanTlSoz").val(formatMyMoney(makAlanTlSoz));
        $("#insAlanTlSoz").val(formatMyMoney(insAlanTlSoz));

        $("#elkAlanDlSoz").val(formatMyMoney2((elkAlanDlSoz)));
        $("#makAlanDlSoz").val(formatMyMoney2((makAlanDlSoz)));
        $("#insAlanDlSoz").val(formatMyMoney2((insAlanDlSoz)));

        tnm1BedelSoz = 0;
        tnm2BedelSoz = 0;
        if (isBedelTnm1Yuzde >= 0) {
            tnm1BedelSoz = (isBedeli * isBedelTnm1Yuzde / 100);
            $("#isTanimiTutar1").val(formatMyMoney((tnm1BedelSoz)));
            $("#tnmAlanTlSoz1").val(formatMyMoney((tnm1BedelSoz) / insaatAlani));
            $("#tnmAlanDlSoz1").val(formatMyMoney2(((tnm1BedelSoz) / insaatAlani) / dolarK));
        }
        if (isBedelTnm2Yuzde >= 0) {
            tnm2BedelSoz = (isBedeli * isBedelTnm2Yuzde / 100);
            $("#isTanimiTutar2").val(formatMyMoney((tnm2BedelSoz)));
            $("#tnmAlanTlSoz2").val(formatMyMoney((tnm2BedelSoz) / insaatAlani));
            $("#tnmAlanDlSoz2").val(formatMyMoney2(((tnm2BedelSoz) / insaatAlani) / dolarK));
        }

        tutarToplam = elkBedelSoz + makBedelSoz + insBedelSoz + tnm1BedelSoz + tnm2BedelSoz;
        $("#tutarToplam").val(formatMyMoney(tutarToplam));

    }
    /*   kontrolYuzde Fonksiyon   */
    $.kontrolYuzde = function () {
        toplamYuzde = isBedelElkYuzde + isBedelMakYuzde + isBedelInsYuzde + isBedelTnm1Yuzde + isBedelTnm2Yuzde;
        $("#yuzdeToplam").val(toplamYuzde);
        if (parseInt(toplamYuzde) == 100) {
            $("#yuzdeToplam").css("background", "#fff").css("color", "#495057");
            $("#bildiri1").hide();
            $.hesapla();
            if (isBedelTnm1Yuzde > 0) {
                if ($("#isTanimi1").val() == null || $("#isTanimi1").val() == "" || $("#isTanimi1").val() == " ") {
                    $("#bildiri1").show(100, function () {
                        $(this).html("<h4>Tanımsız İş Bulunmakta..!</h4>").addClass("alert-warning").removeClass("alert-danger");
                        $(this).delay(1000).hide(1000);
                    });
                }
            }
            if (isBedelTnm2Yuzde > 0) {
                if ($("#isTanimi2").val() == null || $("#isTanimi2").val() == "" || $("#isTanimi2").val() == " ") {
                    $("#bildiri1").show(100, function () {
                        $(this).html("<h4>Tanımsız İş Bulunmakta..!</h4>").addClass("alert-warning").removeClass("alert-danger");
                        $(this).delay(1000).hide(1000);
                    });
                }
            }
        } else {
            $("#yuzdeToplam").css("background", "#ee172b").css("color", "#fff");
        }
        if (parseInt(toplamYuzde) == 495) {
            alert("Hayrola Canın mı Sıkıldı ? :D");
            $("#yuzdeToplam").css("background", "#0fe").css("color", "#495057");
        }

    }
    /*  yuzdeler on click   */
    $("#elkYuzdeSoz").on("input", function () {
        if (parseInt($("#elkYuzdeSoz").val()) >= 0) {
            isBedelElkYuzde = parseInt($("#elkYuzdeSoz").val());
        }
        $.kontrolYuzde();
    });
    $("#makYuzdeSoz").on("input", function () {
        if (parseInt($("#makYuzdeSoz").val()) >= 0) {
            isBedelMakYuzde = parseInt($("#makYuzdeSoz").val());
        }
        $.kontrolYuzde();
    });
    $("#insYuzdeSoz").on("input", function () {
        if (parseInt($("#insYuzdeSoz").val()) >= 0) {
            isBedelInsYuzde = parseInt($("#insYuzdeSoz").val());
        }
        $.kontrolYuzde();
    });
    $("#isTanimiYuzde1").on("input", function () {
        if (parseInt($("#isTanimiYuzde1").val()) >= 0) {
            isBedelTnm1Yuzde = parseInt($("#isTanimiYuzde1").val());
        }
        $.kontrolYuzde();
    });
    $("#isTanimiYuzde2").on("input", function () {
        if (parseInt($("#isTanimiYuzde2").val()) >= 0) {
            isBedelTnm2Yuzde = parseInt($("#isTanimiYuzde2").val());
        }
        $.kontrolYuzde();
    });
    /*  iş tanımlama */
    $("#isTanimi1").on("input", function () {
        isTnm1 = $("#isTanimi1").val();
        $("#anlzTnm1").val(isTnm1);
        $("#alanTnm1").val(isTnm1);
    });
    $("#isTanimi2").on("input", function () {
        isTnm2 = $("#isTanimi2").val();
        $("#anlzTnm2").val(isTnm2);
        $("#alanTnm2").val(isTnm2);
    });
    $("#bildiri1").hide();
    /* sözleşmeye istinaden iş bedel değiştiğinde */
    $("#isBedeliSoz").on("input", function () {
        isBedeli = $("#isBedeliSoz").val();
        if (toplamYuzde == 100) {
            $.hesapla();
            $("#bildiri1").hide();
        } else {
            $("#bildiri1").show(1, function () {
                $(this).html("<h4>Yüzdelik Hesabı Hatalı..!</h4>").addClass("alert-danger").removeClass("alert-warning");
            });
        }
    });
    $("#isBedeliSoz").click(function () {
        $(this).val(isBedeli);
    });
    $("#isBedeliSoz").mouseleave(function () {
        $("#isBedeliSoz").val(formatMyMoney(isBedeli));
        $("#isBedeliSoz").blur();
    });
    /*  Dolar Kur Değiştiğinde */
    $("#dolarKur").on("input", function () {
        if (toplamYuzde == 100) {
            $.hesapla();
        }
    });

    /* Tl Format */
    function formatMyMoney(price) {
        var formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
        });
        return formattedOutput.format(price).replace(this.symbolTl);
    }
    /* Dolar Format */
    function formatMyMoney2(price) {
        var formattedOutput = new Intl.NumberFormat('US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
        return formattedOutput.format(price).replace(this.symbolDl);
    }

























});












/*

<!doctype html>
<html>
  <head>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script>
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() 
      {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['iş',     44],
          ['elektrik',      54],
          ['makine',  20],
          ['inşaat', 20],

        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>



*/