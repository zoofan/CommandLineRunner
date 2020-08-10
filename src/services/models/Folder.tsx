class Folder {
  childFolders: Map<string, Folder>;

  constructor() {
    this.childFolders = new Map<string, Folder>();
  }

  add(name: string, path?: Folder) {
    if (!path) path = new Folder();
    this.childFolders.set(name, path);
  }

  has(name: string): boolean {
    return this.childFolders.has(name);
  }

  delete(name: string) {
    this.childFolders.delete(name);
  }

  get(name: string): Folder {
    return this.childFolders.get(name);
  }

  getAllFolders(): Array<[string, Folder]> {
    return Array.from(this.childFolders.entries());
  }
}

export default Folder;
