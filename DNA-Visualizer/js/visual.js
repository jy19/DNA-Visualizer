var dna_visual = function()
{
    var dna_visual = {},
        node_width = 10 ,
        node_height = 100 ,
        size = [1, 1] ,
        nodes = [];


    dna_visual.node_width = function( _ )
    {
        if( !arguments.length ) return node_width;
        node_width = +_;
        return dna_visual;
    };

    dna_visual.node_padding = function( _ )
    {
        if( !arguments.length ) return node_padding;
        node_padding = _;
        return dna_visual;
    };

    dna_visual.node_height = function( _ )
    {
        if( !arguments.length ) return node_height;
        node_height = _;
        return dna_visual;
    }

    dna_visual.deltax = function( _ )
    {
        if( !arguments.length ) return deltax;
        deltax = _;
        return dna_visual;
    }

    dna_visual.nodes = function( _ )
    {
        if( !arguments.length ) return nodes;
        nodes = _;
        return dna_visual;
    };

    dna_visual.size = function( _ )
    {
        if( !arguments.length ) return size;
        size = _;
        return dna_visual;
    };

    dna_visual.init = function() {};

    dna_visual.layout = function()
    {
        compute_node_positions();
    };

    function compute_node_positions()
    {
        var n = nodes.length;
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

    return dna_visual;
};
