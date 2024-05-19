import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  if (auth().userId && isProtectedRoute(req)) {
    let path = '/select-org';

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Exclude sign-in route from this condition
  if (!auth().userId && !isProtectedRoute(req) && req.nextUrl.pathname !== '/sign-in') {
    return auth().redirectToSignIn({
      returnBackUrl: req.url
    });
  }

  // Exclude sign-in route from this condition
  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== '/select-org' && req.nextUrl.pathname !== '/sign-in') {
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
