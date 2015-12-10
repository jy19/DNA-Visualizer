var margin = {top: 0, right: 10, bottom:60, left: 10},
    width = $(window).width(),
    height = $(window).height(),
    colors = {"A": "#d7191c","C": "#fdae61","G": "#ffffbf","T": "#a6d96a", "-": "#000000"};

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
            console.log(data);
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
        .attr("height", visual.node_height())
        .attr("width", visual.node_width())
        .style("fill", function(d) { return get_node_color(d); });
}

visualize("../DNA-Visualizer/dna_files/dna1_test", svg1, visual1);
visualize("../DNA-Visualizer/dna_files/dna2_test", svg2, visual2);
