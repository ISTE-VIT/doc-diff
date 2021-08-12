import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const BasicTree = () => {
    function insert(children = [], [head, ...tail]) {
        let child = children.find(child => child.name === head);
        if (!child) children.push(child = {name: head, children: [],content: ""});
        if (tail.length > 0) insert(child.children, tail);
        return children;
      }
      
      // Example:
      let paths = [
        '/root/library/Folder 1',
        '/root/library/Folder 2',
        '/root/library/Folder 1/Document.docx',
        '/root/library/Folder 1/Document 2.docx',
        '/root/library/Folder 2/Document 3.docx',
        '/root/library/Document 4.docx'
      ];
      
      let objectArray = paths
        .map(path => path.split('/').slice(1))
        .reduce((children, path) => insert(children, path), []); 
    console.log(objectArray[0]);
  return (
    <FolderTree
      data={ objectArray[0] } 
    />
  );
};


export default BasicTree;