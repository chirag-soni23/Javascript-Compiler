import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

export const requireUser = ClerkExpressWithAuth({
  onError: (err, req, res, next) => {
    console.error("Clerk Auth Error:", err);
    res.status(401).json({ error: "Unauthorized access" });
  },
});
