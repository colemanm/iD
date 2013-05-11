/*
   The hover behavior adds the `.hover` class on mouseover to all elements to which
   the identical datum is bound, and removes it on mouseout.

   The :hover pseudo-class is insufficient for iD's purposes because a datum's visual
   representation may consist of several elements scattered throughout the DOM hierarchy.
   Only one of these elements can have the :hover pseudo-class, but all of them will
   have the .hover class.
 */
iD.behavior.Hover = function(context) {
    var altDisables,
        target;

    var hover = function(selection) {
        function keydown() {
            if (altDisables && d3.event.keyCode === d3.keybinding.modifierCodes.alt) {
                context.hover(null);
                selection.classed('behavior-hover', false);
            }
        }

        function keyup() {
            if (altDisables && d3.event.keyCode === d3.keybinding.modifierCodes.alt) {
                context.hover(target);
                selection.classed('behavior-hover', true);
            }
        }

        if (!altDisables || !d3.event || !d3.event.altKey) {
            selection.classed('behavior-hover', true);
        }

        function mouseover() {
            target = d3.event.target.__data__;

            if (target) {
                var hovered = [target.id];

                if (target.type === 'relation') {
                    hovered = hovered.concat(_.pluck(target.members, 'id'));
                }

                hovered = d3.set(hovered);

                selection.selectAll('*')
                    .filter(function(d) { return d && hovered.has(d.id); })
                    .classed('hover', true);

                context.hover(target);
            }
        }

        selection.on('mouseover.hover', mouseover);

        selection.on('mouseout.hover', function() {
            context.hover(null);
            target = null;

            selection.selectAll('.hover')
                .classed('hover', false);
        });

        d3.select(document)
            .on('keydown.hover', keydown)
            .on('keyup.hover', keyup);
    };

    hover.off = function(selection) {
        selection.classed('behavior-hover', false)
            .on('mouseover.hover', null)
            .on('mouseout.hover', null);

        selection.selectAll('.hover')
            .classed('hover', false);

        d3.select(document)
            .on('keydown.hover', null)
            .on('keyup.hover', null);
    };

    hover.altDisables = function(_) {
        if (!arguments.length) return altDisables;
        altDisables = _;
        return hover;
    };

    return hover;
};
