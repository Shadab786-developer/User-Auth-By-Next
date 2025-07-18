export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <h2 className="text-[50px]">
        Profiel of user
        <span className="text-4xl text-black bg-teal-400 rounded-lg">
          {params.id}
        </span>
      </h2>
      <hr />
    </div>
  );
}
