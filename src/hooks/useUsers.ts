import { useCallback, useEffect, useState } from "react";
import { adminService } from "@/services/adminServices";
import { useDebounce } from "@/hooks/useDebounce";

export type AdminUser = {
  id: string;
  role: "Company" | "Trainee";
  name: string;
  email: string | null;
  isVisible: boolean;
  avatar?: string;
};

export interface UserFilters {
  searchTerm: string;
  role: "All" | "Company" | "Trainee";
  visibility: "All" | "Visible" | "Hidden";
}

export const useUsers = (limit = 10) => {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    totalPages: 1,
    totalItems: 0,
  });

  const [filters, setFilters] = useState<UserFilters>({
    searchTerm: "",
    role: "All",
    visibility: "All",
  });

  const debouncedSearch = useDebounce(filters.searchTerm, 500);

  /**
   * Fetch all users from backend (trainees + companies)
   */
const fetchAllUsers = useCallback(async () => {
  setLoading(true);

  try {
    // ===== FETCH ALL STUDENTS =====
    let allStudents: any[] = [];
    let studentPage = 1;
    let studentTotalPages = 1;

    do {
      const res = await adminService.getStudents({
        page: studentPage,
        limit: 20,
      });

      const data = res.data?.data ?? [];
      const meta = res.data?.pagination;

      allStudents.push(...data);
      studentTotalPages = meta?.totalPages ?? 1;
      studentPage++;
    } while (studentPage <= studentTotalPages);

    // ===== FETCH ALL COMPANIES =====
    let allCompanies: any[] = [];
    let companyPage = 1;
    let companyTotalPages = 1;

    do {
      const res = await adminService.getCompanies({
        page: companyPage,
        limit: 20,
      });

      const data = res.data?.data ?? [];
      const meta = res.data?.pagination;

      allCompanies.push(...data);
      companyTotalPages = meta?.totalPages ?? 1;
      companyPage++;
    } while (companyPage <= companyTotalPages);

    // ===== TRANSFORM =====
    const traineeUsers: AdminUser[] = allStudents.map((s) => ({
      id: s.id,
      role: "Trainee",
      name: s.fullName,
      email: s.email,
      isVisible: Boolean(s.isVisible),
      avatar: s.profilePhoto,
    }));

    const companyUsers: AdminUser[] = allCompanies.map((c) => ({
      id: c.id,
      role: "Company",
      name: c.companyName,
      email: c.email,
      isVisible: Boolean(c.isVisible),
      avatar: c.logo,
    }));

    setAllUsers([...traineeUsers, ...companyUsers]);
    setError(null);
  } catch (err) {
    console.error(err);
    setError("Failed to load users.");
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    let result = [...allUsers];

    // Apply search filter
    if (debouncedSearch.trim()) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (filters.role !== "All") {
      result = result.filter((user) => user.role === filters.role);
    }

    // Apply visibility filter
    if (filters.visibility !== "All") {
      const isVisible = filters.visibility === "Visible";
      result = result.filter((user) => user.isVisible === isVisible);
    }

    setFilteredUsers(result);

    // Update pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page, totalPages),
      totalPages,
      totalItems,
    }));
  }, [allUsers, debouncedSearch, filters.role, filters.visibility, limit]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const paginatedUsers = filteredUsers.slice(
    (pagination.page - 1) * limit,
    pagination.page * limit
  );

  // Update role filter
  const setRoleFilter = (role: "All" | "Company" | "Trainee") => {
    setFilters((prev) => ({ ...prev, role }));
  };

  // Update visibility filter
  const setVisibilityFilter = (visibility: "All" | "Visible" | "Hidden") => {
    setFilters((prev) => ({ ...prev, visibility }));
  };

  // Update search term
  const setSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      role: "All",
      visibility: "All",
    });
  };

  // Toggle visibility for a user
  const toggleVisibility = async (user: AdminUser, isVisible: boolean) => {
    try {
      if (user.role === "Trainee") {
        await adminService.updateStudent(user.id, { isVisible });
      } else if (user.role === "Company") {
        await adminService.updateCompany(user.id, { isVisible });
      }

      // Update local state immediately for better UX
      setAllUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isVisible } : u))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update visibility.");
      // Refetch to sync with backend
      await fetchAllUsers();
      throw err;
    }
  };

  // Bulk set visibility
  const bulkSetVisibility = async (userIds: string[], isVisible: boolean) => {
    try {
      await Promise.all(
        userIds.map((id) => {
          const user = allUsers.find((u) => u.id === id);
          if (!user) return Promise.resolve();

          if (user.role === "Trainee") {
            return adminService.updateStudent(id, { isVisible });
          } else if (user.role === "Company") {
            return adminService.updateCompany(id, { isVisible });
          }
          return Promise.resolve();
        })
      );

      // Update local state
      setAllUsers((prev) =>
        prev.map((u) => (userIds.includes(u.id) ? { ...u, isVisible } : u))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update visibility.");
      // Refetch to sync with backend
      await fetchAllUsers();
      throw err;
    }
  };

  // Delete user
  const deleteUser = async (user: AdminUser) => {
    try {
      if (user.role === "Trainee") {
        await adminService.deleteStudent(user.id);
      } else if (user.role === "Company") {
        await adminService.deleteCompany(user.id);
      }

      // Remove from local state
      setAllUsers((prev) => prev.filter((u) => u.id !== user.id));

      // Adjust page if needed (if current page becomes empty)
      setPagination((prev) => {
        const newFilteredCount = filteredUsers.filter(
          (u) => u.id !== user.id
        ).length;
        const newTotalPages = Math.ceil(newFilteredCount / limit) || 1;
        const newPage = prev.page > newTotalPages ? newTotalPages : prev.page;

        return {
          ...prev,
          page: newPage,
        };
      });
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
      // Refetch to sync with backend
      await fetchAllUsers();
      throw err;
    }
  };

  return {
    users: paginatedUsers,
    loading,
    error,
    pagination,
    filters,
    setRoleFilter,
    setVisibilityFilter,
    setSearch,
    resetFilters,
    setPage: (page: number) => setPagination((prev) => ({ ...prev, page })),
    toggleVisibility,
    bulkSetVisibility,
    deleteUser,
    refetch: fetchAllUsers,
  };
};
