export const normalizeCategoryName = (value = '') => value.toLocaleLowerCase('tr-TR').trim();

export const getCategoryMeta = (name = '') => {
    const lowerName = normalizeCategoryName(name);

    if (lowerName.includes('kurban')) {
        return {
            icon: '🐑',
            surfaceClass: 'from-[#0f7c49] via-[#12985a] to-[#19b36b]',
            badgeClass: 'bg-[#e9f8f0] text-[#0f7c49]'
        };
    }

    if (lowerName.includes('gazze')) {
        return {
            icon: '🇵🇸',
            surfaceClass: 'from-[#103e6a] via-[#1b5b93] to-[#2c74aa]',
            badgeClass: 'bg-[#eaf3fb] text-[#103e6a]'
        };
    }

    if (lowerName.includes('yemek') || lowerName.includes('gida') || lowerName.includes('gıda') || lowerName.includes('iftar')) {
        return {
            icon: '🍲',
            surfaceClass: 'from-[#c96a16] via-[#dd7a1f] to-[#f29e32]',
            badgeClass: 'bg-[#fff1df] text-[#b76014]'
        };
    }

    if (lowerName.includes('su') || lowerName.includes('kuyu')) {
        return {
            icon: '💧',
            surfaceClass: 'from-[#0b7285] via-[#1192a9] to-[#15abc7]',
            badgeClass: 'bg-[#e4f8fc] text-[#0b7285]'
        };
    }

    if (lowerName.includes('yetim') || lowerName.includes('cocuk') || lowerName.includes('çocuk')) {
        return {
            icon: '👦',
            surfaceClass: 'from-[#7a4f01] via-[#a06800] to-[#cb8b17]',
            badgeClass: 'bg-[#fff6df] text-[#8c5900]'
        };
    }

    if (lowerName.includes('acil')) {
        return {
            icon: '🚨',
            surfaceClass: 'from-[#a62323] via-[#cb3131] to-[#e54d4d]',
            badgeClass: 'bg-[#ffe9e9] text-[#a62323]'
        };
    }

    if (lowerName.includes('egitim') || lowerName.includes('eğitim') || lowerName.includes('kirtasiye') || lowerName.includes('kırtasiye') || lowerName.includes('ogrenci') || lowerName.includes('öğrenci')) {
        return {
            icon: '✏️',
            surfaceClass: 'from-[#5a2ca0] via-[#7540c2] to-[#9160db]',
            badgeClass: 'bg-[#f1eafe] text-[#5a2ca0]'
        };
    }

    if (lowerName.includes('saglik') || lowerName.includes('sağlık') || lowerName.includes('ilac') || lowerName.includes('ilaç')) {
        return {
            icon: '⚕️',
            surfaceClass: 'from-[#0d7a56] via-[#14936a] to-[#23b784]',
            badgeClass: 'bg-[#e8fbf2] text-[#0d7a56]'
        };
    }

    if (lowerName.includes('nakdi') || lowerName.includes('zekat') || lowerName.includes('sadaka')) {
        return {
            icon: '💰',
            surfaceClass: 'from-[#7b5313] via-[#a16d1d] to-[#ca8d29]',
            badgeClass: 'bg-[#fff4df] text-[#7b5313]'
        };
    }

    if (lowerName.includes('kumanya')) {
        return {
            icon: '📦',
            surfaceClass: 'from-[#7a3d18] via-[#9c4e1d] to-[#c96e2b]',
            badgeClass: 'bg-[#fff0e6] text-[#8b4317]'
        };
    }

    return {
        icon: '🌍',
        surfaceClass: 'from-[#103e6a] via-[#18558d] to-[#2671b0]',
        badgeClass: 'bg-[#eaf3fb] text-[#103e6a]'
    };
};

export const getCategoryIcon = (name = '') => getCategoryMeta(name).icon;