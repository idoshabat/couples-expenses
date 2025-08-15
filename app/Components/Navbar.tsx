import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <div className="flex items-center justify-between p-4 bg-[#cadefa] w-full text-black" dir="rtl">
            <a href="/" className="text-3xl font-bold ml-16 hover:text-gray-600">הבית של עידו ורעות❤️🏠</a>
            <nav className="flex ml-auto space-x-reverse space-x-8">
                <a href="/users" className="hover:underline">משתמשים</a>
                <a href="/expenses" className="hover:underline">הוצאות</a>
                <a href="/categories" className="hover:underline">קטגוריות</a>
                <a href="/households" className="hover:underline">משקי בית</a>
            </nav>

            <SignedOut>
                <SignInButton mode="modal">
                    <button className="mr-4 hover:cursor-pointer">התחבר</button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button className="mr-4 hover:cursor-pointer">הירשם</button>
                </SignUpButton>
            </SignedOut>

            <SignedIn>
                <UserButton />  {/* Shows user avatar and menu when signed in */}
            </SignedIn>
        </div>
    );
}
