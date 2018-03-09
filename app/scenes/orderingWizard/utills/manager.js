function getOrdering(ctx) {
    if (!ctx.session.ordering) ctx.session.ordering = {};
    return ctx.session.ordering;
}

function getProperty(ctx, property) {
    const ordering = getOrdering(ctx);
    return ordering[property] || "";
}

function setProperty(property, ctx, value) {
    const ordering = getOrdering(ctx);
    ordering[property] = value;
    return ordering;
}

module.exports = {
    getOrdering,
    getProperty,
    setProperty,
};