function flattenArray(arr) {
    let result = [];

    function recursiveFlatten(obj) {
        result.push({
            id: obj.id,
            isLeaf: obj.isLeaf,
            name: obj.name,
            pid: obj.pid,
        });
        if (obj.children && obj.children.length > 0) {
            obj.children.forEach((child) => recursiveFlatten(child));
        }
    }

    arr.forEach((item) => recursiveFlatten(item));
    return result;
}

module.exports = flattenArray;