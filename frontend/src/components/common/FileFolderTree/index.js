import FolderTree from 'react-folder-tree';
const FileFolderTree = ({
    folderTree,
    changeContent
}) => {
    return <FolderTree
        onNameClick={({ nodeData, defaultOnClick }) => {
            defaultOnClick()
            if (nodeData.content) { changeContent(nodeData.content) }
        }}
        data={folderTree || {}}
        showCheckbox={false}
        indentPixels={15}
        readOnly
    />
}

export default FileFolderTree