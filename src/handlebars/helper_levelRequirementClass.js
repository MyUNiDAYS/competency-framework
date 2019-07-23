module.exports = function (topic, level, expectedLevel) {
    var expectedIndex = topic.levels.indexOf(expectedLevel);
    var index = topic.levels.indexOf(level);

    if(expectedIndex === -1 || index === -1)
        return '';

    if(index < expectedIndex)
        return 'level-lower'
    if(index == expectedIndex)
        return 'level-equal';
    return 'level-above'
};