import { Department } from "./department/Department";
import { Reason } from "./reason/Reason";
import { Station } from "./station/Station";
import { Users } from "./user/Users";

export const System_Manager = () => {
  return (
    <div className="h-full w-full ">
      <div className="h-full bg-neutral-50 rounded p-5">
        <h3 className="mb-4">System Manager</h3>
        <div className="h-94/100 overflow-auto border border-neutral-300 bg-neutral-100 rounded flex flex-col gap-2 mt-4 p-5">
          <div className="h-100/100 w-100/100 flex gap-4">
            <div className="h-100/100 w-50/100 flex flex-col gap-2">
              <Department />
              <Station />
              <Reason />
            </div>
            <div className="h-100/100 w-50/100 rounded shadow bg-white p-5">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
