const getFolderTree = (treeData, resultObject) => {
    resultObject.children = Object.keys(treeData).map(key => {
        if ("content" in treeData[key]) {
            // means its a file
            return {
                name: key,
                content: treeData[key].content
            }
        }
        else {
            return getFolderTree(treeData[key], {
                name: key
            })
        }
    })
    return resultObject
}

export default getFolderTree