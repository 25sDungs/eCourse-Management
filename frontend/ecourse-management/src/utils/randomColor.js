export const randomGradient = () => {
    const gradients = [
        "from-blue-600 to-blue-400",
        "from-green-600 to-green-400",
        "from-purple-600 to-purple-400",
        "from-pink-600 to-pink-400",
        "from-yellow-600 to-yellow-400",
        "from-lime-600 to-lime-400",
        "from-rose-600 to-rose-400",
        "from-violet-600 to-violet-400",
        "from-indigo-600 to-indigo-400",
        "from-red-600 to-red-400",
        "from-teal-600 to-teal-400",
        "from-cyan-600 to-cyan-400",
        "from-emerald-600 to-emerald-400",
        "from-fuchsia-600 to-fuchsia-400",
        "from-sky-600 to-sky-400",
        "from-orange-600 to-orange-400",
        "from-amber-600 to-amber-400",
        "from-neutral-600 to-neutral-400",
    ];
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
};