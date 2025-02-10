import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        return NextResponse.next();
    }, {
    callbacks: {
        authorized: ({ req, token }) => {
            const { pathname } = req.nextUrl;
            console.log("pathname: ", pathname);

            if (pathname.startsWith("api/webhook")) {
                return true;
            }
            if (
                pathname.startsWith("/api/auth") ||
                pathname === "/login" ||
                pathname === "/register"
            ) {
                return true;
            }
            if (
                pathname === "/" ||
                pathname.startsWith("/api/products") ||
                pathname.startsWith("/products")
            ) {
                return true;
            }
            if (pathname.startsWith("/admin")) {
                return token?.role === "admin"; 
            }
            return false;
        }
    }
}
)

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/).*)"
    ],
}
