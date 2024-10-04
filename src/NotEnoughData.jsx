import { ErrorIcon } from "./Icons/ErrorIcon";

export function NotEnoughData() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ErrorIcon size={120} />
      <p className="text-center font-poppins">Not enough data at this time</p>
    </div>
  );
}
