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

var isBedeli = 0;

var isTnm1 = "tanımsız iş";
var isTnm2 = "tanımsız iş";

var toplamYuzde;
var isBedelElkYuzde = 0;
var isBedelMakYuzde = 0;
var isBedelInsYuzde = 0;
var isBedelTnm1Yuzde = 0;
var isBedelTnm2Yuzde = 0;

var elkBedelSoz = 0;
var makBedelSoz = 0;
var insBedelSoz = 0;
var tnm1BedelSoz = 0;
var tnm2BedelSoz = 0;

var tnm1AlanTlSoz = 0;
var tnm1AlanDlSoz = 0;

var alanTlSoz = 0;
var alanDlSozar = 0;
var makAlanTlSozani = 0;
var insAlanTlSozani = 0;

var elkAlanDlSoz = 0;
var makAlanDlSoz = 0;
var insAlanDlSoz = 0;

var tutarToplam = 0;
var alanTlToplam = 0;
var alanDlToplam = 0;

var tutarToplamAnlz = 0;
var alanTlToplamAnlz = 0;
var alanDlToplamAnlz = 0;

var sayTikla = 0;

var elkBedelAnlz = 0;
var makBedelAnlz = 0;
var insBedelAnlz = 0;
var tnm1BedeAnlz = 0;
var tnm2BedeAnlz = 0;

var alanTlAnlz = 0;
var alanDlAnlz = 0;

var elkAlanTlAnlz = 0;
var elkAlanDlAnlz = 0;

var makAlanTlAnlz = 0;
var makAlanDlAnlz = 0;

var insAlanTlAnlz = 0;
var insAlanDlAnlz = 0;

var isTanimiYuzdeTlA1 = 0;
var isTanimiYuzdeDlA1 = 0;

var isTanimiYuzdeTlA2 = 0;
var isTanimiYuzdeDlA2 = 0;

var alanTlAlan = 0;
var alanDlAlan = 0;

/*Jquery hazir oldugunda*/
$(document).ready(function () {

    $("#dolarKur").tooltip();
    $("#euroKur").tooltip();
    $("#SterlinKur").tooltip();

    var symbolTl = " ₺ ";
    var symbolDl = " $ ";

    $("#isBedeliSoz").val(isBedeli);


    $("#elkYuzdeSoz").val(isBedelElkYuzde);
    $("#makYuzdeSoz").val(isBedelMakYuzde);
    $("#insYuzdeSoz").val(isBedelInsYuzde);
    $("#isTanimiYuzde1").val(isBedelTnm1Yuzde);
    $("#isTanimiYuzde2").val(isBedelTnm2Yuzde);

    $("#isTanimiYuzdeA1").val(isBedelTnm1Yuzde);
    $("#isTanimiYuzdeA2").val(isBedelTnm2Yuzde);

    $("#isTanimiYuzdeAA1").val(isBedelTnm1Yuzde);
    $("#isTanimiYuzdeAA2").val(isBedelTnm2Yuzde);

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
            $("#BtnOnizleme").removeClass("d-none");
            $("#yProje").text("Güncelle");
            sayTikla++;
        } else {
            $.hesapla();
            $.hesapla2();
            $.hesapla3();
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
        tnm1AlanTlSoz = 0;
        tnm1AlanDlSoz = 0;
        if (isBedelTnm1Yuzde >= 0) {
            tnm1BedelSoz = (isBedeli * isBedelTnm1Yuzde / 100);
            tnm1AlanTlSoz = (tnm1BedelSoz) / insaatAlani;
            tnm1AlanDlSoz = ((tnm1BedelSoz) / insaatAlani) / dolarK;

            $("#isTanimiTutar1").val(formatMyMoney((tnm1BedelSoz)));
            $("#tnmAlanTlSoz1").val(formatMyMoney(tnm1AlanTlSoz));
            $("#tnmAlanDlSoz1").val(formatMyMoney2(tnm1AlanDlSoz));
        }
        if (isBedelTnm2Yuzde >= 0) {
            tnm2BedelSoz = (isBedeli * isBedelTnm2Yuzde / 100);
            tnm2AlanTlSoz = (tnm2BedelSoz) / insaatAlani;
            tnm2AlanDlSoz = ((tnm2BedelSoz) / insaatAlani) / dolarK;

            $("#isTanimiTutar2").val(formatMyMoney((tnm2BedelSoz)));
            $("#tnmAlanTlSoz2").val(formatMyMoney(tnm2AlanTlSoz));
            $("#tnmAlanDlSoz2").val(formatMyMoney2(tnm2AlanDlSoz));
        }

        tutarToplam = elkBedelSoz + makBedelSoz + insBedelSoz + tnm1BedelSoz + tnm2BedelSoz;
        alanTlToplam = elkAlanTlSoz + makAlanTlSoz + insAlanTlSoz + tnm1AlanTlSoz + tnm2AlanTlSoz;
        alanDlToplam = elkAlanDlSoz + makAlanDlSoz + insAlanDlSoz + tnm1AlanDlSoz + tnm2AlanDlSoz;
        $("#tutarToplam").val(formatMyMoney(tutarToplam));
        $("#alanTlToplam").val(formatMyMoney(alanTlToplam));
        $("#alanDlToplam").val(formatMyMoney2(alanDlToplam));

    }



    /*   Hesapla 2 Fonksiyon   */
    $.hesapla2 = function () {
        isBedeliAnlz = elkBedelAnlz * 100 / isBedelElkYuzde;

        makBedelAnlz = isBedeliAnlz * isBedelMakYuzde / 100;
        insBedelAnlz = isBedeliAnlz * isBedelInsYuzde / 100;
        tnm1BedeAnlz = isBedeliAnlz * isBedelTnm1Yuzde / 100;
        tnm2BedeAnlz = isBedeliAnlz * isBedelTnm2Yuzde / 100;

        alanTlAnlz = isBedeliAnlz / insaatAlani;
        alanDlAnlz = isBedeliAnlz / insaatAlani / dolarK;

        elkAlanTlAnlz = elkBedelAnlz / insaatAlani;
        elkAlanDlAnlz = elkBedelAnlz / insaatAlani / dolarK;

        makAlanTlAnlz = makBedelAnlz / insaatAlani;
        makAlanDlAnlz = makBedelAnlz / insaatAlani / dolarK;

        insAlanTlAnlz = insBedelAnlz / insaatAlani;
        insAlanDlAnlz = insBedelAnlz / insaatAlani / dolarK;

        $("#isBedeliAnlz").val(formatMyMoney(isBedeliAnlz));
        $("#alanTlAnlz").val(formatMyMoney(alanTlAnlz));
        $("#alanDlAnlz").val(formatMyMoney2(alanDlAnlz));

        $("#elkAlanTlAnlz").val(formatMyMoney(elkAlanTlAnlz));
        $("#elkAlanDlAnlz").val(formatMyMoney2(elkAlanDlAnlz));

        $("#makBedelAnlz").val(formatMyMoney(makBedelAnlz));
        $("#makAlanTlAnlz").val(formatMyMoney(makAlanTlAnlz));
        $("#makAlanDlAnlz").val(formatMyMoney2(makAlanDlAnlz));

        $("#insBedelAnlz").val(formatMyMoney(insBedelAnlz));
        $("#insAlanTlAnlz").val(formatMyMoney(insAlanTlAnlz));
        $("#insAlanDlAnlz").val(formatMyMoney2(insAlanDlAnlz));

        if (isBedelTnm1Yuzde >= 0) {
            isTanimiYuzdeTlA1 = tnm1BedeAnlz / insaatAlani;
            isTanimiYuzdeDlA1 = tnm1BedeAnlz / insaatAlani / dolarK
            $("#isTanimiAnlz1").val(formatMyMoney(tnm1BedeAnlz));
            $("#isTanimiYuzdeTlA1").val(formatMyMoney(isTanimiYuzdeTlA1));
            $("#isTanimiYuzdeDlA1").val(formatMyMoney2(isTanimiYuzdeDlA1));
        }

        if (isBedelTnm2Yuzde >= 0) {
            isTanimiYuzdeTlA2 = tnm2BedeAnlz / insaatAlani
            isTanimiYuzdeDlA2 = tnm2BedeAnlz / insaatAlani / dolarK;
            $("#isTanimiAnlz2").val(formatMyMoney(tnm2BedeAnlz));
            $("#isTanimiYuzdeTlA2").val(formatMyMoney(isTanimiYuzdeTlA2));
            $("#isTanimiYuzdeDlA2").val(formatMyMoney2(isTanimiYuzdeDlA2));
        }

        tutarToplamAnlz = elkBedelAnlz + makBedelAnlz + insBedelAnlz + tnm1BedeAnlz + tnm2BedeAnlz;
        alanTlToplamAnlz = elkAlanTlAnlz + makAlanTlAnlz + insAlanTlAnlz + isTanimiYuzdeTlA1 + isTanimiYuzdeTlA2;
        alanDlToplamAnlz = elkAlanDlAnlz + makAlanDlAnlz + insAlanDlAnlz + isTanimiYuzdeDlA1 + isTanimiYuzdeDlA2;
        $("#tutarToplamAnlz").val(formatMyMoney(tutarToplamAnlz));
        $("#alanTlToplamAnlz").val(formatMyMoney(alanTlToplamAnlz));
        $("#alanDlToplamAnlz").val(formatMyMoney2(alanDlToplamAnlz));
    }

    /*   Hesapla 3 Fonksiyon   */
    $.hesapla3 = function () {
        var isBedeliAlan = insaatAlani * alanTlAlan;
        alanDlAlan = alanTlAlan / dolarK;

        elkAlanTlAlan = alanTlAlan * isBedelElkYuzde / 100;
        elkAlanDlAlan = elkAlanTlAlan / dolarK;
        elkBedelAlan = elkAlanTlAlan * insaatAlani;

        makAlanTlAlan = alanTlAlan * isBedelMakYuzde / 100;
        makAlanDlAlan = makAlanTlAlan / dolarK;
        makBedelAlan = makAlanTlAlan * insaatAlani;

        insAlanTlAlan = alanTlAlan * isBedelInsYuzde / 100;
        insAlanDlAlan = insAlanTlAlan / dolarK;
        insBedelAlan = insAlanTlAlan * insaatAlani;

        $("#isBedeliAlan").val(formatMyMoney(isBedeliAlan));
        $("#alanDlAlan").val(formatMyMoney2(alanDlAlan));

        $("#elkBedelAlan").val(formatMyMoney(elkBedelAlan));
        $("#elkAlanTlAlan").val(formatMyMoney(elkAlanTlAlan));
        $("#elkAlanDlAlan").val(formatMyMoney2(elkAlanDlAlan));

        $("#makBedelAlan").val(formatMyMoney(makBedelAlan));
        $("#makAlanTlAlan").val(formatMyMoney(makAlanTlAlan));
        $("#makAlanDlAlan").val(formatMyMoney2(makAlanDlAlan));

        $("#insBedelAlan").val(formatMyMoney(insBedelAlan));
        $("#insAlanTlAlan").val(formatMyMoney(insAlanTlAlan));
        $("#insAlanDlAlan").val(formatMyMoney2(insAlanDlAlan));

        if (isBedelTnm1Yuzde >= 0) {
            isTanimiTl1Alan = alanTlAlan * isBedelTnm1Yuzde / 100;
            isTanimiDl1Alan = isTanimiTl1Alan / dolarK;
            isTanimiTutar1Alan = isTanimiTl1Alan * insaatAlani;
            $("#isTanimiTl1Alan").val(formatMyMoney(isTanimiTl1Alan));
            $("#isTanimiDl1Alan").val(formatMyMoney(isTanimiDl1Alan));
            $("#isTanimiTutar1Alan").val(formatMyMoney2(isTanimiTutar1Alan));
        }

        if (isBedelTnm2Yuzde >= 0) {
            isTanimiTl2Alan = alanTlAlan * isBedelTnm2Yuzde / 100;
            isTanimiDl2Alan = isTanimiTl2Alan / dolarK;
            isTanimiTutar2Alan = isTanimiTl2Alan * insaatAlani;
            $("#isTanimiTl2Alan").val(formatMyMoney(isTanimiTl2Alan));
            $("#isTanimiDl2Alan").val(formatMyMoney(isTanimiDl2Alan));
            $("#isTanimiTutar2Alan").val(formatMyMoney2(isTanimiTutar2Alan));
        }

        tutarToplamAlan = elkBedelAlan + makBedelAlan + insBedelAlan + isTanimiTutar1Alan + isTanimiTutar2Alan;
        alanTlToplamAlan = elkAlanTlAlan + makAlanTlAlan + insAlanTlAlan + isTanimiTl1Alan + isTanimiTl2Alan;
        alanDlToplamAlan = elkAlanDlAlan + makAlanDlAlan + insAlanDlAlan + isTanimiDl1Alan + isTanimiDl2Alan;
        $("#tutarToplamAlan").val(formatMyMoney(tutarToplamAlan));
        $("#alanTlToplamAlan").val(formatMyMoney(alanTlToplamAlan));
        $("#alanDlToplamAlan").val(formatMyMoney2(alanDlToplamAlan));
    }



    /*   kontrolYuzde Fonksiyon   */
    $.kontrolYuzde = function () {
        toplamYuzde = isBedelElkYuzde + isBedelMakYuzde + isBedelInsYuzde + isBedelTnm1Yuzde + isBedelTnm2Yuzde;
        $("#yuzdeToplam").val(toplamYuzde);
        $("#yuzdeToplamAnlz").val(toplamYuzde);
        $("#yuzdeToplamAlan").val(toplamYuzde);
        if (parseInt(toplamYuzde) == 100) {
            $("#yuzdeToplam").css("background", "#fff").css("color", "#495057");
            $("#yuzdeToplamAnlz").css("background", "#fff").css("color", "#495057");
            $("#yuzdeToplamAlan").css("background", "#fff").css("color", "#495057");
            $("#bildiri1").hide();
            $.hesapla();
            $.hesapla2();
            $.hesapla3();
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
            $("#yuzdeToplamAnlz").css("background", "#ee172b").css("color", "#fff");
            $("#yuzdeToplamAlan").css("background", "#ee172b").css("color", "#fff");
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
            $("#elkYuzdeAnlz").val(isBedelElkYuzde);
            $("#elkYuzdeAlan").val(isBedelElkYuzde);
        }
        $.kontrolYuzde();
    });
    $("#makYuzdeSoz").on("input", function () {
        if (parseInt($("#makYuzdeSoz").val()) >= 0) {
            isBedelMakYuzde = parseInt($("#makYuzdeSoz").val());
            $("#makYuzdeAnlz").val(isBedelMakYuzde);
            $("#makYuzdeAlan").val(isBedelMakYuzde);
        }
        $.kontrolYuzde();
    });
    $("#insYuzdeSoz").on("input", function () {
        if (parseInt($("#insYuzdeSoz").val()) >= 0) {
            isBedelInsYuzde = parseInt($("#insYuzdeSoz").val());
            $("#insYuzdeAnlz").val(isBedelInsYuzde);
            $("#insYuzdeAlan").val(isBedelInsYuzde);
        }
        $.kontrolYuzde();
    });
    $("#isTanimiYuzde1").on("input", function () {
        if (parseInt($("#isTanimiYuzde1").val()) >= 0) {
            isBedelTnm1Yuzde = parseInt($("#isTanimiYuzde1").val());
            $("#isTanimiYuzdeA1").val(isBedelTnm1Yuzde);
            $("#isTanimiYuzdeAA1").val(isBedelTnm1Yuzde);
        }
        $.kontrolYuzde();
    });
    $("#isTanimiYuzde2").on("input", function () {
        if (parseInt($("#isTanimiYuzde2").val()) >= 0) {
            isBedelTnm2Yuzde = parseInt($("#isTanimiYuzde2").val());
            $("#isTanimiYuzdeA2").val(isBedelTnm2Yuzde);
            $("#isTanimiYuzdeAA2").val(isBedelTnm2Yuzde);
        }
        $.kontrolYuzde();
    });


    /*  yuzdeler click   */
    $("#elkYuzdeSoz").click(function () {
        $(this).select();
    });
    $("#makYuzdeSoz").click(function () {
        $(this).select();
    });
    $("#insYuzdeSoz").click(function () {
        $(this).select();
    });
    $("#isTanimiYuzde1").click(function () {
        $(this).select();
    });
    $("#isTanimiYuzde2").click(function () {
        $(this).select();
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


    //bildirim gizle
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


    //devam
    $("#isBedeliSoz").click(function () {
        $(this).val(isBedeli);
    });


    //devam
    $("#isBedeliSoz").mouseleave(function () {
        $("#isBedeliSoz").val(formatMyMoney(isBedeli));
        $("#isBedeliSoz").blur();
    });



    /* analize istinaden elektrik bedel değiştiğinde */
    $("#elkBedelAnlz").on("input", function () {
        elkBedelAnlz = parseInt($("#elkBedelAnlz").val());
        if (toplamYuzde == 100) {
            $.hesapla2();
            $("#bildiri1").hide();
        } else {
            $("#bildiri1").show(1, function () {
                $(this).html("<h4>Yüzdelik Hesabı Hatalı..!</h4>").addClass("alert-danger").removeClass("alert-warning");
            });
        }
    });


    //devam
    $("#elkBedelAnlz").click(function () {
        $(this).val(elkBedelAnlz);
    });


    //devam
    $("#elkBedelAnlz").mouseleave(function () {
        $("#elkBedelAnlz").val(formatMyMoney(elkBedelAnlz));
        $("#elkBedelAnlz").blur();
    });


    /* Alan istinaden iş bedel değiştiğinde */
    $("#alanTlAlan").on("input", function () {
        alanTlAlan = $("#alanTlAlan").val();
        if (toplamYuzde == 100) {
            $.hesapla3();
            $("#bildiri1").hide();
        } else {
            $("#bildiri1").show(1, function () {
                $(this).html("<h4>Yüzdelik Hesabı Hatalı..!</h4>").addClass("alert-danger").removeClass("alert-warning");
            });
        }
    });


    //devam
    $("#alanTlAlan").click(function () {
        $(this).val(alanTlAlan);
    });


    //devam
    $("#alanTlAlan").mouseleave(function () {
        $("#alanTlAlan").val(formatMyMoney(alanTlAlan));
        $("#alanTlAlan").blur();
    });




    /*  Dolar Kur Değiştiğinde */
    $("#dolarKur").on("input", function () {
        if (toplamYuzde == 100) {
            $.hesapla();
            $.hesapla2();
            $.hesapla3();
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


    //Kur Veri Çekme
    var hx = new XMLHttpRequest();
    hx.open("GET", "https://www.doviz.gen.tr/doviz_json.asp", true);
    hx.onload = function () {
        if (this.status == 200) {
            document.getElementById("dolarKur").value = (JSON.parse(this.responseText)).dolar2;
            document.getElementById("euroKur").value = (JSON.parse(this.responseText)).euro2;
            $("#kurGoster thead").attr("title", (JSON.parse(this.responseText)).songuncellenme);
            //document.getElementById("g").innerHTML = (JSON.parse(this.responseText)).songuncellenme;
        }
    }
    hx.send();


    /* Modal btn click başlık ekleme*/
    $("#BtnOnizleme").click(function (e) {
        $("#modalBaslik").html(projeAdi);

        $("#TblSoz td:eq(0)").html(formatMyMoney(isBedeli));
        $("#TblSoz td:eq(1)").html(toplamYuzde + "%");
        $("#TblSoz td:eq(2)").html(formatMyMoney(alanTlSoz));
        $("#TblSoz td:eq(3)").html(formatMyMoney2(alanDlSoz));

        $("#TblSoz td:eq(4)").html(formatMyMoney(elkBedelSoz));
        $("#TblSoz td:eq(5)").html(isBedelElkYuzde + "%");
        $("#TblSoz td:eq(6)").html(formatMyMoney(elkAlanTlSoz));
        $("#TblSoz td:eq(7)").html(formatMyMoney2(elkAlanDlSoz));

        $("#TblSoz td:eq(8)").html(formatMyMoney(makBedelSoz));
        $("#TblSoz td:eq(9)").html(isBedelMakYuzde + "%");
        $("#TblSoz td:eq(10)").html(formatMyMoney(makAlanTlSoz));
        $("#TblSoz td:eq(11)").html(formatMyMoney2(makAlanDlSoz));

        $("#TblSoz td:eq(12)").html(formatMyMoney(insBedelSoz));
        $("#TblSoz td:eq(13)").html(isBedelInsYuzde + "%");
        $("#TblSoz td:eq(14)").html(formatMyMoney(insAlanTlSoz));
        $("#TblSoz td:eq(15)").html(formatMyMoney2(insAlanDlSoz));

        if (isBedelTnm1Yuzde > 0) {
            $("#TblSoz td:eq(16)").html(formatMyMoney(tnm1BedelSoz));
            $("#TblSoz td:eq(17)").html(isBedelTnm1Yuzde + "%");
            $("#TblSoz td:eq(18)").html(formatMyMoney(tnm1AlanTlSoz));
            $("#TblSoz td:eq(19)").html(formatMyMoney2(tnm1AlanDlSoz));
            $("#TblSoz tr:eq(5)").removeClass("d-none");
            $("#TblSoz tr:eq(5) > th").html(isTnm1);
        } else {
            $("#TblSoz tr:eq(5)").addClass("d-none");
        }

        if (isBedelTnm2Yuzde > 0) {
            $("#TblSoz td:eq(20)").html(formatMyMoney(tnm2BedelSoz));
            $("#TblSoz td:eq(21)").html(isBedelTnm2Yuzde + "%");
            $("#TblSoz td:eq(22)").html(formatMyMoney(tnm2AlanTlSoz));
            $("#TblSoz td:eq(23)").html(formatMyMoney2(tnm2AlanDlSoz));
            $("#TblSoz tr:eq(6)").removeClass("d-none");
            $("#TblSoz tr:eq(6) > th").html(isTnm2);
        } else {
            $("#TblSoz tr:eq(6)").addClass("d-none");
        }
    });

});