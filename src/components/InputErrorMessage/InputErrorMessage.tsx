interface Props {
  children: React.ReactNode;
}

const InputErrorMessage = ({ children }: Props) => {
  return (
    <div className="w-full mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
      <svg
        className="mr-3 w-6 h-6 text-red-600"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 1.5L1.5 18h17L10 1.5zm0 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-8a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
      <p className="text-left">{children}</p>
    </div>
  );
};

export default InputErrorMessage;
