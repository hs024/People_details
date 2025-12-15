import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../features/users/usersSlice";
import { useState } from "react";
import UserDetailsCard from "./UserDetailsCard";
import UserForm from "./UserForm";

export default function UsersTable() {
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-2 border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="bg-gray-300">
              {["Name", "Username", "Email", "Phone", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.username}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.phone}</td>

                <td className="px-4 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-xs"
                  >
                    Full Details
                  </button>

                  <button
                    onClick={() => setEditUser(user)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS CARD */}
      {selectedUser && (
        <UserDetailsCard
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* UPDATE FORM MODAL */}
      {editUser && (
        <UserForm user={editUser} onClose={() => setEditUser(null)} />
      )}
    </>
  );
}
