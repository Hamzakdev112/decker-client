import * as React from "react";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function SelectMembers({ members, setMember }) {
  const [isOpen, setisOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setisOpen((prev) => !prev);
  };
  const ref = useDetectClickOutside({ onTriggered: () => setisOpen(false) });
  const handleSetMember = (id) => {
    setMember(id);
    setisOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleOpen}
        className="w-[30px] flex justify-center items-center"
      >
        <img className="w-[30px]" src="/assets/user.png" alt="" />
      </button>
      <div
        className={`boxshadow left-[0] transition-all duration-[0.3s] absolute ${
          isOpen && "!h-[200px]"
        } h-[0px] overflow-auto overflow-x-hidden bg-white w-[200px]`}
      >
        {isOpen &&
          members?.map((member) => (
            <div
              key={member._id}
              onClick={() => handleSetMember(member._id)}
              // onClick={handleSetMember(member._id)}
              className="hover:bg-[#ebf1fd] cursor-pointer flex items-center gap-2 p-3  "
            >
              <img
                src="/assets/user.png"
                className="rounded-[50%] w-[30px]"
                alt=""
              />
              <span>
                {member?.firstName} {member?.lastName}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
