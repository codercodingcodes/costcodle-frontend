let jwtToken = "";

export function setJwt(token: string) {
    jwtToken = token;
}

export function getJwt() {
    return jwtToken;
}

export function authHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...extra,
    };
    if (jwtToken) {
        headers.Authorization = `Bearer ${jwtToken}`;
    }
    return headers;
}
