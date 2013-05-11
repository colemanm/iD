iD.ui.Hover = function(context) {
    return function(selection) {
        var icon = selection.append('div');
        var name = selection.append('h2');
        var type = selection.append('h3');

        context.on('hover.hover', function(entity) {
            if (entity) {
                var preset = context.presets().match(entity, context.graph());

                icon.datum(preset)
                    .html('')
                    .call(iD.ui.PresetIcon(context.geometry(entity.id)));

                name.text(iD.util.localeName(entity));
                type.text(preset.name());
            } else {
                icon.html('');
                name.text('');
                type.text('');
            }
        })
    }
};
