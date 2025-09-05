import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import RefactoredCloudVaultLayout from "./components/RefactoredCloudVaultLayout";
import StarredPage from "./pages/StarredPage";
import SharedPage from "./pages/SharedPage";
import TrashPage from "./pages/TrashPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/Auths/Login";
import RegisterPage from "./pages/Auths/Register";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
         
          <Routes>
          <Route path="/" element={ <Index />} />
          <Route path="/filemanager" element={<RefactoredCloudVaultLayout />} />
          <Route
            path="/starred"
            element={
              <RefactoredCloudVaultLayout>
                <StarredPage />
              </RefactoredCloudVaultLayout>
            }
          />
          <Route
            path="/shared"
            element={
              <RefactoredCloudVaultLayout>
                <SharedPage />
              </RefactoredCloudVaultLayout>
            }
          />
          <Route
            path="/trash"
            element={
              <RefactoredCloudVaultLayout>
                <TrashPage />
              </RefactoredCloudVaultLayout>
            }
          />
          <Route
            path="/folder/:folderId"
            element={<RefactoredCloudVaultLayout />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
