var margin = {top: 0, right: 10, bottom: 5, left: 10},
    width = $(window).width(),
    height = $(window).height(),
    colors = {"A": "#d7191c","C": "#fdae61","G": "#ffffbf","T": "#a6d96a", "-": "#000000"},
    colors_list = ["#d7191c","#fdae61", "#ffffbf", "#a6d96a", "#000000"],
    letters = ["A", "C", "G", "T", "-"];

var svg1 = d3.select("#dna1").append("svg")
    .attr("width", width)
    .attr("height", height/2 - margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

var svg2 = d3.select("#dna2").append("svg")
    .attr("width", width)
    .attr("height", height/2 - margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var color_scale = d3.scale.quantile()
    .domain([0, colors_list.length])
    .range(colors_list);

var legend_svg = d3.select("#legend").append("svg")
    .attr("width", width)
    .attr("height", height/4)
    .append("g");

var legend_elem_w = 50;
var legend_height = 20;
var text_offset = 40;
var legend = legend_svg.selectAll(".legend")
    .data(letters);

legend.enter().append("g")
    .attr("class", "legend");

legend.append("rect")
    .attr("x", function(d, i) { return legend_elem_w*i; })
    .attr("y", legend_height)
    .attr("width", legend_elem_w)
    .attr("height", legend_height)
    .style("fill", function(d, i) { return colors_list[i]; })

legend.append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return legend_elem_w*i; })
    .attr("y", legend_height + text_offset);

//This would be cool but I lazy.
//var fisheye_x = d3.fisheye.scale(d3.scale.identity).domain([0, width]).focus(width/2);
//var fisheye = d3.fisheye.circular()
//    .radius(200)
//    .distortion(1);

//svg1.on("mousemove", function() {
//    //fisheye_x.focus(d3.mouse(this));
//    fisheye.focus(d3.mouse(this));
//});

function get_node_color(node) {
    return colors[node.char]
}

var node_height = height/2 - 2*margin.bottom;

var visual1 = dna_visual()
    .size([width, height]);

var visual2 = dna_visual()
    .size([width, height]);

function visualize(dna_file, svg_elem, visual){

    d3.text(dna_file,
        function(data) {
            var nodes = [];
            for (var i = 0; i < data.length; i++) {
                var curr_node = new Node({char: data[i]});
                nodes.push(curr_node)
            }

            visual.nodes(nodes);

            update_visualization(svg_elem, visual);
        });
}

function update_visualization(svg_elem, visual) {
    svg_elem.selectAll("g").remove();

    visual.layout();

    // append a rect to each node
    var node = svg_elem.append("g").selectAll(".node")
        .data(visual.nodes())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    var rect = node.append("rect")
        .attr("height", node_height)
        .attr("width", visual.node_width())
        .style("fill", function(d) { return get_node_color(d); });
}
