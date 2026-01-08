export default function Footer() {
    return (
        <footer id="contact" className="border-t">
            <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600">© {new Date().getFullYear()} Iyilik Adımı</p>
                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:text-teal-600">
                        Gizlilik
                    </a>
                    <a href="#" className="hover:text-teal-600">
                        Şartlar
                    </a>
                    <a href="#" className="hover:text-teal-600">
                        İletişim
                    </a>
                </div>
            </div>
        </footer>
    );
}
