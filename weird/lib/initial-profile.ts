import { currentUser,redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile =async (params:any) => {

    if (!user) {
        return redirectToSignIn();
    }
    const profile = await db.profile.findUnique ({
        where: {
            userId: user.id
        }
    });
    if (profile) {
        return profile;
    }
    const newProfile = await db.profile.create({
        data: {
            userId: userAgent.id,
            name:'${user.firstname} ${user.lastname}',
            imageUrl:user.imageUrl,
            email:user.emailAddresses[0].emailAddresses
        }
    });
    return newProfile;
};