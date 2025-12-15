import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";
import { fetchUsers } from "../features/users/usersSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Dashboard</h1>

          <button
            onClick={() => setOpenForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            + Add User
          </button>
        </div>

        <UsersTable />

        {openForm && <UserForm onClose={() => setOpenForm(false)} />}
      </div>
    </div>
  );
}
