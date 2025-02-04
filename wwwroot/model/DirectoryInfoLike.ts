export interface FileInfoLike {
    name: string;
    fullName: string;
    extension: string;
}

export interface DirectoryInfoLike {
    name: string;
    fullName: string;
    parent?: string;
    files: Array<FileInfoLike>;
    directories: Array<DirectoryInfoLike>;
}