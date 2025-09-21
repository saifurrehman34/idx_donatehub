import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from './session';
import { getUserById } from './users';

export async function getUser() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.userId) {
        return null;
    }

    try {
        const user = await getUserById(session.userId);
        if (user) {
            // It's good practice to not send the password to the client
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}
