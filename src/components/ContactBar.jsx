export default function ContactBar() {
    return (
        <div className="absolute -bottom-10 left-0 right-0 z-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="rounded-2xl bg-black/70 text-white backdrop-blur p-6 grid gap-4 md:grid-cols-4">
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">Name</label>
                        <input
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Insert your Name"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">Email</label>
                        <input
                            type="email"
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Insert your Email"
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-wide text-white/70">Message</label>
                        <input
                            className="mt-2 w-full rounded-md bg-white/10 px-4 py-3 placeholder-white/50 outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Type your Message"
                        />
                    </div>
                    <div className="flex items-end">
                        <button className="w-full rounded-full bg-emerald-500 py-3 font-semibold hover:bg-emerald-600">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
