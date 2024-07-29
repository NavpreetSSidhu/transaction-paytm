import React from "react";

const Inputbox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-small font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Inputbox;
