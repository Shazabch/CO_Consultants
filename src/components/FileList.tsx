import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, Archive, Image, Video, File, Folder, Star, Trash2, Share, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService, FileItem, FolderItem } from "@/services/api";
import { toast } from "sonner";

interface FileListProps {
  searchQuery: string;
  onFolderCreated: () => void;
}

const getFileIcon = (type: string) => {
  const iconClass = "w-4 h-4 text-muted-foreground mr-2";
  switch (type) {
    case 'document':
      return <FileText className={iconClass} />;
    case 'zip':
      return <Archive className={iconClass} />;
    case 'image':
      return <Image className={iconClass} />;
    case 'video':
      return <Video className={iconClass} />;
    case 'folder':
      return <Folder className={iconClass} />;
    default:
      return <File className={iconClass} />;
  }
};

export default function FileList({ searchQuery, onFolderCreated }: FileListProps) {
  const { folderId } = useParams();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [draggedFile, setDraggedFile] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [folderId]);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      loadFiles();
    }
  }, [searchQuery]);

  // Listen for files moved event
  useEffect(() => {
    const handleFilesMoved = () => {
      loadFiles();
    };
    
    window.addEventListener('filesMoved', handleFilesMoved);
    return () => window.removeEventListener('filesMoved', handleFilesMoved);
  }, []);

  const loadData = () => {
    loadFiles();
    loadFolders();
  };

  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFiles(folderId);
      if (response.success) {
        setFiles(response.data);
      } else {
        toast.error('Failed to load files');
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Error loading files');
    } finally {
      setLoading(false);
    }
  };

  const loadFolders = async () => {
    try {
      const response = await apiService.getFolders(folderId);
      if (response.success) {
        setFolders(response.data);
      }
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await apiService.searchFiles(query);
      if (response.success) {
        setFiles(response.data);
      } else {
        toast.error('Search failed');
      }
    } catch (error) {
      console.error('Error searching files:', error);
      toast.error('Error searching files');
    } finally {
      setLoading(false);
    }
  };

  const handleStarFile = async (fileId: string) => {
    try {
      const response = await apiService.starFile(fileId);
      if (response.success) {
        loadFiles();
        toast.success('File starred successfully');
      } else {
        toast.error('Failed to star file');
      }
    } catch (error) {
      console.error('Error starring file:', error);
      toast.error('Error starring file');
    }
  };

  const handleMoveToTrash = async (fileId: string) => {
    try {
      const response = await apiService.moveToTrash(fileId);
      if (response.success) {
        loadFiles();
        toast.success('File moved to trash');
      } else {
        toast.error('Failed to move file to trash');
      }
    } catch (error) {
      console.error('Error moving file to trash:', error);
      toast.error('Error moving file to trash');
    }
  };

  const handleShareFile = async (fileId: string) => {
    const email = prompt('Enter email to share with:');
    if (email) {
      try {
        const response = await apiService.shareFile(fileId, email);
        if (response.success) {
          toast.success('File shared successfully');
        } else {
          toast.error('Failed to share file');
        }
      } catch (error) {
        console.error('Error sharing file:', error);
        toast.error('Error sharing file');
      }
    }
  };

  const handleDownloadFile = (fileId: string, fileName: string) => {
    // Simulate download
    toast.success(`Downloading ${fileName}...`);
  };

  const handleDragStart = (e: React.DragEvent, fileId: string) => {
    e.dataTransfer.setData('text/plain', fileId);
    setDraggedFile(fileId);
  };

  const handleDragEnd = () => {
    setDraggedFile(null);
  };

  const handleFolderDrop = async (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    const fileId = e.dataTransfer.getData('text/plain');
    
    if (fileId) {
      try {
        const response = await apiService.moveFile(fileId, targetFolderId);
        if (response.success) {
          loadFiles();
          toast.success('File moved successfully');
        } else {
          toast.error('Failed to move file');
        }
      } catch (error) {
        console.error('Error moving file:', error);
        toast.error('Error moving file');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      {/* Folders */}
      {folders.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mb-4">
          {folders.map((folder) => (
            <div 
              key={folder.id}
              className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer text-left transition-colors"
              onDrop={(e) => handleFolderDrop(e, folder.id)}
              onDragOver={handleDragOver}
            >
              <Folder className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium truncate">{folder.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* File Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground">
            <div>Name</div>
            <div>Owner</div>
            <div>Last Modified</div>
            <div>File Size</div>
            <div>Actions</div>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {loading ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              Loading files...
            </div>
          ) : files.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No files found
            </div>
          ) : (
            files.map((file) => (
              <div 
                key={file.id} 
                className="px-4 py-3 hover:bg-muted/50 cursor-pointer group transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, file.id)}
                onDragEnd={handleDragEnd}
                style={{ opacity: draggedFile === file.id ? 0.5 : 1 }}
              >
                <div className="grid grid-cols-5 gap-4 text-sm items-center">
                  <div className="flex items-center">
                    {getFileIcon(file.type)}
                    <span className="text-foreground">{file.name}</span>
                  </div>
                  <div className="text-muted-foreground">{file.owner}</div>
                  <div className="text-muted-foreground">{file.lastModified}</div>
                  <div className="text-muted-foreground">{file.size}</div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarFile(file.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Star file"
                    >
                      <Star className={`h-3 w-3 ${file.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareFile(file.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Share file"
                    >
                      <Share className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadFile(file.id, file.name);
                      }}
                      className="h-8 w-8 p-0"
                      title="Download file"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveToTrash(file.id);
                      }}
                      className="h-8 w-8 p-0 text-destructive"
                      title="Move to trash"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}