export const formatProjects = (projects) => {
    const listProjects = [];
    let list = []
    let index = 0
    while (index < projects.length) {
        if (index % 2 === 0 && index !== 0) {
            listProjects.push(list);
            list = []
        }
        list.push(projects[index])
        index++;
    }
    listProjects.push(list);

    return listProjects;
}
