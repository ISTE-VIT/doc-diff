import _ from "lodash"
const getTreeDataFromFiles = async (files) => {
    const treeData = {}
    await Promise.all(Object.values(files).map(async file => {
        const directoryRegex = /^(.+)\/([^/]*)$/; // first group gives all directories excluding final file, second group gives file name which is not really needed
        const matches = directoryRegex.exec(file.webkitRelativePath)

        // ignore hidden folders
        if (!matches[1].includes(".") && !matches[1].includes("node_modules")) {
            const folderPath = matches[1].split("/").join(".")
            _.set(treeData, folderPath + "['" + file.name + "']", {
                content: await file.text(),
            })
        }
    }))

    return treeData
}



export default getTreeDataFromFiles