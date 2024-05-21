import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
const ProtectedPage = async () => {
  // // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  // // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // // Use `user` to render user details or create UI elements

  return (
    <div>
      User: {user?.firstName} - UserId: {userId}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default ProtectedPage;
