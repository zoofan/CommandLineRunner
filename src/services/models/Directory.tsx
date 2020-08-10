import Folder from "./Folder";

class Directory {
  private _rootFolder = new Folder();

  create(path: Array<string>) {
    let currentpath = this._rootFolder;
    if (!path) throw new Error("Cannot create. No path given");
    path.forEach((folder: string, index: number) => {
      if (index !== path.length - 1) {
        if (!currentpath.childFolders.has(folder)) {
          throw new Error(
            `Cannot create ${path.join("/")} - ${path[index]} does not exist`
          );
        }
        currentpath = currentpath.get(folder);
      } else if (index === path.length - 1) {
        currentpath.add(folder);
      }
    });
  }

  Delete(path: Array<string>) {
    let currentpath = this._rootFolder;
    path.forEach((folder: string, index: number) => {
      if (index !== path.length - 1) {
        if (!currentpath.childFolders.has(folder))
          throw new Error(
            `Cannot delete ${path.join("/")} - ${path[index]} does not exist`
          );
        currentpath = currentpath.get(folder);
      } else if (index === path.length - 1) {
        if (!currentpath.childFolders.has(folder))
          throw new Error(
            `Cannot delete ${path.join("/")} - ${
              path[path.length - 1]
            } does not exist`
          );
        currentpath.delete(folder);
      }
    });
  }

  Move(path: Array<string>, newLocation: Array<string>) {
    try {
      let folderToMove = this._rootFolder;
      path.forEach((folder: string, index: number) => {
        if (!folderToMove.childFolders.has(folder)) {
          throw new Error(`${folder} does not exist`);
        }
        folderToMove = folderToMove.get(folder);
      });

      let currentpath = this._rootFolder;
      newLocation.forEach((folder: string, index: number) => {
        if (currentpath.has(folder)) {
          currentpath = currentpath.get(folder);
        }
      });
      currentpath.add(path[path.length - 1], folderToMove);
      this.Delete(path);
    } catch (error) {
      console.log(`Error while moving - ${error.message}`);
    }
  }

  List(): Array<string> {
    let outPutLines = new Array<string>();
    this.list(outPutLines, 0, this._rootFolder);
    return outPutLines;
  }

  private list(outPutLines: Array<string>, level: number, path: Folder) {
    let childPaths: Array<[string, Folder]> = path.getAllFolders();
    childPaths.sort().forEach((path) => {
      outPutLines.push(`${" ".repeat(level * 2)}${path[0]}`);
      this.list(outPutLines, level + 1, path[1]);
    });
  }
}

export default Directory;
