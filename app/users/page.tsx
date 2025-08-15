'use client';
import Button from "../Components/Button";
import AddUserModal from "../Components/AddUserModal";
import { useState, useEffect } from "react";




export default function UsersPage() {
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [users, setUsers] = useState<{id: number, name: string; email: string }[]>([]);

    function handleAddUserButton() {
        setIsAddUserModalOpen(true);
    }

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (res.ok) {
            setUsers(data);
        } else {
            console.error("Failed to fetch users:", data.error);
        }
    }

    const addUser = async (name: string, email: string) => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
        });

        if (res.ok) {
            const newUser = await res.json();
            setUsers((prevUsers) => [newUser, ...prevUsers]);
        } else {
            const errorData = await res.json();
            console.error("Failed to add user:", errorData.error);
        }
    }

    const deleteUser = async (id: number) => {
        const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } else {
            const errorData = await res.json();
            console.error("Failed to delete user:", errorData.error);
        }
    }


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            {isAddUserModalOpen && (
                <AddUserModal onClose={() => setIsAddUserModalOpen(false)} onSubmit={addUser} />
            )}
            <h1 className="text-7xl font-serif text-blue-950">משתמשים</h1>
            <div className="w-full max-w-2xl">
                <ul className="space-y-4">
                    {users && users.length > 0 ? users.map((user, index) => (
                        <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <p>{user.id}</p>
                            </div>
                            <a className="text-red-500 cursor-pointer" onClick={() => deleteUser(user.id)}>❌</a>
                        </li>
                    )) : <h1 className="text-3xl text-red-300">No users</h1>}
                </ul>
                <Button onClick={handleAddUserButton}>הוספת משתמש</Button>
            </div>
        </div>
    );
}