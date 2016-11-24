let eltsVisibilityMap = [];
function animateHeight(id) {
    eltsVisibilityMap[id] = !eltsVisibilityMap[id];
    if (eltsVisibilityMap[id]) {
        $(id).css('max-height', '200px');
    } else {
        $(id).css('max-height', '0');
    }
}