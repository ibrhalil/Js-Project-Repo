var urunSay = 1;
var toplamFiyat = 0;
$(function () {
    $("#ekle").click(function () {
        $("#tbody").append(
            "<tr>" +
            "<td>" +
            "<div class='input-group'>" +
            "<div class='input-group-prepend'>" +
            "<span class='input-group-text'>" + (urunSay++) + "</span>" +
            "</div>" +
            "<input type='text' placeholder='Ürün Adı' class='form-control clsUrun'>" +
            "<input type='text' placeholder='Fiyatı' class='form-control clsFiyat'>" +
            "</div>" +
            "</td>" +
            "</tr>"
        );
    });
    $("#pastaBtn").click(function () {
        for (let i = 1; i < urunSay; i++) {
            console.log("Ürün: " + $(".clsUrun:eq(" + (i - 1) + ")").val());
            console.log("Fiyat: " + $(".clsFiyat:eq(" + (i - 1) + ")").val());
        }

        /*   Pasta Dilimi Grafik   */
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Ürün', 'Fiyat'],
                [$(".clsUrun:eq(0)").val(), parseInt($(".clsFiyat:eq(0)").val())],
            ]);
            for (let i = 2; i < urunSay; i++) {
                var urn = $(".clsUrun:eq(" + (i - 1) + ")").val();
                var fyt = parseInt($(".clsFiyat:eq(" + (i - 1) + ")").val());
                data.addRow([urn, fyt]);
                toplamFiyat += fyt;
            }


            var options = {
                title: 'Ürün Fiyat Dağılım'
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            var chart2 = new google.visualization.Histogram(document.getElementById('histogram'));
            var chart3 = new google.visualization.ComboChart(document.getElementById('comboChart'));
            var chart4 = new google.visualization.ColumnChart(document.getElementById('columnChart'));

            chart.draw(data, options);
            chart2.draw(data, options);
            chart3.draw(data, options);
            chart4.draw(data, options);
        }
        /*   Pasta Dilimi Grafik   */
    });
    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            $("#ekle").click();
            $(".clsUrun").last().focus();

        }
    });
});