console.log("NodeJS start");

var $ = require('cheerio');
var request = require('request');

function gotHTML(err, resp, html) {
    if (err) return console.error(err);
    var parsedHTML = $.load(html);

    parsedHTML('tr').map(function(i, trEl) {

        if ($(trEl).find("td").length == 4) {

            var objBeer = {};

            $(trEl).find("td").each(function(i, elem) {

                switch (i) {
                    case 0:
                        objBeer.name = $(this).text();
                        break;
                    case 1:
                        objBeer.type = $(this).text();
                        break;
                    case 2:
                        objBeer.alcohol = $(this).text().replace(/[^\d|,]/gi, "");
                        break;
                    case 3:
                        objBeer.brewery = $(this).text();
                        break;
                }

            });

            console.log("", objBeer);
        }

    });

}

var domain = 'https://fr.wikipedia.org/wiki/Liste_des_bi%C3%A8res_belges';
request(domain, gotHTML);
