import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Omakoju. All rights reserved.</p>
                <div className="mt-2 flex flex-col">
                    <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</Link>
                    <Link href="/newshop" className="text-gray-400 hover:text-white mx-2">Create a Shop</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;