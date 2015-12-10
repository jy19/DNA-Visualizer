var dna_visual = function()
{
    var flowchart = {},
        node_width = 2 ,
        node_height = 50 ,
        size = [1, 1] ,
        nodes = [];


    flowchart.node_width = function( _ )
    {
        if( !arguments.length ) return node_width;
        node_width = +_;
        return flowchart;
    };

    flowchart.node_padding = function( _ )
    {
        if( !arguments.length ) return node_padding;
        node_padding = _;
        return flowchart;
    };

    flowchart.node_height = function( _ )
    {
        if( !arguments.length ) return node_height;
        node_height = _;
        return flowchart;
    }

    flowchart.deltax = function( _ )
    {
        if( !arguments.length ) return deltax;
        deltax = _;
        return flowchart;
    }

    flowchart.nodes = function( _ )
    {
        if( !arguments.length ) return nodes;
        nodes = _;
        return flowchart;
    };

    flowchart.size = function( _ )
    {
        if( !arguments.length ) return size;
        size = _;
        return flowchart;
    };

    flowchart.init = function() {};

    flowchart.layout = function()
    {
        compute_node_positions();
    };

    function compute_node_positions()
    {
        console.log('compute node position');
        console.log(nodes);
        var n = nodes.length;
        console.log(n);
        deltax = ( size[0] - n * node_width ) / (n-1);
        for( var i=0 ; i<n ; ++i )
        {
                var node = nodes[i];
                node.x = i * ( node_width + deltax );
                node.y = node_height;
                node.dx = node_width;
                node.dy = node_height;
        }
    }

    return flowchart;
};
