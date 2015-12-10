var margin = {top: 50, right: 10, bottom:50, left: 10},
    width = $(window).width(),
    height = $(window).height(),
    colors = {"A": "#d7191c","C": "#fdae61","G": "#ffffbf","T": "#a6d96a", "-": "#000000"};

var svg1 = d3.select("#dna1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#dna2").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function get_node_color(node) {
    return colors[node.char]
}

function visualize(dna_file, svg_elem) {
    d3.text(dna_file,
        function(data) {
            console.log(data);
            var nodes = [];
            for (var i = 0; i < data.length; i++) {
                var curr_node = new Node({char: data[i]});
                nodes.push(curr_node)
            }

            var visual = dna_visual()
                .size([width, height])
                .nodes(nodes);

            visual.layout();

            // append a rect to each node
            var node = svg_elem.append("g").selectAll(".node")
                .data(visual.nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            var rect = node.append("rect")
                .attr("height", visual.node_height())
                .attr("width", visual.node_width())
                .style("fill", function(d) { return get_node_color(d); });
        }
    );
}

visualize("../dna_files/dna1_test", svg1);
