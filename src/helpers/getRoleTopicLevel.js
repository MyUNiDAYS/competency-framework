module.exports = function (role, topic) {
    var competencies = role.competencies.required.filter(c => c.topic === topic);
    
    if(competencies.length == 0)
        competencies = role.competencies.optional.filter(c => c.topic === topic);

    if(competencies.length == 0)
        return "N/A";

    return competencies[0].level.title;
};