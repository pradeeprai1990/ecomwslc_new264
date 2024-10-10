import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ['/contact'];
const protectedRoutes = ['/add-color','/add-size','/dashborad','/add-product'];

const protectedRoutes1 = ['/'];



export default function middleware(req) {

    const token = req.cookies.get('token')?.value; //cookies value; 

    //add-size
                        //direct url       ////add-size
                                            ///add-color                
    if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

   


}