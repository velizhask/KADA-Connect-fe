import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

export default function UserManagement() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const users = [
    {
      id: 1,
      role: "Admin",
      name: "Velizha Sandy Kusuma",
      email: "johndoe@example.com",
      verified: true,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      role: "Company",
      name: "Gilbert Hedinson",
      email: "johndoe@example.com",
      verified: false,
    },
    {
      id: 3,
      role: "Trainee",
      name: "Dhruv Menghani",
      email: "johndoe@example.com",
      verified: false,
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-8">Manage Users</h1>

      <div className="flex items-center gap-4 mb-6">
        <Input placeholder="Search users..." className="max-w-sm" />
        <Button variant="outline">Filter</Button>
        {selected.length > 0 && (
          <>
            <Button>Mark Verified</Button>
            <Button variant="destructive">Delete</Button>
            <button
              className="text-sm text-gray-500"
              onClick={() => setSelected([])}
            >
              Cancel Selection
            </button>
          </>
        )}
      </div>

      {/* Users Table */}
      <Card>
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">
                <Checkbox
                  checked={selected.length === users.length}
                  onCheckedChange={() =>
                    setSelected(
                      selected.length === users.length
                        ? []
                        : users.map((u) => u.id)
                    )
                  }
                />
              </th>
              <th className="p-4">User Role</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Verified</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">
                  <Checkbox
                    checked={selected.includes(user.id)}
                    onCheckedChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 flex items-center gap-3">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.verified ? (
                    <span className="text-green-500">✔</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <Button variant="ghost">‹</Button>
        <Button variant="default">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <Button variant="ghost">›</Button>
      </div>
    </div>
  );
}
