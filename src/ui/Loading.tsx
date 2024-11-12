export const Loading = () => {
  return (
    <div className="flex flex-col m-auto items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-primary-accent border-t-primary rounded-full animate-spin"></div>
      <p className="text-primary text-lg font-medium">Loading...</p>
    </div>
  );
};
