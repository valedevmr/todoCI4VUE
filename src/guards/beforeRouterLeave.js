export default function authMiddleware(to, from, next) {
    const token = localStorage.getItem('token');





    if (!token) {
        // Redirigir al usuario a la página de login
        next('/login');
        return;
    }

    // Verificar la validez del token aquí (por ejemplo, llamando a una API)

    next();
}