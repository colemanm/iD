iD.ui.Sidebar = function(context) {
    return function(selection) {
        selection.append('div')
            .attr('class', 'sidebar-hover')
            .call(iD.ui.Hover(context));

        selection.append('div')
            .style('display', 'none')
            .attr('class', 'inspector-wrap fr content');
    }
};
