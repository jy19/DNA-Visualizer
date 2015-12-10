var margin = {top: 50, right: 10, bottom:50, left: 10},
    width = $(window).width(),
    height = $(window).height(),
    colors = [];

var svg1 = d3.select("#dna1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#dna2").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr();

var dna_visual = function(dna_file) {
    d3.text(dna_file,
        function(d) {
           console.log(d);
           return d;
        },
        function() {}
    );
};

dna_visual("../dna_files/dna1_test");