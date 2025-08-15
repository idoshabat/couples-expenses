import Button from "./Button";

export default function AddUserModal({
    onClose,
    onSubmit,
}: Readonly<{
    onClose: () => void;
    onSubmit?: (name: string, email: string) => void;
}>) {

    function handleAddUserButton() {
        // Logic to add user goes here
        alert("User added successfully!"); // Placeholder for user addition logic
        onClose(); // Close the modal after adding user
    }

    return (
        <div className="fixed w-1/3 h-1/2 my-auto mx-auto inset-0 flex flex-col items-center justify-center bg-black opacity-90 rounded-2xl">
            <h2 className="text-blue-500 mb-8 text-2xl">הוספת משתמש</h2>
            <form action="">

                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="name">שם:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 text-white rounded"
                        placeholder="הכנס שם המשתמש"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="email">דוא&apos;ל:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 text-white rounded"
                        placeholder='הכנס דוא"ל המשתמש'
                    />
                </div>
                <Button onClick={() => {
                    const name = (document.getElementById('name') as HTMLInputElement)?.value;
                    const email = (document.getElementById('email') as HTMLInputElement)?.value;
                    console.log('Name:', name, 'Email:', email);
                    if (onSubmit && name && email) {
                        onSubmit(name, email);
                    }
                }}>הוסף משתמש</Button>
            </form>
            <Button onClick={() => onClose()}>סגור</Button>
        </div>
    );
}