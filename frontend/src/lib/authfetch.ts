export const authFetch = (url: RequestInfo | URL, init?: RequestInit) =>
    fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        ...init
    });

