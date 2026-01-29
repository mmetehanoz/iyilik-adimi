import { useState, useCallback, useEffect } from 'react';

export const useTurnstile = () => {
    const [token, setToken] = useState(null);

    const getToken = useCallback(async () => {
        if (!window.turnstile) {
            console.warn('Turnstile not loaded yet');
            return null;
        }

        return new Promise((resolve) => {
            // Invisible Turnstile render et ve token al
            // Önce varsa eski widget'ı temizle (memory leak önlemek için id saklanabilir ama execute genelde yeterli)

            try {
                window.turnstile.execute(undefined, {
                    callback: (token) => {
                        setToken(token);
                        resolve(token);
                    },
                });
            } catch (e) {
                console.error('Turnstile execution failed:', e);
                resolve(null);
            }
        });
    }, []);

    return { token, getToken };
};
