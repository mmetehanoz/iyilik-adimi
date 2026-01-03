export default function Causes() {
    return (
        <section id="causes" className="mx-auto max-w-7xl px-4 pt-24 pb-16">
            <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold">Our Causes</h2>
                <a href="#" className="text-teal-700 font-medium hover:underline">
                    View All
                </a>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg border p-5">
                        <div className="h-40 w-full rounded bg-gray-100" />
                        <h3 className="mt-4 text-lg font-semibold">Cause #{i}</h3>
                        <p className="mt-1 text-sm text-gray-600">Kısa açıklama metni için yer tutucu.</p>
                        <div className="mt-4 h-2 w-full rounded bg-gray-100">
                            <div className="h-2 rounded bg-teal-600" style={{ width: `${i * 25}%` }} />
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                            <span>Goal: ${(i * 10000).toLocaleString()}</span>
                            <span>Raised: ${(i * 2500).toLocaleString()}</span>
                        </div>
                        <button className="mt-4 w-full rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
                            Donate
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
