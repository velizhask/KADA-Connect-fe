import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Loader2, Search, Eye, EyeOff, Trash2, FileText, ChevronsLeft, ChevronsRight, Filter, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { useUsers, type AdminUser } from "@/hooks/useUsers";

export default function UserManagement() {
  const navigate = useNavigate();

  const {
    users, 
    loading,
    pagination,
    filters,
    setRoleFilter,
    setVisibilityFilter,
    setSearch,
    resetFilters,
    setPage,
    toggleVisibility,
    bulkSetVisibility,
    deleteUser,
  } = useUsers(10);

  const [selected, setSelected] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const { page: currentPage, totalPages, totalItems, limit: itemsPerPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = (page: number) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
    setSelected([]);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => goToPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => goToPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    users.length > 0 && users.every((u) => selected.includes(u.id));

  const handleToggleVisibility = async (user: AdminUser, isVisible: boolean) => {
    await toggleVisibility(user, isVisible);
  };

  const handleBulkSetVisibility = async (isVisible: boolean) => {
    await bulkSetVisibility(selected, isVisible);
    setSelected([]);
  };

  const handleDeleteUser = async (user: AdminUser) => {
    await deleteUser(user);
    setDeleteTarget(null);
    setSelected([]);
  };

  const handleClearFilters = () => {
    resetFilters();
    setSelected([]);
  };

  const hasActiveFilters = 
    filters.role !== "All" || 
    filters.visibility !== "All" || 
    filters.searchTerm.trim() !== "";

  return (
    <MainLayout>
      <div className="min-h-screen bg-linear-to-br from-background via-secondary/20 to-background">
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {/* ================= HEADER ================= */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage user visibility and accounts across the platform
            </p>
          </div>

          {/* ================= TOOLBAR ================= */}
          <Card className="mb-6 shadow-md border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="p-5">
              {/* Search and Primary Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                <div className="relative flex-1 w-full sm:w-auto sm:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-10 pr-10 bg-background/50 border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    value={filters.searchTerm}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {filters.searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearch("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {selected.length > 0 && (
                  <div className="flex items-center gap-2 w-full sm:w-auto p-3 sm:p-0 bg-accent/30 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-border/40">
                    <span className="text-sm font-medium text-muted-foreground mr-2">
                      {selected.length} selected
                    </span>
                    <Button 
                      onClick={() => handleBulkSetVisibility(true)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                      disabled={loading}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Show
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkSetVisibility(false)}
                      className="border-border/60 hover:bg-accent/50"
                      disabled={loading}
                    >
                      <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                      Hide
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected([])}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 border-t border-border/40">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Filters:</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Role Filter */}
                  <div className="flex items-center gap-2">
                    <Label htmlFor="role-filter" className="text-xs text-muted-foreground whitespace-nowrap">
                      Role
                    </Label>
                    <Select value={filters.role} onValueChange={setRoleFilter}>
                      <SelectTrigger id="role-filter" className="w-[130px] h-9 bg-background/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Roles</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Trainee">Trainee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Visibility Filter */}
                  <div className="flex items-center gap-2">
                    <Label htmlFor="visibility-filter" className="text-xs text-muted-foreground whitespace-nowrap">
                      Status
                    </Label>
                    <Select value={filters.visibility} onValueChange={setVisibilityFilter}>
                      <SelectTrigger id="visibility-filter" className="w-[130px] h-9 bg-background/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Visible">Visible</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="h-9 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" />
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Results Count */}
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {totalItems} {totalItems === 1 ? "result" : "results"}
                </div>
              </div>
            </div>
          </Card>

          {/* ================= TABLE ================= */}
          <Card className="shadow-lg border-border/50 overflow-hidden bg-card/80 backdrop-blur-sm">
            {loading ? (
              <div className="p-16 flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 border-b border-border/50">
                    <tr className="text-left text-muted-foreground">
                      <th className="p-4 font-semibold">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={() =>
                            setSelected(
                              isAllSelected 
                                ? selected.filter((id) => !users.find((u) => u.id === id))
                                : [...selected, ...users.map((u) => u.id).filter((id) => !selected.includes(id))]
                            )
                          }
                          className="border-border/60"
                        />
                      </th>
                      <th className="p-4 font-semibold">Role</th>
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Email</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border/40">
                    {users.map((user, index) => (
                      <tr 
                        key={user.id} 
                        className="hover:bg-accent/20 transition-colors duration-150 group"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selected.includes(user.id)}
                            onCheckedChange={() => toggleSelect(user.id)}
                            className="border-border/60"
                          />
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === "Company"
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-accent/60 text-accent-foreground border border-border/30"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-border/30 group-hover:ring-primary/30 transition-all"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary/20 to-accent/40 flex items-center justify-center ring-2 ring-border/30 group-hover:ring-primary/30 transition-all">
                                <span className="text-xs font-semibold text-primary">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-muted-foreground">
                          {user.email ?? "-"}
                        </td>

                        <td className="p-4">
                          {user.isVisible ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/50 shadow-sm">
                              <Eye className="h-3 w-3" />
                              Visible
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground border border-border/40 shadow-sm">
                              <EyeOff className="h-3 w-3" />
                              Hidden
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="hover:bg-accent/50 hover:text-primary transition-colors"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent 
                              align="end"
                              className="w-48 shadow-lg border-border/50 bg-popover/95 backdrop-blur-sm"
                            >
                              {user.isVisible ? (
                                <DropdownMenuItem
                                  onClick={() => handleToggleVisibility(user, false)}
                                  className="cursor-pointer hover:bg-accent/50"
                                >
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Hide from public
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleToggleVisibility(user, true)}
                                  className="cursor-pointer hover:bg-accent/50"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Show to public
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    user.role === "Trainee"
                                      ? `/trainees/${user.id}`
                                      : `/companies/${user.id}`
                                  )
                                }
                                className="cursor-pointer hover:bg-accent/50"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                                onClick={() => setDeleteTarget(user)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center">
                              <Search className="h-8 w-8 text-muted-foreground/40" />
                            </div>
                            <p className="text-muted-foreground font-medium">No users found</p>
                            <p className="text-sm text-muted-foreground/60">
                              Try adjusting your search criteria
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* ================= PAGINATION ================= */}
          {totalItems > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Pagination Info */}
              <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(endIndex, totalItems)}
                </span>{" "}
                of <span className="font-medium text-foreground">{totalItems}</span> users
              </div>

              {/* Pagination Controls */}
              <Pagination className="order-1 sm:order-2">
                <PaginationContent>
                  {/* First Page */}
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className="h-9 w-9 border-border/60 disabled:opacity-50"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => goToPage(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-accent/50"
                      }
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {renderPaginationItems()}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => goToPage(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:bg-accent/50"
                      }
                    />
                  </PaginationItem>

                  {/* Last Page */}
                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9 border-border/60 disabled:opacity-50"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* ================= DELETE CONFIRMATION ================= */}
          <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
            <AlertDialogContent className="border-border/50 shadow-2xl bg-card/95 backdrop-blur-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  Delete User Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground pt-2">
                  Are you sure you want to delete <span className="font-semibold text-foreground">{deleteTarget?.name}</span>? 
                  This action cannot be undone and will permanently remove all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="border-border/60 hover:bg-accent/50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md hover:shadow-lg transition-all"
                  onClick={() => deleteTarget && handleDeleteUser(deleteTarget)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </MainLayout>
  );
}