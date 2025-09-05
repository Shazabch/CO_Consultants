import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Home,
  Users,
  Star,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService, FolderItem } from "@/services/api";
import { toast } from "sonner";

interface SidebarProps {
  onUploadClick: () => void;
}

interface FolderTreeItem extends FolderItem {
  children?: FolderTreeItem[];
  isExpanded?: boolean;
}

export default function Sidebar({ onUploadClick }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [folders, setFolders] = useState<FolderTreeItem[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const isActive = (path: string) => currentPath === path;

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const response = await apiService.getFolders();
      if (response.success) {
        const foldersWithState = response.data.map((folder) => ({
          ...folder,
          children: [],
          isExpanded: false,
        }));
        setFolders(foldersWithState);
        // Expand first folder by default
        if (foldersWithState.length > 0) {
          setExpandedFolders(new Set([foldersWithState[0].id]));
        }
      }
    } catch (error) {
      console.error("Error loading folders:", error);
      toast.error("Error loading folders");
    }
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFolderClick = (folderId: string) => {
    navigate(`/folder/${folderId}`);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleDrop = async (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    const fileId = e.dataTransfer.getData("text/plain");

    try {
      // Use the move file API (we'll need to add this to the service)
      const response = await apiService.moveFile(fileId, folderId);
      if (response.success) {
        toast.success("File moved successfully");
        // Trigger a refresh of the main content
        window.dispatchEvent(new CustomEvent("filesMoved"));
      } else {
        toast.error("Failed to move file");
      }
    } catch (error) {
      console.error("Error moving file:", error);
      toast.error("Error moving file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderFolder = (folder: FolderTreeItem, level = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isCurrentFolder = currentPath === `/folder/${folder.id}`;

    return (
      <div key={folder.id} className="space-y-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleFolder(folder.id)}
            className="p-0.5 hover:bg-sidebar-accent rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-sidebar-foreground/60" />
            ) : (
              <ChevronRight className="w-3 h-3 text-sidebar-foreground/60" />
            )}
          </button>
          <button
            onClick={() => handleFolderClick(folder.id)}
            onDrop={(e) => handleDrop(e, folder.id)}
            onDragOver={handleDragOver}
            className={`flex items-center gap-2 px-2 py-1 text-sm w-full text-left rounded transition-colors ${
              isCurrentFolder
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
            style={{ marginLeft: `${level * 16}px` }}
          >
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-panel" />
            ) : (
              <Folder className="w-4 h-4 text-panel" />
            )}
            <span className="truncate">{folder.name}</span>
          </button>
        </div>

        {isExpanded && folder.children && folder.children.length > 0 && (
          <div className="ml-4">
            {folder.children.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Refresh folders when a new folder is created
  useEffect(() => {
    const handleFolderCreated = () => {
      loadFolders();
    };

    window.addEventListener("folderCreated", handleFolderCreated);
    return () =>
      window.removeEventListener("folderCreated", handleFolderCreated);
  }, []);

  return (
    <div className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-panel rounded-full flex items-center justify-center text-panel-foreground font-bold text-sm">
            CV
          </div>
          <span className="font-semibold text-sidebar-foreground">
            CloudVault
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-1">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-md transition-colors ${
              isActive("/")
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </button>

          <div className="mt-6">
            <div className="px-3 py-1 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">
              My Files
            </div>

            <div className="mt-2 space-y-1">
              {folders.map((folder) => renderFolder(folder))}
            </div>
          </div>

          <div className="mt-8 space-y-1">
            <button
              onClick={() => navigate("/shared")}
              className={`flex items-center gap-2 px-3 py-2 text-sm w-full rounded-md transition-colors ${
                isActive("/shared")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Shared with me</span>
            </button>
            <button
              onClick={() => navigate("/starred")}
              className={`flex items-center gap-2 px-3 py-2 text-sm w-full rounded-md transition-colors ${
                isActive("/starred")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Starred</span>
            </button>
            <button
              onClick={() => navigate("/trash")}
              className={`flex items-center gap-2 px-3 py-2 text-sm w-full rounded-md transition-colors ${
                isActive("/trash")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Trash</span>
            </button>
            <button
              onClick={handleProfileClick}
              className={`flex items-center gap-2 px-3 py-2 text-sm w-full rounded-md transition-colors ${
                isActive("/profile")
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Upload Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          className="w-full bg-panel hover:bg-panel/90 text-panel-foreground"
          onClick={onUploadClick}
        >
          <Upload className="w-4 h-4 mr-2" />
          New Upload
        </Button>
      </div>
    </div>
  );
}
